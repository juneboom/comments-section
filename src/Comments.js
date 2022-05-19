import {useEffect, useState} from "react";

import Replies from "./Replies";
import CreateComment from "./CreateComment";

const Comments = () =>{
    const [comments, setComments] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
    //TO IMPLEMENT: Create fetch function, 
    //then call it with different urls
        //fetch comments
        fetch('http://localhost:8000/comments')
            .then(res => {
                if (!res.ok)
                    throw new Error(`Status Code: ${res.status}`);

                return res.json();
            })
            .then(data => {
                setComments(data);
            })
            .catch((err) => {
                console.log('Something went wrong with fetch');
                console.log(err);
            });
        
        //fetch currentUser data
        fetch('http://localhost:8000/currentUser')
            .then(res => {
                if (!res.ok)
                    throw new Error(`Status Code: ${res.status}`);

                return res.json();
            })
            .then(data => {
                setUserData(data);
            })
            .catch((err) => {
                console.log('Something went wrong with fetch');
                console.log(err);
            })
    
    }, [])

    return (
        //only map comments if not null
        <div className="comment-section">
            {comments && comments.map(comment => (
                <div className="comments" key={comment.id}>
                    <div className="comment-header">
                        <h3>{comment.user.username}</h3>
                        <img src={require(`${comment.user.image.png}`)} className="icon" alt="author icon" />
                        <span className="date">{comment.createdAt}</span>
                        <button className="reply" aria-label="Reply to comment.">
                            <img src={require("./images/icon-reply.svg").default} alt="Reply icon"/>
                            <span>Reply</span>
                        </button>
                    </div>
                    <div className="score">
                        <button className="like" 
                        aria-label={`Like this comment along with ${comment.score} other people.`}>
                            <img src={require("./images/icon-plus.svg").default} alt="Plus icon"/>
                        </button>
                        <span className="vote-count" aria-label={`${comment.score} likes`}>
                            {comment.score}
                        </span>
                        <button className="dislike" 
                        aria-label="Dislike this comment.">
                            <img src={require("./images/icon-minus.svg").default} alt="Minus icon"/>
                        </button>
                    </div>
                    <div className="comment-text">
                        {comment.content}
                    </div>

                    <Replies replies={comment.replies}></Replies>
                    
                    
                </div>
            ))}

            <CreateComment currentUser={userData}></CreateComment>

        </div>
    )
}

export default Comments;