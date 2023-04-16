import Layout from "@/src/components/Layout/Layout";
import MovieCard from "@/src/components/movie/Movie";
import TrailerCard from "@/src/components/movie/TrailerCard";
import {
  getmovies,
  getTrailerListByMovieId,
} from "@/src/fetchers/movieFetchers";
import { Movie, MovieTrailer } from "@/src/typesDefs/movie.type";
import { getFavouriteIds } from "@/src/utils/handleStorage";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player/youtube'

export default function Home(): JSX.Element {
  const [totalPages, setTotalpages] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesErr, setMoviesErr] = useState<string>("");
  
  const [selectedMovie, setSelectedMovie] = useState<Movie>({} as Movie);
  const [tarilers, setTarilers] = useState<MovieTrailer[]>([]);
  const [tarilersErr, setTarilersErr] = useState<string>("");

  const [streamingKey, setStreamingKey] = useState<string>("");
  const [favouriteList, setFavouriteList] = useState<number[]>([]);
console.log(favouriteList,"favouriteList");

  const searchMovie = async (e: any) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      const data = await getmovies(e.target.value);
      if (!data?.error) {
        setMovies(data.results);
        setTotalpages(data.total_pages);
      } else {
        setMoviesErr(data.message);
      }
    }
  };

  const getTrailers = async (movie: Movie): Promise<void> => {
    setSelectedMovie(movie);
    const result = await getTrailerListByMovieId(movie.id);
    setTarilers(result.tarilers);
    setStreamingKey(result.tarilers.length? result.tarilers[0].key : "");
    // set details of the movie
  };
  console.log(movies);

  useEffect(()=>{
    const ids = getFavouriteIds();
    setFavouriteList(ids);
  },[])
  
  return (
    <Layout seo={{}}>
      <>
        <h1 className="text-2xl font-bold text-center my-4">
          Welcome To Movie Zone
        </h1>
        <h1>Make pagination and filters</h1>
        <div className="mx-auto max-w-md">
          <input
            className="w-full border rounded-full px-4 py-2 border-gray-300 focus:border-sky-400 focus:outline-none"
            onKeyDown={searchMovie}
            type="search"
            placeholder="Search your movie"
          />
        </div>

        {
          !!tarilers.length && <section>
            <div className={`grid grid-cols-3 gap-8 my-4 h-96`}>
              <div className="col-span-2">
                {
                  streamingKey && <ReactPlayer 
                    url={`https://www.youtube.com/watch?v=${streamingKey}`} 
                    playing={true}
                    controls={true}
                    volume={1}
                    muted={false}
                    playbackRate={1}
                    width={'100%'}
                    height={'100%'}
                    style={{margin:"auto"}}
                  />
                }
                
              </div>
              <div className="max-h-96 overflow-y-scroll scrollbar-cstm">
                {tarilers.map((trailer) => (
                  <TrailerCard trailer={trailer} streamingKey={streamingKey} setStreamingKey={setStreamingKey} key={trailer.id} />
                ))}
              </div>
            </div>
            <p>Title: {selectedMovie.title}</p>
            <p>Original Title: {selectedMovie.original_title}</p>
            <p>Original Language: {selectedMovie.original_language}</p>
            <p>Release Date: {selectedMovie.release_date.toString()}</p>
            <p>Overview: {selectedMovie.overview}</p>
          </section>
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
