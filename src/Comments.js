import Replies from "./Replies";
import CommentForm from "./CommentForm";
import ReplyForm from "./ReplyForm";
import CommentScore from "./CommentScore";

import {useState} from "react";
import moment from 'moment';

const Comments = ({currentUser, comments, pageState, setPageState}) =>{  
    //const [pageState, setPageState] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [activeComment, setActiveComment] = useState(null);
    const isReplying = 
        activeComment && 
        activeComment.type === 'replying';
    const isEditing = 
        activeComment && 
        activeComment.type === 'editing';
    //const comments = useFetch('http://localhost:8000/comments', pageState);

    const reRender = () => {
        setPageState(!pageState);
    }

    const addComment = (text) => {
        setIsSending(true);
        const date = moment().toLocaleString();
        const comment = {
            content: text,
            createdAt: date,
            score: 0,
            user: currentUser.data,
            replies: []
        };

        fetch('http://localhost:8000/comments', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(comment)
        }).then(() => {
            console.log('new comment added', comment);
            setIsSending(false);
        }).catch((err) => {
            setIsSending(false);
            console.log(err.message);
        });
    }

    const addReply = (text, replyId, type, parentId, replyTo ) =>{
        setIsSending(true);
        const date = moment().toLocaleString();
        //find top-level/parent comment to place reply in
        let parentComment = comments.data.filter((data) => data.id === parentId)[0];
        let x = parentComment.replies.length;
        let randomNum = Math.floor(Math.random() * 100); 
        
        //duplicate ids are still possible but for the sake of demonstration this will have to do
        const reply = {
            id: `${replyTo.id}-${x}-${randomNum}`,
            content: text,
            createdAt: date,
            score: 0,
            replyingTo: replyTo.user.username,
            user: currentUser.data
        };
        
        console.log(reply);
        parentComment.replies.push(reply);

        fetch(`http://localhost:8000/comments/${parentId}`, {
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parentComment)
        }).then( () =>{
            console.log(`Added reply to comment with id ${parentId}`);
            setPageState(!pageState);
        }
        ).catch( error => 
            console.log('Could not add reply', error.message)
        )
        setIsSending(false);
        setActiveComment(null);
    }

    const handleDelete = (id, type = "comment", parentId) => {
        if (window.confirm("Are you sure you want to delete this comment? This will remove the comment and can't be undone.")){
            if (type === "comment"){
                fetch(`http://localhost:8000/comments/${id}`, {
                method:'DELETE'
                }).then( () =>{
                    console.log('Removed comment with id ' + id);
                    setPageState(!pageState);
                }
                ).catch( error => 
                    console.log(id, error.message)
                )
            } else if (type === "reply"){
                //find parent comment to delete reply from
                comments.data.forEach((comment) => {
                    if (comment.id === parentId){
                        let updatedReplies = comment.replies.filter((data) => data.id !== id);
                        comment.replies = updatedReplies;
                        fetch(`http://localhost:8000/comments/${parentId}`, {
                            method:'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(comment)
                            }).then( () =>{
                                console.log('Removed reply with id ' + id);
                                setPageState(!pageState);
                            }
                            ).catch( error => 
                                console.log(id, error.message)
                            )
                    }
                })
            }
            
        }
    }

    const updateComment = (text, id, type = "comment", parentId) => {
        setIsSending(true);
        console.log(id);
        if(type === "comment"){
            let updatedComment = comments.data.filter((data) => data.id === id)[0];
            updatedComment.content = text;
            fetch(`http://localhost:8000/comments/${id}`, {
                method:'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedComment)
                }).then( () =>{
                    console.log('Updated comment with id ' + id);
                    setPageState(!pageState);
                }
                ).catch( error => 
                    console.log(id, error.message)
                )
        } else if (type === "reply"){
            //find parent comment to updade reply
            comments.data.forEach((comment) => {
                    if (comment.id === parentId){
                        for (let i = 0; i< comment.replies.length; i++){
                            if (comment.replies[i].id === id){
                                comment.replies[i].content = text;
                                fetch(`http://localhost:8000/comments/${parentId}`, {
                                    method:'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(comment)
                                    }).then( () =>{
                                        console.log('Removed reply with id ' + id);
                                        setPageState(!pageState);
                                    }
                                    ).catch( error => 
                                        console.log(id, error.message)
                                    )
                            }
                        }
                    }
                })
        }
        setIsSending(false);
        setActiveComment(null);
    }

    return (
        <div className="comment-section">
            {comments.error && <div>{comments.error}</div>}
            {comments.isPending && <div>Loading...</div>}

            {!comments.isPending && comments.data.map(comment => (
                <div className="comment" key={comment.id}>
                    <div className="comment-header">
                        <h3>{comment.user.username}</h3>
                        <img src={require(`${comment.user.image.png}`)} className="icon" alt="author icon" />
                        <span className="date">{comment.createdAt}</span>
                        
                        {currentUser.data &&
                            <div className="comment-actions">
                                {comment.user.username === currentUser.data.username &&
                                    <>
                                        <div className="comment-action">
                                            <button className="delete" 
                                                    aria-label="Delete comment." 
                                                    onClick={()=> handleDelete(comment.id)}>
                                                <img src={require("./images/icon-delete.svg").default} alt="Delete icon"/>
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                        <div className="comment-action">
                                            <button className="edit" 
                                                    aria-label="Edit comment." 
                                                    onClick={() => 
                                                        setActiveComment({id:comment.id, type:"editing"})
                                                    }>
                                                        <img src={require("./images/icon-edit.svg").default} alt="Edit icon"/>
                                                        <span>Edit</span>
                                            </button>
                                        </div>
                                    </>    
                                }
                                {comment.user.username !== currentUser.data.username &&
                                    <div className="comment-action">
                                        <button className="reply" 
                                                aria-label="Reply to comment." 
                                                onClick={() => setActiveComment({id: comment.id, type:"replying"})}>
                                                    <img src={require("./images/icon-reply.svg").default} alt="Reply icon"/>
                                                    <span>Reply</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                        
                    </div>
                    {comment && <CommentScore item={comment}></CommentScore>}

                    {/* {(!isEditing || activeComment.id !== comment.id) &&
                        <div className="comment-text">
                            {comment.content}
                        </div>
                    } */}

                    {(isEditing && 
                     activeComment.id === comment.id) 
                        ? (  
                            <CommentForm
                                currentUser={currentUser}
                                stateChanger={reRender}  
                                handleSubmit={updateComment}
                                isSending={isSending}
                                inputLabel="Edit comment."
                                submitLabel="Update"
                                initialText={comment.content}
                                id={comment.id}
                            >
                            </CommentForm>
                        ) : (
                            <div className="comment-text">
                                {comment.content}
                            </div>
                        )
                    }

                    {isReplying && 
                     activeComment.id === comment.id && 
                     activeComment.id !== currentUser.data.id && (
                        <ReplyForm 
                            currentUser={currentUser}
                            replyTo={comment}
                            stateChanger={reRender}  
                            handleSubmit={addReply}
                            isSending={isSending}
                            parentId={comment.id}
                            submitLabel="Reply">    
                        </ReplyForm>
                    )}

                    <Replies 
                        parentId={comment.id}
                        replies={comment.replies}
                        currentUser={currentUser}
                        updateComment={updateComment}
                        handleDelete={handleDelete}
                        addReply={addReply} 
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        isEditing={isEditing}
                        isReplying={isReplying}
                        stateChanger={reRender}
                        isSending={isSending}
                    ></Replies>
                    
                    
                </div>
            ))}

            {!currentUser.isPending && 
                <CommentForm   
                    currentUser={currentUser}
                    stateChanger={reRender}  
                    handleSubmit={addComment}
                    isSending={isSending}
                    submitLabel="Send"
                    inputLabel="Write a comment."
                ></CommentForm>
            }

        </div>
    )
}

export default Comments;