import React from "react";
import { render } from "@testing-library/react";
import Home from "../../pages/index"
import Layout from "../../src/components/Layout/Layout"
import { Movie } from "@/src/typesDefs/movie.type";
import { moviesDemo } from "./testData";


jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      pathname: '/',
      push: jest.fn(),
      prefetch: jest.fn(),
    })),
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

    // it("Should render the MovieCard components with props",()=>{
    //     const {getByTestId} = render(<Home />);
    //     const cardElements = getByTestId("movie-card");
    //     expect(cardElements).toHaveLength(moviesDemo.length)
    // })
})
