import {useState} from "react";


const CommentForm = ({
    currentUser, 
    stateChanger, 
    handleSubmit, 
    isSending, 
    inputLabel, 
    submitLabel, 
    initialText = '',
    id}) => {

    const [newComment, setNewComment] = useState(initialText);
    

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(newComment, id);
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
                placeholder="Add a comment..."
                value={newComment || ''}
                required
                onChange={(e) => setNewComment(e.target.value)}>
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
 
export default CommentForm;