import Comments from './Comments';
import useFetch from './useFetch';

function App() {
  const currentUser= useFetch('https://my-json-server.typicode.com/juneboom/fake-comments-api/currentUser');
  
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