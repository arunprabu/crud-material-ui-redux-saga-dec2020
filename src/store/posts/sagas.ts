/* generator function for watching over the req from component   -- watcher saga
  watcher function will be actively watching for actions from components 
  upon getting actions then the handler will be called 

generator function for handling ajax calls    -- worker saga 
  it will send ajax calls 
  get the resp and yield the result to reducers */

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { PostsActionTypes } from "./types";

import { callApi } from '../../utils/api';
import { fetchError, fetchSuccess } from "./actions";

const API_ENDPOINT = 'http://jsonplaceholder.typicode.com/posts';


// worker saga
function* handleFetch() {
  console.log('[Step 3. Inside handleFetch]');
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT)
    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(PostsActionTypes.FETCH_REQUEST, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
// rootSaga for the feature
function* postsSaga() {
  yield all([
    fork(watchFetchRequest)
  ])
}

export default postsSaga;