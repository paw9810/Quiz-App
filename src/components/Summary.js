import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, Route } from 'react-router-dom'

const Summary = ({ score }) => {

  return (
    <div style={{paddingTop:50, textAlign:'center'}}>
      <Typography align='center' variant='h5' style={{paddingBottom:40}}>Podsumowanie</Typography>
      <Typography align='center' component='p'>Liczba punktów:</Typography>
      <Typography align='center' component='p'>{score}</Typography>
      <Button variant='contained' color='primary' to='/' component={Link} style={{marginTop:30}}>Powrót do wyboru quizu</Button>
      <Route exact path='/'></Route>
    </div>
  )
}

export default Summary
