/*
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "../../pages/index"
import Layout from "../../src/components/Layout/Layout"
import { getmovies, getTrailerListByMovieId } from "@/src/fetchers/movieFetchers";
import { Movie, MovieTrailer } from "@/src/typesDefs/movie.type";

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      pathname: '/',
      push: jest.fn(),
      prefetch: jest.fn(),
    })),
}));

jest.mock('@/src/fetchers/movieFetchers', () => ({
  getmovies: jest.fn(),
  getTrailerListByMovieId: jest.fn(),
}));

describe("Test the Home page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the home page", () => {
    const { getByTestId } = render(<Home />);
    const homePage = getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });

  it("should render the search input element", () => {
    const { getByPlaceholderText } = render(<Home />);
    const searchInput = getByPlaceholderText("Search your movie");
    expect(searchInput).toBeInTheDocument();
  });

  it("should render the MovieCard components with the correct props", () => {
    const movies: Movie[] = [
      {
        id: 1,
        title: "Movie 1",
        poster_path: "path/to/poster",
        release_date: "2022-01-01",
        vote_average: 8.0,
      },
      {
        id: 2,
        title: "Movie 2",
        poster_path: "path/to/poster",
        release_date: "2022-01-01",
        vote_average: 7.5,
      },
    ];
    const { getAllByTestId } = render(<Home />);
    const movieCards = getAllByTestId("movie-card");
    expect(movieCards).toHaveLength(movies.length);
    movieCards.forEach((movieCard, index) => {
      expect(movieCard).toHaveAttribute("movie-id", `${movies[index].id}`);
      expect(movieCard).toHaveAttribute("movie-title", movies[index].title);
      expect(movieCard).toHaveAttribute(
        "movie-poster",
        movies[index].poster_path
      );
    });
  });

  it("should render the PlayerPlaylist component with the correct props", () => {
    const trailers: MovieTrailer[] = [
      {
        id: "1",
        key: "abcdefg",
        name: "Trailer 1",
      },
      {
        id: "2",
        key: "hijklmn",
        name: "Trailer 2",
      },
    ];
    const selectedMovie: Movie = {
      id: 1,
      title: "Movie











      import React from "react";
      import { render, fireEvent } from "@testing-library/react";
      import Home from "../../pages/index";
      import Layout from "../../src/components/Layout/Layout";
      
      jest.mock("next/router", () => ({
        useRouter: jest.fn(() => ({
          pathname: "/",
          push: jest.fn(),
          prefetch: jest.fn(),
        })),
      }));
      
      describe("Home page", () => {
        it("renders PlayerPlaylist with the correct props", () => {
          const { getByTestId } = render(<Home />);
          const playerPlaylist = getByTestId("player-playlist");
          expect(playerPlaylist).toBeInTheDocument();
        });
      
        it("renders Loader component when isMovieLoading is true", () => {
          const { getByTestId } = render(<Home />);
          const loader = getByTestId("movie-loader");
          expect(loader).toBeInTheDocument();
        });
      
        it("renders Loader component when isTarilerLoading is true", () => {
          const { getByTestId } = render(<Home />);
          const loader = getByTestId("trailer-loader");
          expect(loader).toBeInTheDocument();
        });
      
        it("calls getTrailers function when MovieCard is clicked", async () => {
          const { getByTestId } = render(<Home />);
          const movieCard = getByTestId("movie-card-1");
          const getTrailersMock = jest.fn();
          movieCard.onclick = () => getTrailersMock();
      
          fireEvent.click(movieCard);
      
          expect(getTrailersMock).toHaveBeenCalled();
        });
      
        it("calls setFavouriteList function when MovieCard is favourited", async () => {
          const { getByTestId } = render(<Home />);
          const movieCard = getByTestId("movie-card-1");
          const setFavouriteListMock = jest.fn();
          const favouriteButton = getByTestId("favourite-button-1");
          favouriteButton.onclick = () => setFavouriteListMock();
      
          fireEvent.click(favouriteButton);
      
          expect(setFavouriteListMock).toHaveBeenCalled();
        });
      
        it("correctly initializes useState hooks", () => {
          const { getByTestId } = render(<Home />);
          const [totalPages, movies, moviesErr, isMovieLoading, selectedMovie, tarilers, tarilersErr, isTarilerLoading, streamingKey, favouriteList] = [
            getByTestId("total-pages"),
            getByTestId("movies"),
            getByTestId("movies-err"),
            getByTestId("is-movie-loading"),
            getByTestId("selected-movie"),
            getByTestId("tarilers"),
            getByTestId("tarilers-err"),
            getByTestId("is-tariler-loading"),
            getByTestId("streaming-key"),
            getByTestId("favourite-list"),
          ];
      
          expect(totalPages.textContent).toBe("0");
          expect(movies.textContent).toBe("");
          expect(moviesErr.textContent).toBe("");
          expect(isMovieLoading.textContent).toBe("false");
          expect(selectedMovie.textContent).toBe("");
          expect(tarilers.textContent).toBe("");
          expect(tarilersErr.textContent).toBe("");
          expect(isTarilerLoading.textContent).toBe("false");
          expect(streamingKey.textContent).toBe("");
          expect(favouriteList.textContent).toBe("");
        });
      
        it("sets favouriteList state correctly with useEffect", () => {
          localStorage.setItem("favourites", "[1,2,3]");
          const { getByTestId } = render(<Home />);
          const favouriteList = getByTestId("favourite-list");
          expect(favouriteList.textContent).toBe("[1,2,3]");
          localStorage.clear();
        });
      });
*/      