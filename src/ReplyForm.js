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
            <div className="visible-desktop">
                <img src={require(`${currentUser.data.image.png}`)} className="icon" alt="author icon" />
            </div>
            <textarea 
                id="comment-form"
                placeholder="Reply to this comment."
                required
                value={`@${replyTo.user.username}, ` + newComment}
                onChange={(e) => 
                    setNewComment(
                        e.target.value.replace(`@${replyTo.user.username}, `, "")
                    )}>
            </textarea>
            <div className="visible-mobile send-button-container">
                <img src={require(`${currentUser.data.image.png}`)} className="icon" alt="author icon" />
                { !isSending && <button className="comment-form-button" onClick={onSubmit}>{submitLabel}</button>}
                { isSending && <button className="comment-form-button" disabled>{submitLabel}</button>}
            </div>
            <div className="visible-desktop">
                { !isSending && <button className="comment-form-button" onClick={onSubmit}>{submitLabel}</button>}
                { isSending && <button className="comment-form-button" disabled>{submitLabel}</button>}
            </div>
        </div>
     );
}
 
export default ReplyForm;