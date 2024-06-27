import React, { useEffect } from "react";
import LazyImage from "./LazyImage.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotosStart } from "../redux/photos/slice.js";

const PhotoList = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos.photos);
  const loading = useSelector((state) => state.photos.isPhotosLoading);
  const hasMore = useSelector((state) => state.photos.hasMore);
  const selectedAlbum = useSelector((state) => state.photos.selectedAlbum);

  useEffect(() => {
    dispatch(fetchPhotosStart());
  }, [dispatch, selectedAlbum]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !loading &&
        hasMore
      ) {
        dispatch(fetchPhotosStart());
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, hasMore]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {photos.map((photo) => (
        <div key={photo.id} className="bg-gray-700 p-4 shadow rounded">
          <LazyImage
            src={photo.thumbnailUrl}
            alt={photo.title}
            title={photo.title}
            className="w-full h-auto mb-2"
          />
        </div>
      ))}
      {loading && (
        <div className="text-center text-white w-full">
          Loading more photos...
        </div>
      )}
    </div>
  );
};

export default PhotoList;
