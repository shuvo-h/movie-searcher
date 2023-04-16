import MovieFetcher from "../network/movies";
import SearchFetcher from "../network/search";
import { Movie, MovieSearchQuery, MovieTrailer } from "../typesDefs/movie.type";

interface errorType {
  error: Boolean;
  message: string;
}
interface getMoviesReturn extends errorType {
  page: number;
  results: Movie[];
  total_pages: number;
}
export const getmovies = async (
  searchText: string,
  option: MovieSearchQuery = {}
): Promise<getMoviesReturn> => {
  try {
    const { data } = await SearchFetcher.searchMovie(searchText);
    return data;
  } catch (error: any) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      error: true,
      message: error.message,
    };
  }
};

interface TrailerListByID extends errorType {
  tarilers: MovieTrailer[];
}
export const getTrailerListByMovieId = async (movieID: number): Promise<TrailerListByID> => {
  try {
    const { data } = await MovieFetcher.getMovieTrailer(movieID);
    return { error: false, message: "", tarilers: data.results };
  } catch (error: any) {
    return { error: true, message: error.message, tarilers: [] };
  }
};

interface FavouriteListByID extends errorType {
  favouriteList: Movie[];
}
export const getMovieListByMovieIds = async (movieIDs: number[]):Promise<FavouriteListByID> => {
  try {
    const allFavouriteRes = await Promise.all(MovieFetcher.getMoviesByIdList(movieIDs));
    const result = allFavouriteRes.map(({data}) =>data);
    return { error: false, message: "", favouriteList: result };
  } catch (error: any) {
    return { error: true, message: error.message, favouriteList: [] };
  }
};
