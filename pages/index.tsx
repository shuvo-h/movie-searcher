// import Layout from "@/src/components/Layout/Layout";
import Layout from "../src/components/Layout/Layout";
import MovieCard from "../src/components/movie/Movie";
import Loader from "@/src/components/shared/Loader";
import PlayerPlaylist from "@/src/components/shared/PlayerPlaylist";
import { getmovies,  getTrailerListByMovieId,} from "@/src/fetchers/movieFetchers";
import { Movie, MovieTrailer } from "@/src/typesDefs/movie.type";
import { getFavouriteIds } from "@/src/utils/handleStorage";
import { useEffect, useState } from "react";


export default function Home(): JSX.Element {
  const [totalPages, setTotalpages] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesErr, setMoviesErr] = useState<string>("");
  const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false);
  
  const [selectedMovie, setSelectedMovie] = useState<Movie>({} as Movie);
  const [tarilers, setTarilers] = useState<MovieTrailer[]>([]);
  const [tarilersErr, setTarilersErr] = useState<string>("");
  const [isTarilerLoading, setIsTarilerLoading] = useState<boolean>(false);

  const [streamingKey, setStreamingKey] = useState<string>("");
  const [favouriteList, setFavouriteList] = useState<number[]>([]);
  

  const searchMovie = async (e: any) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      setIsMovieLoading(true);
      setMovies([]);
      setTarilers([]);
      const data = await getmovies(e.target.value);
      if (data.results?.length) {
        setMovies(data.results);
        setTotalpages(data.total_pages);
      } if(!data.results.length && !data.error){
        setMoviesErr("No Movies found");
      } else {
        setMoviesErr(data.message);
      }
      setIsMovieLoading(false);
    }
  };
  
  const getTrailers = async (movie: Movie): Promise<void> => {
    setIsTarilerLoading(true);
    setSelectedMovie(movie);
    setTarilers([]);
    const result = await getTrailerListByMovieId(movie.id);
    if (result.tarilers?.length) {
      setTarilers(result.tarilers);
    }else{
      setTarilersErr("No trailer found! ")
    }
    setStreamingKey(result.tarilers.length? result.tarilers[0].key : "");
    setIsTarilerLoading(false);
    window.scrollTo({top:0,behavior:"smooth"});
  };
  
  useEffect(()=>{
    const ids = getFavouriteIds();
    setFavouriteList(ids);
  },[])
  
  return (
    <Layout seo={{}}>
      <>
        <h1 className="text-2xl font-bold text-center my-4" data-testid="welcome-title">
          Welcome To Movie Zone
        </h1>
        <div className="mx-auto max-w-md">
          <input
            className="w-full border rounded-full px-4 py-2 border-gray-300 focus:border-sky-400 focus:outline-none"
            onKeyDown={searchMovie}
            type="search"
            placeholder="Search your movie"
            data-testid="search-field"
          />
        </div>
        {
          isTarilerLoading 
          ? <div className="h-40 flex items-center justify-center" data-testid="trailer-loader"><Loader /></div>
          : tarilersErr
          ? <div className="text-center my-6 font-semibold"><p className="text-pink-700 mx-auto">{tarilersErr}</p></div>
          : tarilers.length 
          ? <PlayerPlaylist tarilers={tarilers} streamingKey={streamingKey} selectedMovie={selectedMovie} setStreamingKey={setStreamingKey} />
          : <></>
        }
        
        {
          isMovieLoading 
          ? <div className="h-40 flex items-center justify-center" data-testid="movie-loader"><Loader /></div> 
          : moviesErr 
          ? <div className="text-center text-pink-700 font-semibold my-6"><p>{moviesErr}</p></div>
          : <></>
        }
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
          {movies.map((movieEl) => (
            <MovieCard
              movieEl={movieEl}
              getTrailers={getTrailers}
              favouriteList={favouriteList}
              setFavouriteList={setFavouriteList}
              key={movieEl.id}
            />
          ))}
        </section>
      </>
    </Layout>
  );
}
