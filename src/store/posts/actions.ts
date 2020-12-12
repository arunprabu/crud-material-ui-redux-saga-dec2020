import { action } from 'typesafe-actions';
import { Post, PostsActionTypes } from './types';
export const fetchRequest = () => {
  console.log('[Step 2. Inside actions.ts]');
  return action(PostsActionTypes.FETCH_REQUEST)
}

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Post[]) => {
  console.log('[Step 4: Inside fetchSuccess]');
  return action(PostsActionTypes.FETCH_SUCCESS, data)
}
export const fetchError = (message: string) => action(PostsActionTypes.FETCH_ERROR, message);

// for adding a post

// for add post
export const createRequest = (post: Post) => {
  console.log(post);
  return action(PostsActionTypes.CREATE_REQUEST, post)
}
export const createSuccess = (data: Post) => {
  console.log(data);
  return action(PostsActionTypes.CREATE_SUCCESS, data);
}

// for post details 
export const fetchRequestById = (postId: string) => action(PostsActionTypes.FETCH_REQUEST_BY_ID, postId)
export const fetchSuccessById = (data: Post) => action(PostsActionTypes.FETCH_SUCCESS_BY_ID, data);
// todo handle fetchErrorById 

// for post details update
export const updateRequestById = (post: Post) => action(PostsActionTypes.UPDATE_REQUEST_BY_ID, post)
export const updateSuccessById = (data: Post) => action(PostsActionTypes.UPDATE_SUCCESS_BY_ID, data);


