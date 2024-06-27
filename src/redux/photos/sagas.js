import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchPhotosStart,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  fetchAlbumListStart,
  fetchAlbumListSuccess,
  fetchAlbumListFailure,
} from "./slice";

const PHOTOS_PER_PAGE = 20;

function* fetchPhotosSaga() {
  const { page, hasMore, selectedAlbum } = yield select(
    (state) => state.photos
  );
  if (!hasMore) return;
  try {
    let url = `https://jsonplaceholder.typicode.com/photos?_limit=${PHOTOS_PER_PAGE}&_page=${page}`;

    if (selectedAlbum !== "") {
      url += `&albumId=${selectedAlbum}`;
    }

    const response = yield call(axios.get, url);
    yield put(fetchPhotosSuccess({ photos: response.data }));
  } catch (error) {
    yield put(fetchPhotosFailure(error.message));
  }
}

function* fetchAlbumListSaga() {
  try {
    const response = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/albums"
    );
    yield put(fetchAlbumListSuccess(response.data));
  } catch (error) {
    yield put(fetchAlbumListFailure(error.message));
  }
}

function* watchFetchPhotos() {
  yield takeLatest(fetchPhotosStart.type, fetchPhotosSaga);
  yield takeLatest(fetchAlbumListStart.type, fetchAlbumListSaga);
}

export default watchFetchPhotos;
