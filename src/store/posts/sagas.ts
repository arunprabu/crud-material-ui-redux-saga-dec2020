/* generator function for watching over the req from component   -- watcher saga
  watcher function will be actively watching for actions from components 
  upon getting actions then the handler will be called 

generator function for handling ajax calls    -- worker saga 
  it will send ajax calls 
  get the resp and yield the result to reducers */

import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { PostsActionTypes } from "./types";

import { callApi } from '../../utils/api';
import { createSuccess, fetchError, fetchRequestById, fetchSuccess, fetchSuccessById, createRequest, 
  updateRequestById, updateSuccessById } from "./actions";

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

// Create Req
function* handleCreate(action: ReturnType<typeof createRequest>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'post', API_ENDPOINT, action.payload)
    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(createSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function for createRequest
function* watchCreateRequest() {
  yield takeEvery(PostsActionTypes.CREATE_REQUEST, handleCreate)
}

//worker saga
function* handleFetchById(action: ReturnType<typeof fetchRequestById>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', `${API_ENDPOINT}/${action.payload}` )

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccessById(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

//watcher saga
function* watchFetchById() {
  yield takeEvery(PostsActionTypes.FETCH_REQUEST_BY_ID, handleFetchById)
}

//  worker for update
function* handleUpdateById(action: ReturnType<typeof updateRequestById>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'put', `${API_ENDPOINT}/${action.payload.id}` )

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(updateSuccessById(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// watcher for update
function* watchUpdateById() {
  yield takeEvery(PostsActionTypes.UPDATE_REQUEST_BY_ID, handleUpdateById)
}


// We can also use `fork()` here to split our saga into multiple watchers.
// rootSaga for the feature - posts
function* postsSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchById),
    fork(watchCreateRequest),
    fork(watchUpdateById)
  ])
}

export default postsSaga;