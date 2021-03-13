import React from 'react'
import { useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Summary from './Summary'


const useStyles = makeStyles((theme) => ({
  quizTitle: {
      marginTop: 50,
      marginBottom: 20
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 40
  },
  img: {
    maxHeight: 200
  }
}));

const Quiz = ({ quizData, quizId }) => {
  const [quiz, setQuiz] = useState(quizData[quizId-1])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [points, setPoints] = useState(0)
  const [checkboxes, setCheckboxes] = useState(() => {
    let temp = {}
    quizData[quizId-1].questions[0].answers.map((answer, index) => (
      temp[`${index+1}`] = false
    ))
    return temp
  }
  )
  const [answers, setAnswers] = useState([])
  const classes = useStyles();
  const location = useLocation()
  let { path, url } = useRouteMatch();
  
  const handleChange = (e) => {
    setCheckboxes({...checkboxes, [e.target.name]: e.target.checked})
  }

  const isCurrentAnswerCorrect = () => { 
    for (const key in checkboxes) {
      if(checkboxes[key] !== quiz.questions[currentQuestion].answers[key-1].correct) {
        return false
      }
    }
    return true
  }
  

  const isExactAnswerCorrect = (question) => { 
    for (const key in checkboxes) {
      if(answers[question][key] !== quiz.questions[question].answers[key-1].correct ) {
        return false
      }
    }
    return true
  }
  
  const handleNextQuestion = () => {
    if(isCurrentAnswerCorrect()) {
      setPoints((points) => points+1)
    }
    setCurrentQuestion((currentQuestion) => currentQuestion+1)
    if(answers.length > currentQuestion+1) {
      setAnswers((answers) => answers.map((answer, index) => {
        if(index === currentQuestion) {
          return checkboxes
        } return answer
      }))
      setCheckboxes(
        answers[currentQuestion+1]
      )
    } else {
      setAnswers((answers) => [...answers, checkboxes])
      setCheckboxes(() => {
        let temp = {}
        quizData[quizId-1].questions[currentQuestion+1].answers.map((answer, index) => (
          temp[`${index+1}`] = false
        ))
        return temp
      })
    }
    
  }

  const handlePreviousQuestion = () => {
    if(isExactAnswerCorrect(currentQuestion-1)) {
      setPoints((points) => points-1)
    }
    setCurrentQuestion((currentQuestion) => currentQuestion-1)
    //setAnswers((answers) => answers.filter((answer, index) => index !== answers.length-1))
    setCheckboxes(
      answers[currentQuestion-1]
    )

    if(answers.length < currentQuestion+1) {
      setAnswers((answers) => [...answers, checkboxes])
    }
    setAnswers((answers) => answers.map((answer, index) => {
      if(index === currentQuestion) {
        return checkboxes
      } return answer
    }))
    
    
  }

  const handleEnd = () => {
    if(isCurrentAnswerCorrect()) {
      setPoints((points) => points+1)
    }
    if(answers.length > currentQuestion+1) {
      setAnswers((answers) => answers.map((answer, index) => {
        if(index === currentQuestion) {
          return checkboxes
        } return answer
      }))
    } else {
      setAnswers((answers) => [...answers, checkboxes])
    }
  }

  return (
    <>
    {location.pathname === '/Quiz' && (
    <div className={classes.root}>
      <Typography className={classes.quizTitle} align='center' component='h3'>Pytanie nr {currentQuestion+1}:</Typography>
      <Typography>{quiz.questions[currentQuestion].question}</Typography>
      {quiz.questions[currentQuestion].picture.length !== 0 && (
        <img className={classes.img} src={`${process.env.PUBLIC_URL}/img/${quiz.questions[currentQuestion].picture}`} alt='zdj'/>
      )}
      <FormGroup>
        {quiz.questions[currentQuestion].answers.map((answer) => (
          <FormControlLabel
            key={answer.id}
            control={<Checkbox 
                        checked={checkboxes[answer.id]} 
                        color='primary' 
                        onChange={handleChange} 
                        name={answer.id} />}
            label={answer.answer}
          />
        ))}
      
      </FormGroup>

      <ButtonGroup variant="contained" color="primary">
        {currentQuestion !== 0 && 
          <Button onClick={handlePreviousQuestion}>Poprzednie</Button>
        }
        {quiz.questions.length !== currentQuestion+1 && 
          <Button onClick={handleNextQuestion}>Następne</Button>
        }
        {quiz.questions.length === currentQuestion+1 && 
          <Button onClick={handleEnd} variant='contained' color='secondary' to={`${url}/Summary`} component={Link}>Koniec</Button>
        }
      </ButtonGroup>

      
    </div> )}
    <Route path={`${path}/Summary`}>
        <Summary score={points}/>
    </Route>
    </>
  )
}

export default Quiz
