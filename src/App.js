import Comments from './Comments';
import useFetch from './useFetch';
import {useState} from "react";

import data from './data/db.json';

function App() {
  const [pageState, setPageState] = useState(false);
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments")) || data.comments
  );
  const currentUser= useFetch('http://localhost:8000/currentUser', pageState);
  
  //const currentUser= useFetch('http://localhost:8000/currentUser');

  return (
    <div className="container">
      {currentUser.isPending && <div>Loading...</div>}
        {!currentUser.isPending && <div className="App">
            <h1>Comments will show here</h1>
            <Comments 
              currentUser={currentUser}
              comments={comments}
              setComments={setComments}
              pageState={pageState}
              setPageState={setPageState}
              >
            </Comments>
        </div>}
    </div>
   
  );
  // return (
  //   <div className="container">
  //       {currentUser.isPending && <div>Loading...</div>}
  //       {!currentUser.isPending && <div className="App">
  //           <h1>Comments will show here</h1>
  //           {/* <Comments 
  //             currentUser={currentUser}
  //             comments={comments}
  //             pageState={pageState}
  //             setPageState={setPageState}>
  //           </Comments> */}
  //       </div>}
  //   </div>
  //  );
}

export default App;