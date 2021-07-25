import './App.css';

function App() {
  // let bibibibi = '뭐라구 안들리는데';
  // function test1() {
  //   return '잘들리는데??'
  // }
  let post = 'title';
  return (
    <div className="App">
      <div className="black-nav">
        SeeULater
      </div>
      {/* <h4>{bibibibi}</h4>
      {test1()} */}
      <div className="list">
        <h3>{ post }</h3>
        <p>content</p>
        <hr/>
      </div>
    </div>
  );
}

export default App;
