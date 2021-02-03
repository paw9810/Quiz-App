import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Home />
      </div>
    </Router>
  );
}

export default App;
