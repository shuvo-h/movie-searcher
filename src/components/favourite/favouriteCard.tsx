import { Movie, MovieDetails, productionCompanies } from '@/src/typesDefs/movie.type';
import { updateFavourite } from '@/src/utils/handleStorage';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import FavouriteIcon from '../shared/FavouriteIcon';
import StarIcon from '../shared/StarIcon';

interface FavouriteCardProp {
    favouriteMovie: MovieDetails
    isOrderChange: boolean
    removeFavourite: (list:number[])=>void
}
const FavouriteCard = ({favouriteMovie,isOrderChange,removeFavourite}:FavouriteCardProp):JSX.Element => {
    console.log(favouriteMovie,isOrderChange);
    const[isHover,setIsHover] = useState<boolean>(false)
    const formatGenres = (generes:{id:number,name:string}[]) => generes.map(({name})=>name).join(", ");

   

    return (
        <div 
            className={`my-6 p-6 md:grid grid-cols-2 gap-4 bg-gray-100 rounded-lg`}
            key={favouriteMovie.id}
        >
            <div className={`p-2 ${isOrderChange ? 'md:order-1':"md:order-0"}`}>
                <div style={{width: '100%', height: '100%', position: 'relative'}}>
                    <Image
                        className='mx-auto'
                        src={`https://image.tmdb.org/t/p/w500/${favouriteMovie.poster_path}` }
                        // layout='fill'
                        // objectFit='contain'
                        width={400}
                        height={100}
                        alt={favouriteMovie.title}
                    />
                </div>
            </div>
            <div className='flex items-center p-2'>
                <div className='relative'>
                    <div className='absolute right-0'>
                        <FavouriteIcon 
                            updateFavourite={updateFavourite}
                            onMouseEnter={()=>setIsHover(true)}
                            onMouseLeave={()=>setIsHover(false)}
                            isHover={isHover}
                            isFavourite={true}
                            updateCallBackFn={removeFavourite}
                            movie_id={favouriteMovie.id}
                            size={isHover? 44: 40}
                        />
                    </div>
                    <h2 className='text-sky-500 font-bold'>{favouriteMovie.title}</h2>
                    <p><i>Original Title: {favouriteMovie.original_title}</i></p>
                    <p><b>Budget:</b> {favouriteMovie.budget}</p>
                    <p><b>Genres:</b> {formatGenres(favouriteMovie.genres)}</p>
                    <p><b>Original Language:</b> {favouriteMovie.original_language}</p>
                    <p><b>Popularity:</b> {favouriteMovie.popularity}</p>
                    <p><b>Release Date:</b> {favouriteMovie.release_date}</p>
                    <p><b>Run Time:</b> {favouriteMovie.runtime}</p>
                    <p><b>Revenue:</b> {favouriteMovie.revenue}</p>
                    <p>Status: <span className='ring-2 rounded px-2 '>{favouriteMovie.status}</span></p>
                    <div>
                        <Link href={`/favourite/watch?movie_id=${favouriteMovie.id}`}>
                            <button className='ring-2 px-4 py-2 mx-auto block my-4 rounded hover:bg-cyan-900 hover:text-cyan-300'>Watch Now</button>
                        </Link>
                        <div>
                            
                        </div>
                    </div>
                    <div className="flex items-center">
                        {
                            Array.from(Array(Math.floor(10)).keys()).map((num:number) => <StarIcon isFill={(num+1) <= Math.floor(favouriteMovie.vote_average)? true : false} key={num} />)
                        }
                        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{favouriteMovie.vote_average} out of 10 ({favouriteMovie.vote_count} votes)</p>
                    </div>

                    <p><b>Overview:</b> {favouriteMovie.overview}</p>
                    <h2 className='font-semibold text-lg mt-4'>Production Companies</h2>
                    <div>
                        {
                            favouriteMovie.production_companies.map(({name,logo_path,origin_country,id}) =>{
                                return <div className='flex gap-4 my-2 border p-2 shadow-md' key={id}>
                                    <Image
                                        alt={favouriteMovie.title}
                                        src={`https://image.tmdb.org/t/p/w500/${logo_path}` }
                                        width={100}
                                        height={100}
                                    />
                                    <div>
                                        <h4>Name: {name}</h4>
                                        <h4>Country Name: {origin_country}</h4>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavouriteCard;