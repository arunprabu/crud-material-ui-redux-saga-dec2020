import { Button, Card, CardActionArea, CardActions, CardContent, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PostDetails extends Component {

  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <h1>Post Details</h1>
              <Card className='text-left'>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Post No 1
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" variant='contained' color="primary" onClick={this.handleClickOpen}>
                    Edit
                  </Button>
                  <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Edit the inputs and Click the button to update
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter Post Title"
                        type="text"
                        fullWidth
                      />
                      <br/><br/>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter Post Content"
                        type="text"
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={this.handleClose} color="primary">
                        Update
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Button size="small" variant='outlined' color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default PostDetails;