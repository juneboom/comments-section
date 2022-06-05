import Replies from "./Replies";
import CommentForm from "./CommentForm";
import ReplyForm from "./ReplyForm";
import CommentScore from "./CommentScore";
import useFetch from "./useFetch";
import {useState} from "react";

const Comments = ({currentUser}) =>{  
    const [pageState, setPageState] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [activeComment, setActiveComment] = useState(null);
    const isReplying = 
        activeComment && 
        activeComment.type === 'replying';
    const comments = useFetch('http://localhost:8000/comments', pageState);

    const reRender = () => {
        setPageState(!pageState);
    }

    const addComment = (newComment, date) => {
        setIsSending(true);
        const comment = {
            content: newComment,
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

    const addReply = (newComment, date, replyTo) =>{
        setIsSending(true);
        const reply = {
            content: newComment,
            createdAt: date,
            score: 0,
            replyingTo: replyTo.user.username,
            user: currentUser.data
        };

        //find top-level/parent comment to place reply in
        for (let i = 0; i < comments.length; i++){
            let entry = comments[i];
            if (entry === replyTo){
                entry.replies.push(reply);
            }
        }
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this comment? This will remove the comment and can't be undone.")){
                fetch('http://localhost:8000/comments/' + id, {
                    method:'DELETE'
                }).then( () =>
                    setPageState(!pageState)
                ).catch( error => 
                    console.log('delete', error.message)
                )
            }
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
                                                onClick={() => setActiveComment({id: comment.id, type:comment.id})}>
                                                    <img src={require("./images/icon-reply.svg").default} alt="Reply icon"/>
                                                    <span>Reply</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        }
                        
                    </div>
                   {comment && <CommentScore item={comment}></CommentScore>}

                    <div className="comment-text">
                        {comment.content}
                    </div>

                    {isReplying && activeComment.id === comment.id(
                        <ReplyForm 
                            currentUser={currentUser}
                            replyTo={comment}
                            stateChanger={reRender}  
                            handleSubmit={addReply}
                            isSending={isSending}>    
                        </ReplyForm>
                    )}

                    <Replies 
                        parentId={comment.id}
                        replies={comment.replies}
                        currentUser={currentUser}
                    ></Replies>
                    
                    
                </div>
            ))}

            {!currentUser.isPending && 
                <CommentForm   
                    currentUser={currentUser}
                    stateChanger={reRender}  
                    handleSubmit={addComment}
                    isSending={isSending}
                ></CommentForm>
            }

        </div>
    )
}

export default Comments;