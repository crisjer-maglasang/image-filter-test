import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PhotoList from "../components/PhotoList";

// Mock Redux store
const mockStore = configureStore([]);

describe("PhotoList component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      photos: {
        photos: [
          {
            id: 1,
            thumbnailUrl: "https://example.com/photo1.jpg",
            title: "Photo 1",
          },
          {
            id: 2,
            thumbnailUrl: "https://example.com/photo2.jpg",
            title: "Photo 2",
          },
        ],
        isPhotosLoading: false,
        hasMore: true,
        selectedAlbum: null,
      },
    });
  });

  it("renders photos correctly", () => {
    render(
      <Provider store={store}>
        <PhotoList />
      </Provider>
    );

    const photoElements = screen.getAllByAltText(/Photo \d/);
    expect(photoElements).toHaveLength(2);
  });

  it("loads more photos on scroll", () => {
    render(
      <Provider store={store}>
        <PhotoList />
      </Provider>
    );

    window.innerHeight = 600;
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1200,
    });

    fireEvent.scroll(window);

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "photos/fetchPhotosStart" });
  });
});
