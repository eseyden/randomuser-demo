import logo from "../images/paw.svg";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={logo}
                    className="App-logo bg-gradient-to-b from-sky to-white rounded-full"
                    alt="logo"
                />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
