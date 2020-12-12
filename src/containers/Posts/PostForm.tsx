import { Button, TextField } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { createRequest } from '../../store/posts/actions';
import { Post } from '../../store/posts/types';


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  postList: Post[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  createRequest: typeof createRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

class PostForm extends Component<AllProps> {

  state = {
    formData: {
      title: '',
      body: ''
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(this.state.formData);
    const { createRequest } = this.props;
    createRequest(this.state.formData);
  }

  handleInput = (e: any) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {

    return (
      <div>
        <h2>Add your Blog Post</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Post Title"
            id="margin-normal"
            name="title"
            helperText="Enter Post Title"
            onChange={this.handleInput}
          />
          <br /><br />
          <TextField
            label="Enter Post Content"
            id="margin-normal"
            name="body"
            helperText="Max 600 characters"
            onChange={this.handleInput}
          />
          <br/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >Submit</Button>
        </form>
      </div>
    )
  }
}


// map state data to props
// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ posts }: ApplicationState) => {
  return {
    loading: posts.loading,
    errors: posts.errors,
    postList: posts.postList
  }
}

// map the dispatch to props
// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  createRequest
} 

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);