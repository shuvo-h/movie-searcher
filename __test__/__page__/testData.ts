import { Movie, MovieDetails, MovieTrailer } from "@/src/typesDefs/movie.type";

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


export const trailerListDemo:MovieTrailer[] = [
  {
    id: "1",
    iso_639_1: "en",
    iso_3166_1: "US",
    key: "sGbxmsDFVnE",
    name: "Avengers: Infinity War Trailer #1 (2018) | Movieclips Trailers",
    official: true,
    published_at: "2017-11-29T14:00:01.000Z",
    site: "YouTube",
    size: 1080,
    type: "Trailer"
  },
  {
    id: "2",
    iso_639_1: "en",
    iso_3166_1: "US",
    key: "Yj0l7iGKh8g",
    name: "Jurassic World: Fallen Kingdom - Official Trailer #2 [HD]",
    official: true,
    published_at: "2018-04-18T16:00:18.000Z",
    site: "YouTube",
    size: 1080,
    type: "Trailer"
  },
  {
    id: "3",
    iso_639_1: "en",
    iso_3166_1: "US",
    key: "3MMMe1drnZY",
    name: "Deadpool 2: The Final Trailer",
    official: true,
    published_at: "2018-04-19T13:45:53.000Z",
    site: "YouTube",
    size: 1080,
    type: "Trailer"
  }
]


export const demoMovieTrailers: MovieTrailer[] = [
  {
    id: "123",
    iso_639_1: "en",
    iso_3166_1: "US",
    key: "abcdefg",
    name: "Trailer 1",
    official: true,
    published_at: "2022-01-01",
    site: "YouTube",
    size: 1080,
    type: "Trailer"
  },
  {
    id: "456",
    iso_639_1: "fr",
    iso_3166_1: "CA",
    key: "hijklmn",
    name: "Bande-annonce 2",
    official: true,
    published_at: "2022-01-15",
    site: "Vimeo",
    size: 720,
    type: "Trailer"
  },
  {
    id: "789",
    iso_639_1: "es",
    iso_3166_1: "MX",
    key: "opqrst",
    name: "Avance oficial",
    official: false,
    published_at: "2022-02-01",
    site: "Dailymotion",
    size: 480,
    type: "Teaser"
  },
  {
    id: "101112",
    iso_639_1: "de",
    iso_3166_1: "DE",
    key: "uvwxyz",
    name: "Trailer 3",
    official: true,
    published_at: "2022-02-15",
    site: "YouTube",
    size: 1080,
    type: "Trailer"
  }
];

export const movieDetailsData: MovieDetails[] = [
  {
    adult: false,
    backdrop_path: "",
    belongs_to_collection: {
      id: 123,
      name: "Collection 1",
      poster_path: "",
      backdrop_path: "",
    },
    budget: 10000000,
    genres: [
      { id: 12, name: "Action" },
      { id: 16, name: "Animation" },
    ],
    homepage: "https://www.example.com",
    id: 1,
    imdb_id: "tt1234567",
    original_language: "en",
    original_title: "Movie 1",
    overview: "This is the overview of Movie 1",
    popularity: 8.5,
    poster_path: "/path/to/poster1.jpg",
    production_companies: [
      { id: 1, name: "Production Company 1",logo_path:"",origin_country:"" },
    ],
    production_countries: [
      { iso_3166_1: "US", name: "United States of America" },
      { iso_3166_1: "CA", name: "Canada" },
    ],
    release_date: "2022-05-01",
    revenue: 20000000,
    runtime: 120,
    spoken_languages: [
      { english_name: "English", iso_639_1: "en", name: "English" },
      { english_name: "French", iso_639_1: "fr", name: "Français" },
    ],
    status: "Released",
    tagline: "This is the tagline of Movie 1",
    title: "Movie 1",
    video: false,
    vote_average: 7.5,
    vote_count: 1000,
  },
  {
    adult: true,
    backdrop_path: "",
    belongs_to_collection: { 
      id: 12,
      name: "",
      poster_path: "",
      backdrop_path: ""
    },
    budget: 5000000,
    genres: [
      { id: 18, name: "Drama" },
      { id: 27, name: "Horror" },
    ],
    homepage: "",
    id: 2,
    imdb_id: "tt7654321",
    original_language: "en",
    original_title: "Movie 2",
    overview: "This is the overview of Movie 2",
    popularity: 7.2,
    poster_path: "/path/to/poster2.jpg",
    production_companies: [],
    production_countries: [],
    release_date: "2023-10-15",
    revenue: 10000000,
    runtime: 90,
    spoken_languages: [
      { english_name: "English", iso_639_1: "en", name: "English" },
    ],
    status: "Post Production",
    tagline: "",
    title: "Movie 2",
    video: false,
    vote_average: 6.8,
    vote_count: 500,
  },
];
