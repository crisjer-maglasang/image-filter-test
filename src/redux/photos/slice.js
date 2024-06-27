import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: [],
  isPhotosLoading: false,
  error: null,
  page: 1,
  hasMore: true,
  albumList: [],
  isAlbumListLoading: false,
  selectedAlbum: "",
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    fetchPhotosStart(state) {
      state.isPhotosLoading = true;
      state.error = null;
    },
    fetchPhotosSuccess(state, action) {
      state.isPhotosLoading = false;
      state.photos.push(...action.payload.photos);
      state.page += 1;
      state.hasMore = action.payload.photos.length > 0;
    },
    fetchPhotosFailure(state, action) {
      state.isPhotosLoading = false;
      state.error = action.payload;
    },
    fetchAlbumListStart(state, action) {
      state.isAlbumListLoading = true;
      state.error = action.null;
    },
    fetchAlbumListFailure(state, action) {
      state.albumList = action.payload;
      state.error = action.payload;
    },
    fetchAlbumListSuccess(state, action) {
      state.albumList = action.payload;
      state.isAlbumListLoading = false;
    },
    setSelectedAlbum(state, action) {
      state.selectedAlbum = action.payload;
      state.page = 1;
      state.photos = [];
      state.hasMore = true;
    },
  },
});

export const {
  fetchPhotosStart,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  fetchAlbumListStart,
  fetchAlbumListSuccess,
  fetchAlbumListFailure,
  setSelectedAlbum,
} = photosSlice.actions;

export default photosSlice.reducer;
