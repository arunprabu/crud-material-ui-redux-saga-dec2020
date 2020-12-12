import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import React, { Component } from 'react';

import { ApplicationState } from '../../store';
import { Post } from '../../store/posts/types';
import { fetchRequest } from '../../store/posts/actions';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  postList: Post[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

class PostList extends Component<AllProps> {

  componentDidMount() {
    console.log('[Step 1. Inside ComponentDidMount]');
    const { fetchRequest } = this.props;
    fetchRequest();
  }


  render() {
    console.log('Inside Render');
    console.log(this.props);
    let posts = null;
    if(this.props.postList && this.props.postList.length > 0){
      posts = this.props.postList.map( (post, index) => {
        return(
          <Card className='text-left' key={index} style={{marginBottom: '10px'}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  #{post.id}. {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to={`/posts/${post.id}`}>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </Link> 
            </CardActions>
          </Card>
        )
      });
    }


    return (
      <div>
        <h2>Post List</h2>

        {  this.props.postList && this.props.postList.length > 0? 
            posts
            :
            <CircularProgress />
        }
      </div>
    )
  }
}

// map state data to props
// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ posts }: ApplicationState) => {
  console.log('[Called before rendering -- in mapStateToProps]')
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
  fetchRequest
} 

export default connect(mapStateToProps, mapDispatchToProps)(PostList);