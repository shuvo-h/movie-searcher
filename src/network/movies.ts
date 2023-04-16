import { AxiosResponse } from 'axios';
import  axios  from 'axios';

import ApiClient from "./ApiClient";

class MovieClient  extends ApiClient{
    constructor(){
        super('movie',{});
    }

    getMovieTrailer(movieID:number){
        const url = `${this.url}/${movieID}/videos?api_key=${this.getKeys().movieApiKey}`;
        const c =  axios.get(url);
        return axios.get(url);
    }

    getMoviesByIdList(movie_ids:number[]){
        const axiosPromises:Promise<AxiosResponse<any, any>>[] = [];
        movie_ids.forEach((movieId:number)=>{
            const url = `${this.url}/${movieId}?api_key=${this.getKeys().movieApiKey}`;
            axiosPromises.push(axios.get(url))
        });
        return axiosPromises;
    }
}

const MovieFetcher = new MovieClient();
export default MovieFetcher;