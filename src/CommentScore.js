import {useEffect} from "react";
import { useState } from "react";

const CommentScore = ({comment, updateScore, type, parentId}) => {
    const [score, setScore] = useState(comment.score);
    const [vote, setVoted] = useState(
        JSON.parse(localStorage.getItem(comment.id) || false)
    );
    const [outlook, setOutlook] = useState(
        JSON.parse(localStorage.getItem(`${comment.id}Outlook`) || null)
    );

    useEffect(() => {
        window.localStorage.setItem(comment.id, JSON.stringify(vote));
        window.localStorage.setItem(`${comment.id}Outlook`, JSON.stringify(outlook));
        console.log("voted", JSON.parse(localStorage.getItem(comment.id)));
        console.log("outlook", JSON.parse(localStorage.getItem(`${comment.id}Outlook`)));
        console.log(comment.score);
    }, [vote, outlook]);

    const handleClick = (flag) => {
        let newScore = score;
        if (!vote){
            if (flag) {
                newScore++;
                setOutlook(true);
            } else {
                newScore--;
                setOutlook(false);
            }
            setVoted(!vote);
        } else if (vote){
            //if previously liked
            if (outlook){
                if (flag){
                    newScore--;
                    setOutlook(null);
                    setVoted(false);
                } else {
                    newScore-=2;
                    setOutlook(false);
                }
            //if previously disliked
            } else if (outlook === false){
                if (flag){
                    newScore+=2;
                    setOutlook(true);
                } else {
                    newScore++;
                    setOutlook(null);
                    setVoted(false);
                }
            }
        }
    
        updateScore(comment, newScore, type, parentId);
        setScore(newScore);
    }

    return (  
        <div className="score">
            <button className="like" 
                    aria-label={`Like this comment along with ${comment.score} other people.`}
                    onClick={() => handleClick(true)}>

                        <img src={require("./images/icon-plus.svg").default} alt="Plus button"/>

            </button>

            <span className="vote-count" aria-label={`${comment.score} likes`}>
                {comment.score}
            </span>

            <button className="dislike" 
                    aria-label="Dislike this comment."
                    onClick={() => handleClick(false)}>

                         <img src={require("./images/icon-minus.svg").default} alt="Minus button"/>

            </button>
        </div> );
}
 
export default CommentScore;