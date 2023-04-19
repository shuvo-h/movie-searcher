import { getmovies,getMovieListByMovieIds,getTrailerListByMovieId } from '../../src/fetchers/movieFetchers';
import {getFavouriteIds} from "../../src/utils/handleStorage";
import React from 'react';
import { moviesDemo, trailerListDemo } from "./testData";
import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Home from "../../pages/index";

// jest mock list
jest.mock("next/router",()=>({
    useRouter:jest.fn(()=>({
        pathname:"/"
    }))
}))

jest.mock("../../src/fetchers/movieFetchers",()=>({
    getmovies : jest.fn(),
    getMovieListByMovieIds : jest.fn(),
    getTrailerListByMovieId: jest.fn()
}))

jest.mock("../../src/utils/handleStorage",()=>({
    getFavouriteIds: jest.fn(),
}))

// test cases
describe("Home page testing",()=>{
    // clear mock for each test case
    beforeAll(()=>{
        jest.clearAllMocks();
    })
    afterAll(()=>{
        jest.clearAllMocks();
    })

    //  test the cases
    it("It should render and show initial movie search loader",async()=>{
        // arrange
        const favouriteIdList = [11,22,33];
        (getFavouriteIds as jest.Mock).mockReturnValue(favouriteIdList);
        (getmovies as jest.Mock).mockReturnValue({
            page: 1,
            results: moviesDemo,
            total_pages: 200,
        }); 

        // act 
        render(<Home />);
        const movieLoader = screen.getByTestId("movie-loader");

        // assert 
        expect(movieLoader).toBeInTheDocument();
        await waitForElementToBeRemoved(movieLoader);
        expect(movieLoader).not.toBeInTheDocument();
        const movieEls = screen.getAllByTestId("movie-card");
        expect(movieEls.length).toEqual(moviesDemo.length);
        expect(screen.getByText(moviesDemo[0].title)).toBeInTheDocument();

        // act: search by user
        const searchInput = screen.getByTestId("search-field") as HTMLInputElement;
        act(()=>{
            fireEvent.change(searchInput,{target:{value:"new movie"}})
        })
        expect(searchInput.value).toBe("new movie");
        expect(getmovies).toBeCalledTimes(1);

        // mock first before calling the API function
        (getmovies as jest.Mock).mockReturnValue({
            page: 1,
            results: [{...moviesDemo[0],title:"new movie title"}],
            total_pages: 50,
        }); 
        act(()=>{
            fireEvent.keyDown(searchInput, { key: 'enter', keyCode: 13,target:{value:"new movie"}});

        })
        expect(getmovies).toBeCalledTimes(2);
        expect(getmovies).toBeCalledWith("new movie");
        const movieLoader2 = screen.getByTestId("movie-loader")
        expect(movieLoader2).toBeInTheDocument();
        await waitForElementToBeRemoved(movieLoader2);
        expect(movieLoader2).not.toBeInTheDocument();
        // expect(movieEls.length).toEqual(1);
        expect(screen.getByText("new movie title")).toBeInTheDocument();
        expect(screen.queryByText(moviesDemo[0].title)).not.toBeInTheDocument();

        // act: click by user and get trailer list to watch movie
        const watchBtn = screen.getByTestId(`watch-${moviesDemo[0].id}`);
        expect(watchBtn).toBeInTheDocument();
        (getTrailerListByMovieId as jest.Mock).mockReturnValue({
            tarilers: trailerListDemo,
            error: false,
            message:""
        })
        act(()=>{
            fireEvent.click(watchBtn)
        })
        expect(getTrailerListByMovieId).toBeCalledTimes(1);
        expect(getTrailerListByMovieId).toBeCalledWith(moviesDemo[0].id);
        const trailerLoader = screen.getByTestId("trailer-loader");
        expect(trailerLoader).toBeInTheDocument();
        await waitForElementToBeRemoved(trailerLoader);
        expect(trailerLoader).not.toBeInTheDocument();
        expect(screen.getAllByTestId("trailer-card").length).toEqual(trailerListDemo.length);
        expect(screen.getByText(trailerListDemo[0].name)).toBeInTheDocument();
    })
})