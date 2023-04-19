import { Movie } from '@/src/typesDefs/movie.type';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { IconContext } from "react-icons";
import { updateFavourite } from '@/src/utils/handleStorage';
import FavouriteIcon from '../shared/FavouriteIcon';

interface MovieCard{
    movieEl: Movie
    getTrailers: (movie:Movie)=> void
    favouriteList: number[]
    setFavouriteList: Dispatch<SetStateAction<number[]>>
}

const MovieCard = ({movieEl,getTrailers,favouriteList,setFavouriteList}:MovieCard):JSX.Element => {
    const [isFavourite,setIsFavourite] = useState<Boolean>(false);
    const [isHover,setIsHover] = useState<Boolean>(false);

    useEffect(()=>{
        const isFavouriteMovie = favouriteList.includes(movieEl.id)
        setIsFavourite(isFavouriteMovie?true:false);
    },[movieEl.id])
    
    const handleFavourite = (newList:number[]) => {
        setFavouriteList(newList);
        const isFavouriteMovie = newList.includes(movieEl.id)
        setIsFavourite(isFavouriteMovie?true:false);
    };

    return (
        <div className="relative flex flex-col justify-end border rounded-lg p-3 h-80 bg-cover" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieEl.poster_path})` }} data-testid="movie-card">
            <div className="absolute inset-0 flex items-center justify-center watch-btn-wrapper">
                <div className="border overflow-hidden rounded text-cyan-300 watch-btn justify-center bg-gray-800 bg-opacity-70 border border-indigo-300">
                    <button className='bg-cyan-900 hover:bg-cyan-700 px-4 py-1 rounded text-cyan-300' onClick={()=>getTrailers(movieEl)} data-testid={`watch-${movieEl.id}`}>Watch</button>
                    
                    <FavouriteIcon 
                        updateFavourite={updateFavourite}
                        onMouseEnter={()=>setIsHover(true)}
                        onMouseLeave={()=>setIsHover(false)}
                        isHover={isHover}
                        isFavourite={isFavourite}
                        updateCallBackFn={handleFavourite}
                        movie_id={movieEl.id}
                        size={40}
                    />
                </div>
            </div>
            <div className="bg-cyan-900 bg-opacity-90 text-cyan-300 p-2 rounded-lg mt-auto">
                <h3 className="text-md font-semibold">{movieEl.title}</h3>
                <p>Popularity: {movieEl.popularity}</p>
                <p>
                Release At:
                <time className="ms-1" dateTime={movieEl.release_date.toString()}>
                    {movieEl.release_date.toString()}
                </time>
                </p>
                <p>Rating: {movieEl.vote_average}({movieEl.vote_count} reviews)</p>
            </div>
        </div>
    );
};

export default React.memo(MovieCard);