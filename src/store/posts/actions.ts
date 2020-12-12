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
export const fetchError = (message: string) => action(PostsActionTypes.FETCH_ERROR, message)
