import Layout from '@/src/components/Layout/Layout';
import { getMovieListByMovieIds } from '@/src/fetchers/movieFetchers';
import { Movie } from '@/src/typesDefs/movie.type';
import { getFavouriteIds } from '@/src/utils/handleStorage';
import React, { useEffect, useState } from 'react';
import MovieCard from '../src/components/movie/Movie';

const Favourite = () => {
    const [favouriteMovies,setFavouriteMovies] = useState<Movie[]>([]);
    console.log(favouriteMovies);
    
    useEffect(()=>{
        const ids = getFavouriteIds();
        const fetchFavouriteList = async () => {
            const response = await getMovieListByMovieIds(ids);
            if (!response.error) {
                setFavouriteMovies(response.favouriteList);
            }
        };
        fetchFavouriteList();
    },[])
    return (
        <Layout seo={{}}>
            <>
                <h2>Favourite List</h2>
                <section className='grid grid-cols-4'>
                        {
                            favouriteMovies.map((favouriteMovie:Movie) => <div 
                            className='h-80 bg-cover'
                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${favouriteMovie.poster_path})` }}
                                key={favouriteMovie.id}
                            >
                                <h2 className='text-sky-500 font-bold'>{favouriteMovie.title}</h2>
                            </div>)
                        }
                </section>
            </>
        </Layout>
    );
};

export default Favourite;