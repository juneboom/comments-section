import Comments from './Comments';
import useFetch from './useFetch';
import {useState} from "react";

import data from './data/db.json';
import {useEffect} from 'react';

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
}

export default App;