import { Container, createStyles, Grid, makeStyles, Paper, Theme, Button } from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const navigateToPostsHandler = () => {
    history.push('posts');
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Welcome to My App!</h1>
            <br/>
            <Button variant='contained' color='primary' onClick={navigateToPostsHandler}>View Posts</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;
