import { useState } from "react";

const CommentScore = ({item}) => {
    const [itemScore, setItemScore] = useState(item.score);


     const handleClick = (vote) => {
        const id = item.id; 
        const flag = localStorage.getItem(id);
 
        //if user has not rated comment yet
        if (!flag){
            if (vote){
                localStorage.setItem(id, 'like');
                item.score++;
                setItemScore(item.score);
            } else {
                localStorage.setItem(id, 'dislike');
                item.score--;
                setItemScore(item.score);
            }

        //if user already rated the comment
        } else if (flag === 'like'){
            //if already liked, remove the like or lower the score by 2
            if (vote){
                localStorage.removeItem(id);
                item.score--;
                setItemScore(item.score);
            } else {
                localStorage.setItem(id, 'dislike');
                item.score-=2;
                setItemScore(item.score);  
            }
        } else if (flag === 'dislike'){
            //if already disliked, remove the dislike or raise the score by 2
            if (vote){
                localStorage.setItem(id, 'like');
                item.score+=2;
                setItemScore(item.score);
            } else {
                localStorage.removeItem(id);
                item.score++;
                setItemScore(item.score);  
            }
        }
  }

    return (  
        <div className="score">
            <button className="like" 
                    aria-label={`Like this comment along with ${itemScore} other people.`}
                    onClick={() => handleClick(true)}>

                        <img src={require("./images/icon-plus.svg").default} alt="Plus icon"/>

            </button>

            <span className="vote-count" aria-label={`${itemScore} likes`}>
                {itemScore}
            </span>

            <button className="dislike" 
                    aria-label="Dislike this comment."
                    onClick={() => handleClick(false)}>

                         <img src={require("./images/icon-minus.svg").default} alt="Minus icon"/>

            </button>
        </div> );
}
 
export default CommentScore;