import Comments from './Comments';
import useFetch from './useFetch';

function App() {
  const currentUser= useFetch('http://localhost:8000/currentUser');
  
  return (
    <div className="container">
        {currentUser.isPending && <div>Loading...</div>}
        {!currentUser.isPending && <div className="App">
            <h1>Comments will show here</h1>
            <Comments currentUser={currentUser}></Comments>
        </div>}
    </div>
   
  );
}

export default App;