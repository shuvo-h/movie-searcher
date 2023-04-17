import { Movie, MovieDetails, MovieTrailer } from '@/src/typesDefs/movie.type';
import React, { Dispatch, SetStateAction } from 'react';
import ReactPlayer from 'react-player/youtube'
import TrailerCard from '../movie/TrailerCard';

interface PlayerPlaylistProp{
    streamingKey: string,
    tarilers: MovieTrailer[],
    selectedMovie:Movie | MovieDetails,
    setStreamingKey: Dispatch<SetStateAction<string>>
}

const PlayerPlaylist = ({streamingKey,tarilers,selectedMovie,setStreamingKey}:PlayerPlaylistProp) => {
    return (
        <section>
            <div className={`sm:grid grid-cols-3 gap-8 my-4 h-96`}>
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
                <h3 className='font-semibold my-2'>Playlist</h3>
                {tarilers.map((trailer:MovieTrailer) => (
                  <TrailerCard trailer={trailer} streamingKey={streamingKey} setStreamingKey={setStreamingKey} key={trailer.id} />
                ))}
              </div>
            </div>
            <h4 className='font-bold text-xl'>Title: {selectedMovie.title}</h4>
            <p><b>Original Title:</b> {selectedMovie.original_title}</p>
            <p><b>Original Language:</b> {selectedMovie.original_language}</p>
            <p><b>Release Date:</b> {selectedMovie.release_date?.toString()}</p>
            <p><b>Overview:</b> {selectedMovie.overview}</p>
        </section>
    );
};

export default PlayerPlaylist;