import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Movie } from '@/src/typesDefs/movie.type';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [movies,setMovies] = useState<Movie[]>([]);

  const searchMovie = async(e:any) =>{
    // console.log(e.target.value);
    if (e.keyCode === 13 || e.key === 'Enter') {
      // Call the API to retrieve movie data
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=54bd0769d35f446d8fa8bd72f04bb8f4&language=en-US&query=${"s"}&page=2&include_adult=false`
    );

    // Parse the response data and update state
    const data = await response.json();
    console.log(data);
    
    }
    
  }

  return (
    <main className="min-h-screen p-24">
      <h1>Home 2</h1>
      <input className='border' onKeyDown={searchMovie} type="search" />
    </main>
  )
}
