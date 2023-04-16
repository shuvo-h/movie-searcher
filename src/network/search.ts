import axios, { AxiosResponse } from "axios";
import { MovieSearchQuery } from "../typesDefs/movie.type";
import ApiClient from "./ApiClient"

class SearchClient extends ApiClient{
    constructor(){
        super("search",{});
    }

    searchMovie(searchText:string, option:MovieSearchQuery={}):Promise<AxiosResponse>{
        const query = Object.keys(option).reduce((pre:string,curr)=>{
            const value = option[curr as keyof MovieSearchQuery];
            return value ? `${pre}&${curr}=${value}` : pre;
        },"").substring(1);

        const searchUrl = `${this.url}/movie?api_key=${this.getKeys().movieApiKey}&query=${searchText}${query ? '&'+query : ""}`;
        
        return axios.get(searchUrl);
    }
}

const SearchFetcher = new SearchClient();

export default SearchFetcher;