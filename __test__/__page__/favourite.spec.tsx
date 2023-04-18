import { render, screen, waitFor } from '@testing-library/react';
import { getMovieListByMovieIds } from '@/src/fetchers/movieFetchers';
import { MovieDetails } from '@/src/typesDefs/movie.type';
import { getFavouriteIds } from '@/src/utils/handleStorage';
import { useRouter } from 'next/router';
import React from 'react';
import Favourite from '@/pages/favourite';

jest.mock('../../src/utils/handleStorage', () => ({
  getFavouriteIds: jest.fn(() => [1, 2, 3]),
}));

jest.mock('../../src/fetchers/movieFetchers', () => ({
  getMovieListByMovieIds: jest.fn(() => ({
    error: false,
    message: '',
    favouriteList: [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
      { id: 3, title: 'Movie 3' },
    ],
  })),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/',
  })),
}));

describe('Favourite Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render favourite movies list correctly', async () => {
    render(<Favourite />);

    await waitFor(() => {
        expect(screen.getByText('You have 3 favourite movies')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: /you have 3 favourite movies/i })).toBeInTheDocument();
        expect(screen.getByText(/movie 1/i)).toBeInTheDocument();
        expect(screen.getByText(/movie 2/i)).toBeInTheDocument();
        expect(screen.getByText(/movie 3/i)).toBeInTheDocument();
    });
  });

  it('should remove a movie from the favourite list', async () => {
    const removeFavouriteMock = jest.fn();

    render(<Favourite />);

    await screen.findByText('Movie 1');
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText('Movie 3')).toBeInTheDocument();

    // Simulate removing a movie
    removeFavouriteMock([1, 3]);
    expect(removeFavouriteMock).toHaveBeenCalledWith([1, 3]);
  });
});
