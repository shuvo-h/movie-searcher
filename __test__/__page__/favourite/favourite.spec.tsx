import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Favourite from '@/pages/favourite';
import { getMovieListByMovieIds } from '../../../src/fetchers/movieFetchers';
import { getFavouriteIds } from '../../../src/utils/handleStorage';
import { MovieDetails } from '../../../src/typesDefs/movie.type';
import { useRouter } from 'next/router';

jest.mock('../../../src/fetchers/movieFetchers', () => ({
  getMovieListByMovieIds: jest.fn(),
}));

jest.mock('../../../src/utils/handleStorage', () => ({
  getFavouriteIds: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/favourite',
  })),
}));

describe('Favourite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(()=>{
    jest.clearAllMocks();
  })

  it('should render the loader while fetching data', async () => {
    // Arrange
    const favouriteIds = [1, 2, 3];
    (getFavouriteIds as jest.Mock).mockReturnValue(favouriteIds);
    (getMovieListByMovieIds as jest.Mock).mockResolvedValue({
      error: false,
      message: '',
      favouriteList: [],
    });

    // Act
    render(<Favourite />);
    const loader = screen.getByTestId('favourite-loader');

    // Assert
    expect(loader).toBeInTheDocument();

    // Wait for the loading to finish
    await waitFor(() => {
      expect(getFavouriteIds).toHaveBeenCalledTimes(1);
      expect(getMovieListByMovieIds).toHaveBeenCalledTimes(1);
      expect(getMovieListByMovieIds).toHaveBeenCalledWith(favouriteIds);
    });
  });

  it('should render error message if fetching data fails', async () => {
    // Arrange
    const errorMessage = 'Failed to fetch data';
    (getFavouriteIds as jest.Mock).mockReturnValue([1, 2, 3]);
    (getMovieListByMovieIds as jest.Mock).mockResolvedValue({
      error: true,
      message: errorMessage,
      favouriteList: [],
    });

    // Act
    render(<Favourite />);
    const error = await screen.findByTestId('favourite-error');

    // Assert
    expect(error).toBeInTheDocument();
    expect(error.textContent).toContain(errorMessage);
  });

  it('should render the list of favourite movies', async () => {
    // Arrange
    const favouriteMovies: MovieDetails[] = [
      { id: 1, title: 'Movie 1', poster_path: '', release_date: '', vote_average: 5 },
      { id: 2, title: 'Movie 2', poster_path: '', release_date: '', vote_average: 7 },
    ];
    (getFavouriteIds as jest.Mock).mockReturnValue([1, 2]);
    (getMovieListByMovieIds as jest.Mock).mockResolvedValue({
      error: false,
      message: '',
      favouriteList: favouriteMovies,
    });

    // Act
    render(<Favourite />);
    const movieList = await screen.findAllByTestId('favourite-movie');

    // Assert
    expect(movieList).toHaveLength(2);
  });
});
