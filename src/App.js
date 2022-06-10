import Comments from './Comments';
import useFetch from './useFetch';
import {useState} from "react";
import {useEffect} from 'react';

function App() {
  const [pageState, setPageState] = useState(false);
  const currentUser= useFetch('http://localhost:8000/currentUser');
  const comments = useFetch('http://localhost:8000/comments', pageState);


  return (
    <div className="container">
        {currentUser.isPending && <div>Loading...</div>}
        {!currentUser.isPending && <div className="App">
            <h1>Comments will show here</h1>
            <Comments 
              currentUser={currentUser}
              comments={comments}
              pageState={pageState}
              setPageState={setPageState}>
            </Comments>
        </div>}
    </div>
   
  );
}

export default App;