import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Home from "../../pages/index"
import { moviesDemo } from "./testData";
import { getmovies } from "@/src/fetchers/movieFetchers";


jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      pathname: '/',
      push: jest.fn(),
      prefetch: jest.fn(),
    })),
}));


jest.mock("../../src/fetchers/movieFetchers.ts", () => ({
    getmovies: jest.fn(() =>
      Promise.resolve({
        results: moviesDemo,
        total_pages: 1,
      })
    ),
    getTrailerListByMovieId: jest.fn(() =>
      Promise.resolve({
        tarilers: [
          { id: "1", key: "test1", name: "Trailer 1" },
          { id: "2", key: "test2", name: "Trailer 2" },
        ],
      })
    ),
}));
  
describe("Test the Home page",()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("It should render the home page",()=>{
        const {getByTestId,debug} = render(<Home />);
        const testElement = getByTestId("welcome-title");
        expect(testElement).toBeInTheDocument();
        // debug();
    })

    it("It should render the search input field",()=>{
        const {getByPlaceholderText} = render(<Home/>)
        const searchElelment = getByPlaceholderText('Search your movie');
        expect(searchElelment).toBeInTheDocument();
    })

    it("Should not render the MovieCard components with empty data",()=>{
        const {getByTestId,findByTestId} = render(<Home />);
        const cardElements = screen.queryByTestId("movie-card");
        expect(cardElements).not.toBeInTheDocument()
    })


    it("should search and render movies on enter press", async () => {
        render(<Home />);
        const searchInput = screen.getByTestId("search-field") as HTMLInputElement;
        
        // Enter search keyword
        fireEvent.change(searchInput, { target: { value: "My Title" } });
        expect(searchInput.value).toBe("My Title");
        
        // Press enter key to search movies
        fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });
        const loader = screen.getByTestId("movie-loader");
        expect(loader).toBeInTheDocument();
    
        // Wait for movies to be loaded and rendered
        await act(async () => {
        // chekc with demo data here 
            await getmovies("My Title");
        });
        // Check that movies are rendered
        const movieCards = screen.getAllByTestId("movie-card");
        expect(movieCards.length).toBe(moviesDemo.length);
        expect(loader).not.toBeInTheDocument();

        const titleText = screen.getByText("My Title 3");
        expect(titleText).toBeInTheDocument();
        const titleText4 = screen.queryByText("My Title 4");
        expect(titleText4).not.toBeInTheDocument();
      });

    
})
