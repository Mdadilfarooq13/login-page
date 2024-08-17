import Login from "./components/Login.js";
import logo from './assets/logo.svg';

function App() {
  return (
    <div className="container-app">
      <header className="header">
        <div className="header-left">
          <h1>DEMAND FORECAST</h1>
        </div>
        <div className="header-right">
          <h1>Blend</h1>
          <img src={logo} alt="Company Logo" className="header-logo" />
        </div>
      </header>
      <Login />
    </div>
  )
}

export default App;