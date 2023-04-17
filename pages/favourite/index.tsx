import FavouriteCard from '@/src/components/favourite/favouriteCard';
import Layout from '@/src/components/Layout/Layout';
import { getMovieListByMovieIds } from '@/src/fetchers/movieFetchers';
import { Movie, MovieDetails } from '@/src/typesDefs/movie.type';
import { getFavouriteIds } from '@/src/utils/handleStorage';
import React, { useEffect, useState } from 'react';
import MovieCard from '../../src/components/movie/Movie';

const Favourite = ():JSX.Element => {
    const [favouriteMovies,setFavouriteMovies] = useState<MovieDetails[]>([]);
    console.log(favouriteMovies);
    
    const fetchFavouriteList = async (ids:number[]) => {
        const response = await getMovieListByMovieIds(ids);
        if (!response.error) {
            setFavouriteMovies(response.favouriteList);
        }
    };
    useEffect(()=>{
        const ids = getFavouriteIds();
        fetchFavouriteList(ids);
    },[])

    const removeFavourite = (newList:number[]) =>{
        const filteredNewList =  favouriteMovies.filter((favMovie:MovieDetails) => newList.includes(favMovie.id));
        setFavouriteMovies(filteredNewList);
    }

    return (
        <Layout seo={{}}>
            <>
                <h2>You have {favouriteMovies.length} favourite movies</h2>
                <section className=''>
                        {
                            favouriteMovies.map((favouriteMovie:MovieDetails,idx:number) => <FavouriteCard favouriteMovie={favouriteMovie} isOrderChange={idx%2 == 0 ? true : false} removeFavourite={removeFavourite} key={favouriteMovie.id} />)
                        }
                </section>
            </>
        </Layout>
    );
};

export default Favourite;