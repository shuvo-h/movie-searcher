import Layout from '@/src/components/Layout/Layout';
import Loader from '@/src/components/shared/Loader';
import PlayerPlaylist from '@/src/components/shared/PlayerPlaylist';
import { getSingleMovieById, getTrailerListByMovieId } from '@/src/fetchers/movieFetchers';
import { Movie, MovieDetails, MovieTrailer } from '@/src/typesDefs/movie.type';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// streamingKey,tarilers,selectedMovie,setStreamingKey

const Watch = () => {
    const router = useRouter();
    const {movie_id} = router.query;
    const [trailers,setTrailers] = useState<MovieTrailer[]>([]);
    const [streamKey,setStreamKey] = useState<string>("");
    const [watchMovie,setWatchMovie] = useState<MovieDetails>({} as MovieDetails);
    const [isStreamLoading,setIsStreamLoading] = useState<boolean>(false);



    useEffect(()=>{
        const fetchMovieAndTailers = async(id:number) => {
            setIsStreamLoading(true);
            const res = await getSingleMovieById(id);
            if (!res.error) {
                setWatchMovie(res.movie);
            }
            
            const tailersRes = await getTrailerListByMovieId(id);
            if (!tailersRes.error) {
                setTrailers(tailersRes.tarilers);
                setStreamKey(tailersRes.tarilers[0]?.key);
            }
            setIsStreamLoading(false);
        }

        if (movie_id && typeof movie_id === "string") {
            fetchMovieAndTailers(parseInt(movie_id))
        }
    },[movie_id])
    
    return (
        <Layout seo={{}}>
            <>
                <h2 className='font-bold text-2xl'>{watchMovie.title}</h2>
                {
                    isStreamLoading 
                    ? <div><Loader/></div>
                    : !trailers.length 
                    ? <div className='text-center my-12 text-lg text-pink-700'><p>No trailer found</p></div>
                    :<PlayerPlaylist selectedMovie={watchMovie} setStreamingKey={setStreamKey} streamingKey={streamKey} tarilers={trailers} />
                }
            </>
        </Layout>
    );
};

export default Watch;