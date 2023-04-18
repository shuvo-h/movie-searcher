import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavouriteCard from '../../src/components/favourite/favouriteCard';
import {MovieDetails} from "../../src/typesDefs/movie.type"

const mockFavouriteMovie = {
  id: 123,
  title: 'Mock Movie',
  original_title: 'Mock Original Movie',
  poster_path: '/mock-poster-path.jpg',
  budget: 1000000,
  genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }],
  original_language: 'en',
  popularity: 7.5,
  release_date: '2022-01-01',
  runtime: 120,
  revenue: 5000000,
  status: 'Released',
  vote_average: 8,
  vote_count: 100,
  overview: 'Mock movie overview',
  production_companies: [
    {
      id: 1,
      name: 'Mock Production Company',
      logo_path: '/mock-logo-path.jpg',
      origin_country: 'US',
    },
  ],
};

describe('FavouriteCard', () => {
  it('renders the movie details', () => {
    render(<FavouriteCard favouriteMovie={mockFavouriteMovie as MovieDetails} isOrderChange={false} removeFavourite={() => {}} />);

    expect(screen.getByText(mockFavouriteMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockFavouriteMovie.budget.toString())).toBeInTheDocument();
    expect(screen.getByText(mockFavouriteMovie.original_language)).toBeInTheDocument();
    expect(screen.getByText(mockFavouriteMovie.popularity.toString())).toBeInTheDocument();
    expect(screen.getByText(mockFavouriteMovie.release_date)).toBeInTheDocument();
    expect(screen.getByText(mockFavouriteMovie.runtime.toString())).toBeInTheDocument();
    expect(screen.getByText(mockFavouriteMovie.revenue.toString())).toBeInTheDocument();
    expect(screen.getByText(mockFavouriteMovie.status)).toBeInTheDocument();
    expect(screen.getByText(mockFavouriteMovie.overview)).toBeInTheDocument();
    expect(screen.getByText('Production Companies')).toBeInTheDocument();
  });

  it('calls the removeFavourite function when the remove favourite button is clicked', () => {
    const mockRemoveFavourite = jest.fn();

   const{debug} = render(<FavouriteCard favouriteMovie={mockFavouriteMovie} isOrderChange={false} removeFavourite={mockRemoveFavourite} />);

    const favouriteEl = screen.getByTestId("favourite-icon-123");
    expect(favouriteEl).toBeInTheDocument();
    fireEvent.click(favouriteEl);
    expect(mockRemoveFavourite).toHaveBeenCalledWith([mockFavouriteMovie.id]);

  });
});
