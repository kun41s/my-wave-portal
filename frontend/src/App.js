import './App.css';

function App() {

  const wave = () => {
    
  }

  return (
    <div className= "mainContainer">

      <div className="dataContainer">
        <div className="header">
          <h1>Wave Me</h1>
        </div>

        <div className="bio">
          <p>Hi, I'm Kunal, I'm learning blockchain development with this simple wave portal I made my first web3 project</p>          
        </div>

        <button className="waveButton" onClick= {wave}>
          Wave at me
        </button>
      </div>
    </div>
  );
}

export default App;
