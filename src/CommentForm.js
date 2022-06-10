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
            <form id="comment-form" onSubmit={onSubmit}>
                <label htmlFor="textbox">{inputLabel}</label>
                <input id="textbox"
                    type="text" 
                    placeholder="Add a comment"
                    required
                    value={newComment || ''}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                { !isSending && <button className="comment-form-button">{submitLabel}</button>}
                { isSending && <button className="comment-form-button" disabled>{submitLabel}</button>}
            </form>
        </div>
     );
}
 
export default CommentForm;