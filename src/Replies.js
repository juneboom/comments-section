const Replies = ({replies}) => {

    return (
        replies.map(reply => (
            <div className="replies" key={reply.id}>
            <div className="reply-header">
                <h3>{reply.user.username}</h3>
                <img src={require(`${reply.user.image.png}`)} className="icon" alt="author-icon"/>
                <span className="date">{reply.createdAt}</span>
                <button className="reply" aria-label="Reply to comment.">
                    <img src={require("./images/icon-reply.svg").default} alt="Reply icon"/>
                    <span>Reply</span>
                </button>
            </div>
                <div className="score">
                    <button className="like" 
                    aria-label={`Like this comment along with ${reply.score} other people.`}>
                        <img src={require("./images/icon-plus.svg").default} alt="Plus icon"/>
                    </button>
                    <span className="vote-count" aria-label={`${reply.score} likes`}>
                        {reply.score}
                    </span>
                    <button className="dislike" 
                    aria-label="Dislike this comment.">
                        <img src={require("./images/icon-minus.svg").default} alt="Minus icon"/>
                    </button>
                </div>
                <div className="comment-text">
                    <span className="replying-to">@{reply.replyingTo}</span>{reply.content}
                </div>
        </div>
        ))
        
     );
}
 
export default Replies;