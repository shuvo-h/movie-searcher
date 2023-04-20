import { getMovieListByMovieIds, getTrailerListByMovieId } from "@/src/fetchers/movieFetchers";
import { waitFor } from "@testing-library/react";
import axios from "axios";
import { demoMovieTrailers, movieDetailsData } from "../__page__/testData";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("It should test movie fetchers methhods",()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    afterAll(()=>{
        jest.clearAllMocks();
    })
    it("It should return right traillerList ",async()=>{
        mockedAxios.get.mockResolvedValue({
            data:{results:demoMovieTrailers},
        })
        const actualResponse = await getTrailerListByMovieId(5778);
        
        expect(actualResponse.error).toBeFalsy();
        expect(actualResponse.message).toBe("");
        expect(actualResponse.tarilers.length).toEqual(demoMovieTrailers.length);
    })
    it("It should return error with empty traillerList", async () => {
        mockedAxios.get.mockResolvedValue({
            data:{...movieDetailsData[0]}
        });
        const actualResponse = await getMovieListByMovieIds([5778,4444]);
        expect(actualResponse.error).toBe(false);
        expect(actualResponse.message).toBe("");
        expect(actualResponse.favouriteList.length).toEqual(2);
    });
    it("It should return error with error traillerList", async () => {
        mockedAxios.get.mockRejectedValue(new Error("API Error"));
        const actualResponse = await getMovieListByMovieIds([5778,4444]);
        expect(actualResponse.error).toBe(true);
        // expect(actualResponse.message).toBe("");
        expect(actualResponse.favouriteList.length).toEqual(0);
    });
      
})