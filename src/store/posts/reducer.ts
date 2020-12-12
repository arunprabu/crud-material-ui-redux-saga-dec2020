import { Reducer } from 'redux';
import { PostsState, PostsActionTypes } from './types';

// Type-safe initialState! // Custom data type for the initialState 
const initialState: PostsState = {
  postList: [],
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

    case PostsActionTypes.CREATE_SUCCESS: 
        return state;

    case PostsActionTypes.FETCH_SUCCESS: 
      console.log('[Step 5: Inside Reducer in FETCH SUCCESS]');
      let newState = {
        ...state,
        postList: action.payload
      }
      return newState;

    case PostsActionTypes.FETCH_ERROR: 
      return state;

    case PostsActionTypes.FETCH_SUCCESS_BY_ID: 
      return state;

    case PostsActionTypes.UPDATE_SUCCESS_BY_ID: 
      return state;
    default:  // don't forget default
      return state;
  }
}

// Instead of using default export, we use named exports. 
// That way we can group these exports
// inside the `store/index.ts` file.
export { reducer as postsReducer }