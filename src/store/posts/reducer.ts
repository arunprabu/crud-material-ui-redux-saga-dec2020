import { Reducer } from 'redux';
import { PostsState, PostsActionTypes } from './types';

// Type-safe initialState! // Custom data type for the initialState 
const initialState: PostsState = {
  postList: [],
  post: {},
  errors: undefined,
  loading: false,
  status: undefined
}

// everything will remain type-safe.
const reducer: Reducer<PostsState> = (state = initialState, action) => {

  switch (action.type) {
    case PostsActionTypes.CREATE_REQUEST ||
      PostsActionTypes.FETCH_REQUEST ||
      PostsActionTypes.FETCH_REQUEST_BY_ID ||
      PostsActionTypes.UPDATE_REQUEST_BY_ID:
      console.log('[Inside reducer in FETCH_REQUEST]');
      return { ...state, loading: true }

    case PostsActionTypes.FETCH_ERROR:
        return state;

    case PostsActionTypes.CREATE_SUCCESS:
      let createPostState = {
        ...state,
        postList: [
          ...state.postList,
          action.payload
        ]
      }
      return createPostState;

    case PostsActionTypes.FETCH_SUCCESS:
      console.log('[Step 5: Inside Reducer in FETCH SUCCESS]');
      let newState = {
        ...state,
        postList: action.payload
      }
      return newState;

    case PostsActionTypes.FETCH_SUCCESS_BY_ID:
      return { ...state, loading: false, post: action.payload }

    case PostsActionTypes.UPDATE_SUCCESS_BY_ID:
    
      // in this if/else check for status code.. json placeholder doesn't give it
      if(action.payload){
        alert('Updated Successfully!');
        return { ...state, loading: false, status: true}
      }else{
        alert('Not updated. Some error');
        return { ...state, loading: false, status: false}
      }
      
    default:  // don't forget default
      return state;
  }
}

// Instead of using default export, we use named exports. 
// That way we can group these exports
// inside the `store/index.ts` file.
export { reducer as postsReducer }