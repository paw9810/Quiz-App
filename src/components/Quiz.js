import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  quizTitle: {
      marginTop: 50,
      marginBottom: 20
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Quiz = ({ quizData, quizId }) => {
  const [quiz, setQuiz] = useState(quizData[quizId-1])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [points, setPoints] = useState(0)
  const [checkboxes, setCheckboxes] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false
  })
  const classes = useStyles();

  const handleChange = (e) => {
    setCheckboxes({ ...checkboxes, [e.target.name]: e.target.checked })
  }

  const isAnswerCorrect = () => { 
    if(quiz.questions[currentQuestion].answers[0].correct === checkboxes.checkedA &&
    quiz.questions[currentQuestion].answers[1].correct === checkboxes.checkedB &&
    quiz.questions[currentQuestion].answers[2].correct === checkboxes.checkedC) {
      return true
    } else return false
  }
  
  const handleNextQuestion = () => {
    if(isAnswerCorrect()) {
      setPoints(points+1)
    }
    setCurrentQuestion(currentQuestion+1)
    console.log(currentQuestion)
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion-1)
    setPoints(points-1)
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.quizTitle} align='center' component='h3'>Pytanie nr {currentQuestion+1}:</Typography>
      <Typography>{quiz.questions[currentQuestion].question}</Typography>

      <FormGroup>
        {quiz.questions[currentQuestion].answers.map((answer) => (
          <FormControlLabel
            control={<Checkbox 
                        checked={checkboxes[answer.name]} 
                        color='primary' 
                        onChange={handleChange} 
                        name={answer.name} />}
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
        
        
      </ButtonGroup>
    </div>
  )
}

export default Quiz
