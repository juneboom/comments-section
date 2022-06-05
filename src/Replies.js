import CommentScore from "./CommentScore";

const Replies = ({replies, currentUser}) => {

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
                                            <div className="comment-action">Delete</div>
                                            <div className="comment-action">Edit</div>
                                        </>    
                                    }
                                    {reply.user.username !== currentUser.data.username &&
                                        <div className="comment-action">
                                            <button className="reply" aria-label="Reply to comment.">
                                                <img src={require("./images/icon-reply.svg").default} alt="Reply icon"/>
                                                <span>Reply</span>
                                            </button>
                                        </div>
                                    }
                                </div>
                    }

                </div>
                    {reply && <CommentScore item={reply}></CommentScore>}
                    <div className="comment-text">
                        <span className="replying-to">@{reply.replyingTo}</span>{reply.content}
                    </div>
            </div>
        ))
        
     );
}
 
export default Replies;