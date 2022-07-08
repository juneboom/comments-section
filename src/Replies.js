import CommentScore from "./CommentScore";
import ReplyForm from "./ReplyForm";
import DeleteModal from "./DeleteModal";

import moment from "moment";

const Replies = ({
    parentId, 
    replies, 
    currentUser, 
    updateComment,
    handleDelete, 
    addReply,
    updateScore,
    activeComment, 
    setActiveComment,
    isEditing,
    isReplying,
    stateChanger,
    isSending,
    isDeleting}) => {
    
    return (
        replies.map(reply => (
            <div className="comment-container">
                <div className="comment reply" key={reply.id}>

                     {reply && 
                        <div className="visible-desktop">
                            <CommentScore 
                                comment={reply}
                                updateScore={updateScore}
                                type="reply"
                                parentId={parentId}
                            ></CommentScore>
                        </div>
                    }

                    <div className="comment-body">
                        <div className="comment-header reply-header">

                            <img src={require(`${reply.user.image.png}`)} className="icon" alt="author-icon"/>
                            <h3>{reply.user.username}</h3>
                            {(reply.user.username === currentUser.username) &&
                                    <span className="you-tag">you</span>
                            }
                            <span className="date">{moment(reply.createdAt, "MMMM Do YYYY, h:mm:ss a").fromNow()}</span>
                        
                            {currentUser && 
                                <div className="visible-desktop comment-actions">
                                    {reply.user.username === currentUser.username &&
                                    <>
                                        <div className="comment-action">
                                            <button className="delete" 
                                                    aria-label="Delete comment." 
                                                    onClick={() => setActiveComment({id:reply.id, type:"deleting"})}>
                                                <img src={require("./images/icon-delete.svg").default} alt="Delete icon"/>
                                                <span>Delete</span>
                                            </button>
            
                                        </div>
                                        <div className="comment-action">
                                            <button className="edit" 
                                                    aria-label="Edit comment." 
                                                    onClick={() => setActiveComment({id: reply.id, type:"editing"})}>
                                                        <img src={require("./images/icon-edit.svg").default} alt="Edit icon"/>
                                                        <span>Edit</span>
                                            </button>
                                        </div>
                                    </>    
                                }
                                {reply.user.username !== currentUser.username &&
                                    <div className="comment-action">
                                        <button className="reply-btn" 
                                                aria-label="Reply to comment."
                                                onClick={() => setActiveComment({id: reply.id, type:"replying"})}>
                                            <img src={require("./images/icon-reply.svg").default} alt="Reply icon"/>
                                            <span>Reply</span>
                                        </button>
                                    </div>
                                }
                                </div>
                            }
                        </div>

                    


                        {(isEditing && 
                        activeComment.id === reply.id)
                            ? (
                            <ReplyForm
                                currentUser={currentUser}
                                stateChanger={stateChanger}  
                                replyTo={reply}
                                handleSubmit={updateComment}
                                isSending={isSending}
                                parentId={parentId}
                                initialText={reply.content}
                                replyId={reply.id}
                                submitLabel="Update"
                                inputLabel="Edit reply."
                            >
                            </ReplyForm>  
                            ) : (
                                <div className="comment-text">
                                    <span className="replying-to">@{reply.replyingTo} </span>{reply.content}
                                </div>
                            )
                        }
                    </div>


                    {currentUser &&
                        <div className="visible-mobile comment-actions">
                            {reply && 
                            <CommentScore 
                                comment={reply}
                                updateScore={updateScore}
                                type="reply"
                                parentId={parentId}
                            ></CommentScore>}
                            {reply.user.username === currentUser.username &&
                                <>
                                    <div className="comment-action">
                                        <button className="delete" 
                                                aria-label="Delete comment." 
                                                onClick={() => setActiveComment({id:reply.id, type:"deleting"})}>
                                            <img src={require("./images/icon-delete.svg").default} alt="Delete icon"/>
                                            <span>Delete</span>
                                        </button>
                                       
                                    </div>
                                    <div className="comment-action">
                                        <button className="edit" 
                                                aria-label="Edit comment." 
                                                onClick={() => setActiveComment({id: reply.id, type:"editing"})}>
                                                    <img src={require("./images/icon-edit.svg").default} alt="Edit icon"/>
                                                    <span>Edit</span>
                                        </button>
                                    </div>
                                </>    
                            }
                            {reply.user.username !== currentUser.username &&
                                <div className="comment-action">
                                    <button className="reply-btn" 
                                            aria-label="Reply to comment."
                                            onClick={() => setActiveComment({id: reply.id, type:"replying"})}>
                                        <img src={require("./images/icon-reply.svg").default} alt="Reply icon"/>
                                        <span>Reply</span>
                                    </button>
                                </div>
                            }
                        </div>
                    }
                     {isDeleting &&
                        activeComment.id === reply.id && 
                            <DeleteModal 
                                id={reply.id} 
                                isDeleting={isDeleting} 
                                setActiveComment={setActiveComment}
                                handleDelete={handleDelete}
                                type="reply"
                                parentId={parentId}>
                            </DeleteModal>
                    }

                </div>
                
                    {isReplying && 
                    activeComment.id === reply.id && 
                    activeComment.id !== currentUser.id &&(
                        <ReplyForm
                            currentUser={currentUser}
                            replyTo={reply}
                            stateChanger={stateChanger}  
                            handleSubmit={addReply}
                            isSending={isSending}
                            parentId={parentId}
                            submitLabel="Reply">
                        </ReplyForm>
                    )}
            </div>
        )) 
     );
}
 
export default Replies;