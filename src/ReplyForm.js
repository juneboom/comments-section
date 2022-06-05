import {useState} from "react";
import moment from 'moment';

const ReplyForm = ({currentUser, replyTo, stateChanger, handleSubmit, isSending}) => {

    const [newComment, setNewComment] = useState('');
    const submitLabel = 'Reply';

    const onSubmit = (e) => {
        e.preventDefault();
        const datePosted = moment().toLocaleString();
        handleSubmit(newComment, datePosted, replyTo);
        //rerender parent component
        stateChanger();

        //clean up text area after user submits comment
        setNewComment("");
    }

    return ( 
        !currentUser.isPending && <div className="comment create-comment">
            <form id="comment-form" onSubmit={onSubmit}>
                <label htmlFor="textbox">Reply</label>
                <input id="textbox"
                    type="text" 
                    placeholder="Reply to this comment."
                    required
                    value={newComment || ''}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                { !isSending && <button className="comment-form-button">{submitLabel}</button>}
                { isSending && <button className="comment-form-button" disabled>{submitLabel}</button>}
            </form>
            <p>{newComment}</p>
        </div>
     );
}
 
export default ReplyForm;