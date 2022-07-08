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
  const currentUser= data.currentUser;

  useEffect(()=> {
    console.log(currentUser);
  })



  return (
    <div className="container">
      {!currentUser && <div>Loading...</div>}
        {currentUser && <div className="App">
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