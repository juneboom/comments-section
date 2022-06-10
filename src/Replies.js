import CommentScore from "./CommentScore";
import ReplyForm from "./ReplyForm";

const Replies = ({
    parentId, 
    replies, 
    currentUser, 
    updateComment,
    handleDelete, 
    addReply,
    activeComment, 
    setActiveComment,
    isEditing,
    isReplying,
    stateChanger,
    isSending}) => {
        

    return (
        replies.map(reply => (
            <div className="comment reply" key={reply.id}>
                <div className="reply-header">
                    <h3>{reply.user.username}</h3>
                    <img src={require(`${reply.user.image.png}`)} className="icon" alt="author-icon"/>
                    <span className="date">{reply.createdAt}</span>

                    {currentUser &&
                        <div className="comment-actions">
                            {reply.user.username === currentUser.data.username &&
                                <>
                                    <div className="comment-action">
                                        <button className="delete" 
                                                aria-label="Delete comment." 
                                                onClick={() => handleDelete(reply.id, "reply", parentId)}>
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
                            {reply.user.username !== currentUser.data.username &&
                                <div className="comment-action">
                                    <button className="reply" 
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

                {reply && <CommentScore item={reply}></CommentScore>}
                

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

                {isReplying && 
                 activeComment.id === reply.id && 
                 activeComment.id !== currentUser.data.id &&(
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