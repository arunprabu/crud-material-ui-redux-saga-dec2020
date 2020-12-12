export interface Post extends ApiResponse{
  id?: number
  title?: string
  body?: string
}

// This type is basically shorthand for `{ [key: string]: any }`. 
// Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum PostsActionTypes {
  CREATE_REQUEST = '@@posts/CREATE_REQUEST',  // for add post 
  CREATE_SUCCESS = '@@posts/CREATE_SUCCESS',   // // for add post  - success
  CREATE_ERROR = '@@posts/CREATE_ERROR',   // // for add post  - error

  FETCH_REQUEST = '@@posts/FETCH_REQUEST',  // for get all posts
  FETCH_SUCCESS = '@@posts/FETCH_SUCCESS',  // for get all posts success
  FETCH_ERROR = '@@posts/FETCH_ERROR',      // for post related errors 

  FETCH_REQUEST_BY_ID = '@@posts/FETCH_REQUEST_BY_ID',   // for get post by id 
  FETCH_SUCCESS_BY_ID = '@@posts/FETCH_SUCCESS_BY_ID',   // for get post by id - success 
  FETCH_ERROR_BY_ID = '@@posts/FETCH_ERROR_BY_ID',   // for get post by id - error 

  UPDATE_REQUEST_BY_ID = '@@posts/UPDATE_REQUEST_BY_ID',  // for update post by id
  UPDATE_SUCCESS_BY_ID = '@@posts/UPDATE_SUCCESS_BY_ID',   // // for update post by id - success
  UPDATE_ERROR_BY_ID = '@@posts/UPDATE_ERROR_BY_ID'   // // for update post by id - error
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface PostsState {
  readonly loading: boolean
  readonly postList: []
  readonly post: {}
  readonly errors?: string,
  readonly status?: boolean
}

