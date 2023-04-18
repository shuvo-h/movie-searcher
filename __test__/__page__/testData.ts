import { Movie } from "@/src/typesDefs/movie.type";

export const moviesDemo: Movie[] = [
    {
      adult: false,
      backdrop_path: "/my-backdrop-path-1.jpg",
      genre_ids: [28, 12, 14],
      id: 123,
      original_language: "en",
      original_title: "My Original Title 1",
      overview: "My movie overview 1",
      popularity: 123.45,
      poster_path: "/my-poster-path-1.jpg",
      release_date: new Date("2022-01-01"),
      title: "My Title 1",
      video: false,
      vote_average: 6.7,
      vote_count: 100
    },
    {
      adult: false,
      backdrop_path: "/my-backdrop-path-2.jpg",
      genre_ids: [35, 18],
      id: 456,
      original_language: "en",
      original_title: "My Original Title 2",
      overview: "My movie overview 2",
      popularity: 67.89,
      poster_path: "/my-poster-path-2.jpg",
      release_date: new Date("2022-05-15"),
      title: "My Title 2",
      video: false,
      vote_average: 8.1,
      vote_count: 200
    },
    {
      adult: true,
      backdrop_path: "/my-backdrop-path-3.jpg",
      genre_ids: [27, 53],
      id: 789,
      original_language: "en",
      original_title: "My Original Title 3",
      overview: "My movie overview 3",
      popularity: 23.45,
      poster_path: "/my-poster-path-3.jpg",
      release_date: new Date("2022-11-30"),
      title: "My Title 3",
      video: false,
      vote_average: 5.6,
      vote_count: 50
    }
];
  