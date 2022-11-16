import logo from './logo.svg';
import './App.css';
import GuildPage from './GuildPage/GuildPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GuildPage/>
      </header>
    </div>
  );
}

export default App;
