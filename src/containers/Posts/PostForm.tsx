import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';

class PostForm extends Component {
  
  render() {
    return (
      <div>
        <h2>Add Post</h2>
        <form noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Post Title" variant="outlined" 
          placeholder='Enter Post Title' />
          <br/>
          <br/>
          <TextField id="outlined-basic" label="Post Content" variant="outlined" 
          placeholder='Enter Post Content' />
          <br/> <br/>
          <Button variant='contained' color='primary'>Create Post</Button>
        </form>
      </div>
    )
  }
}

export default PostForm;