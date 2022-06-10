import {useState} from "react";

const ReplyForm = ({
    currentUser, 
    replyTo, 
    stateChanger,
    handleSubmit, 
    isSending,
    parentId,
    submitLabel,
    initialText='',
    replyId}) => {

    const [newComment, setNewComment] = useState(initialText);

    const onSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim().length === 0 ) return; 

        handleSubmit(newComment, replyId, "reply", parentId, replyTo);
        //rerender parent component
        stateChanger();

        //clean up text area after user submits comment
        setNewComment("");
    }

    return ( 
        !currentUser.isPending && <div className="comment create-comment">
            <form id="comment-form" onSubmit={onSubmit}>
                <label htmlFor="textbox">@{replyTo.user.username}</label>
                <input id="textbox"
                    type="text" 
                    placeholder="Reply to this comment."
                    required
                    value={`@${replyTo.user.username}, ` + newComment}
                    onChange={(e) => 
                        setNewComment(
                            e.target.value.replace(`@${replyTo.user.username}, `, "")
                        )
                    }
                />
                { !isSending && <button className="comment-form-button">{submitLabel}</button>}
                { isSending && <button className="comment-form-button" disabled>{submitLabel}</button>}
            </form>
            <p>{newComment}</p>
        </div>
     );
}
 
export default ReplyForm;