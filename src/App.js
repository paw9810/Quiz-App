import { BrowserRouter as Router/*, Switch, Route, Link*/ } from "react-router-dom";
//import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import quizRes from './resources/quiz.json'

function App() {
  
  //const [quizData, setQuizData] = useState(quizRes)
  const quizData = quizRes

  return (
    <Router>
      <div className="App">
        <Header />
        <Home quizData={quizData}/>
      </div>
    </Router>
  );
}

export default App;
