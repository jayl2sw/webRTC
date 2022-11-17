import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import GuildPage from './GuildPage/GuildPage';

function App() {
  const [localStream, setLocalStream] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GuildPage localStream={localStream} setLocalStream={setLocalStream}/>
      </header>
    </div>
  );
}

export default App;
