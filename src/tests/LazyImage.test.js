import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LazyImage from "../components/LazyImage";

// Improved IntersectionObserver Mock
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Map(); // Using Map to store elements and their entries
  }

  observe = (element) => {
    const entry = {
      target: element,
      isIntersecting: true, // Simulate intersection immediately
    };
    this.elements.set(element, entry);
    this.callback(Array.from(this.elements.values()));
  };

  unobserve = (element) => {
    this.elements.delete(element);
  };

  disconnect = () => {
    this.elements.clear();
  };
}

window.IntersectionObserver = IntersectionObserverMock;

describe("LazyImage component", () => {
  const src = "https://example.com/image.jpg";
  const alt = "Example Image";
  const title = "Example Title";

  it("renders correctly with given props", () => {
    render(<LazyImage src={src} alt={alt} title={title} />);

    expect(screen.getByAltText(alt)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("sets image src when element intersects", () => {
    render(<LazyImage src={src} alt={alt} title={title} />);

    const image = screen.getByAltText(alt);
    expect(image.src).toBe(src); // The src should be set after intersection
  });

  it("shows loading spinner initially and hides after image load", () => {
    render(<LazyImage src={src} alt={alt} title={title} />);

    const spinner = screen.getByLabelText("oval-loading");
    expect(spinner).toBeInTheDocument(); // Spinner should be visible initially

    const image = screen.getByAltText(alt);
    fireEvent.load(image); // Simulate image load

    expect(spinner).not.toBeInTheDocument(); // Spinner should be hidden after image load
  });
});
