import { Container, Grid, Paper } from '@material-ui/core'
import React, { Component } from 'react'

class PostDetails extends Component {
  render() {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <h1>Post Details</h1>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default PostDetails;