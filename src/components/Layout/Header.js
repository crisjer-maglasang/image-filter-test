import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAlbumListStart,
  setSelectedAlbum,
} from "../../redux/photos/slice";

const Header = () => {
  const dispatch = useDispatch();
  const albumList = useSelector((state) => state.photos.albumList);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchAlbumListStart());
  }, [dispatch]);

  const submitAlbum = (value) => {
    dispatch(setSelectedAlbum(value));
  };

  return (
    <header className="mt-5 fixed w-[100%]  flex justify-center items-center flex-1 z-10">
      <div className="bg-gray-800 border-1 border-gray-900 shadow-md rounded-full w-[90%] flex flex-col sm:flex-row sm:justify-between px-8">
        <h1 className="hidden sm:block text-2xl py-4 text-white">
          Photo Filter App
        </h1>
        <SearchBar
          onSearch={() => {}}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          dropDownOptions={albumList}
          dropDownClickAction={submitAlbum}
        />
      </div>
    </header>
  );
};

export default Header;
