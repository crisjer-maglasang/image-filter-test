// sagas/index.js
import { all } from "redux-saga/effects";
import watchFetchPhotos from "../photos/sagas";

function* rootSaga() {
  yield all([
    watchFetchPhotos(),
    // Add other sagas here if any
  ]);
}

export default rootSaga;
