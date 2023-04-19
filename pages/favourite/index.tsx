import FavouriteCard from '@/src/components/favourite/favouriteCard';
import Layout from '@/src/components/Layout/Layout';
import Loader from '@/src/components/shared/Loader';
import { getMovieListByMovieIds } from '@/src/fetchers/movieFetchers';
import { Movie, MovieDetails } from '@/src/typesDefs/movie.type';
import { getFavouriteIds } from '@/src/utils/handleStorage';
import React, { useEffect, useState } from 'react';
import MovieCard from '../../src/components/movie/Movie';

const Favourite = ():JSX.Element => {
    const [favouriteMovies,setFavouriteMovies] = useState<MovieDetails[]>([]);
    const [isFavouriteLoading,setIsFavouriteLoading] = useState<boolean>(false);
    const [favouriteErr,setfavouriteErr] = useState<string>("");
    
    const fetchFavouriteList = async (ids:number[]) => {
        setIsFavouriteLoading(true);
        setfavouriteErr("");
        const response = await getMovieListByMovieIds(ids);
        console.log(response);
        
        if (!response.error) {
            setFavouriteMovies(response.favouriteList);
        }else{
            setfavouriteErr(response.message);
        }
        setIsFavouriteLoading(false);
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
                {
                    !isFavouriteLoading && !favouriteErr  && <h2 className="text-center font-semibold my-6 text-xl">You have {favouriteMovies.length} favourite movies</h2>
                }
                
                <section className=''>
                        {
                            isFavouriteLoading 
                            ? <div data-testid="favourite-loader"><Loader /> </div>
                            : favouriteErr
                            ? <div className="text-center text-pink-700 font-semibold my-6" data-testid="favourite-error"><p>{favouriteErr}</p></div>
                            : <></>
                        }
                        {
                            !isFavouriteLoading && favouriteMovies?.map((favouriteMovie:MovieDetails,idx:number) => <FavouriteCard favouriteMovie={favouriteMovie} isOrderChange={idx%2 == 0 ? true : false} removeFavourite={removeFavourite} key={favouriteMovie.id} />)
                        }
                </section>
            </>
        </Layout>
    );
};

export default Favourite;