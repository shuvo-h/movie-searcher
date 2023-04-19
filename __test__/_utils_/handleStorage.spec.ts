import { updateFavourite, getFavouriteIds } from '../../src/utils/handleStorage';

describe('updateFavourite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add the movie ID to favourites', () => {
    const id = 123;
    const mockCb = jest.fn((list)=>{
        expect(list).toContain(123)
    });

    updateFavourite(id, mockCb);

    expect(localStorage.getItem('favourite_movies')).toEqual('[123]');
    expect(mockCb).toHaveBeenCalledWith([123]);
  });

  it('should remove the movie ID from favourites', () => {
    localStorage.setItem('favourite_movies', '[123, 456]');
    const id = 123;
    const cb = jest.fn((list)=>{
        expect(list).toEqual([456])
    });

    updateFavourite(id, cb);

    expect(localStorage.getItem('favourite_movies')).toEqual('[456]');
    expect(cb).toHaveBeenCalledWith([456]);
  });

  it('should call the callback with an empty array if storage is empty', () => {
    const id = 123;
    const cb = jest.fn();

    updateFavourite(id, cb); // add id
    expect(cb).toHaveBeenCalledWith([123]);
    updateFavourite(id, cb);  // remove id
    expect(cb).toHaveBeenCalledWith([]);
  });

  it("It should return empty array when storage is clear",()=>{
    const ids = getFavouriteIds();
    expect(ids).toEqual([])
  })

  it("It should return expected array when storage has the ids",()=>{
    localStorage.setItem('favourite_movies',JSON.stringify([111,222,333]))
    const ids = getFavouriteIds();
    expect(ids).toHaveLength(3)
    expect(ids).toEqual([111,222,333])
    expect(ids).toContain(333);
  })
  
});
