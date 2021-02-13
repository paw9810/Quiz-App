import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Quiz from './Quiz'

const useStyles = makeStyles((theme) => ({
    navParent: {
      padding: 0
    },
    navLinks: {
        boxSizing: 'content-box',
        padding: 10,
        width: '100%'
    },
    homeTitle: {
        marginTop: 50,
        marginBottom: 20
    }
  }));

const Home = ({ quizData }) => {
    const [quizId, setQuizId] = useState()
    const location = useLocation()
    const classes = useStyles();

    return (
        <div>
                {(location.pathname === '/Home' || location.pathname === '/')&&
                (<Typography 
                    className={classes.homeTitle} 
                    align='center' 
                    component='h2'>Wybierz Quiz</Typography>
                )}
                {(location.pathname === '/Home' || location.pathname === '/')&&
                    (
                        
                        quizData.map((quiz) => (
                        <React.Fragment key={quiz.id}>
                            <ListItem button divider className={classes.navParent}>  
                                <Link 
                                    to='/Quiz' 
                                    onClick={() => setQuizId(quiz.id)}
                                    className={classes.navLinks}
                                    style={{textDecoration: 'none'}}
                                >
                                    <Typography align='center' color='primary'>
                                        {quiz.name}
                                    </Typography>
                                </Link>
                            </ListItem>
                        
                        </React.Fragment>
                        ))
                    )
                }
            
            <Route path='/Quiz'><Quiz quizId={quizId} quizData={quizData}/></Route>
        </div>
        
    )
}

export default Home
