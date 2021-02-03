import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.quizTitle} align='center' component='h3'>{quiz.name}</Typography>
      {console.log(quizId)}

      <ButtonGroup variant="contained" color="primary">
        <Button>Poprzednie</Button>
        <Button>Następne</Button>
      </ButtonGroup>
    </div>
  )
}

export default Quiz
