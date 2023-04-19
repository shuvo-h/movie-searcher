import { MovieTrailer } from '@/src/typesDefs/movie.type';
import React, { Dispatch, SetStateAction } from 'react';

interface  trailerCard{
    trailer: MovieTrailer,
    streamingKey: string
    setStreamingKey: Dispatch<SetStateAction<string>>
}
const TrailerCard = ({trailer,streamingKey,setStreamingKey}:trailerCard) => {
   
    return (
        <div className={`bg-indigo-300 bg-opacity-60 hover:bg-opacity-70 transition-all duration-100 my-1 py-1 px-2 cursor-pointer ${trailer.key ===streamingKey ? "bg-sky-700 text-cyan-300":""}`} onClick={()=>setStreamingKey(trailer.key)} data-testid={"trailer-card"}>
            <h2>{trailer.name}</h2>
        </div>
    );
};

export default TrailerCard;