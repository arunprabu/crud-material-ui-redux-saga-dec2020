import { Button, Card, CardActionArea, CardActions, CardContent, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { fetchRequestById, updateRequestById } from '../../store/posts/actions';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../../store';
import { connect } from 'react-redux';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  post: any
  errors?: string,
  status?: boolean
}

interface PropsFromDispatch {
  getPostById: typeof fetchRequestById
  putRequestById: typeof updateRequestById
}

interface RouteParams {
  id: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>

class PostDetails extends Component<AllProps> {

  state = {
    open: false,
    formData: {
    }
  }

  componentDidMount = () => {
    // Send req to get the postById 

    const { match, getPostById } = this.props;
    getPostById(match.params.id);
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

  handleUpdate = (event: any) => {
    event.preventDefault();
    this.props.putRequestById(this.state.formData);
  }

  handleChange = (e: any) =>{
    this.setState({
      formData: {
        id: parseInt(this.props.match.params.id),
        [e.target.name]: e.target.value
      }
    });
  }
  
  componentDidUpdate(){
    // ideal place for displying notification
    // and also you can auto close the modal if it is UX recommendation    
  }

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
                     #{this.props.post.id}. {this.props.post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.post.body}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" variant='contained' color="primary" onClick={this.handleClickOpen}>
                    Edit
                  </Button>
                  <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <form onSubmit={this.handleUpdate}>
                      <DialogTitle id="form-dialog-title">Update</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Edit the inputs and Click the button to update
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          name="title"
                          label="Enter Post Title"
                          type="text"
                          defaultValue={this.props.post.title}
                          onChange={this.handleChange}
                          fullWidth
                        />
                        <br/><br/>
                        <TextField
                          autoFocus
                          margin="dense"
                          name="body"
                          label="Enter Post Content"
                          type="text"
                          defaultValue={this.props.post.body}
                          onChange={this.handleChange}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button type='submit' color="primary">
                          Update
                        </Button>
                      </DialogActions>
                    </form>
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

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ posts }: ApplicationState) => {
  console.log(posts);
  return{
    post: posts.post,
    errors: posts.errors,
    status: posts.status
  }
}

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps: PropsFromDispatch = {
  getPostById: fetchRequestById,
  putRequestById: updateRequestById
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails); 