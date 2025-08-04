import axios from 'axios';
import {
  listBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook
} from '../BookService';
import { describe, it, expect, vi } from 'vitest';

vi.mock('axios');

describe('BookService API calls', () => {
  it('listBooks should call GET /api/books', async () => {
    const mockData = [{ id: 1, title: 'Test Book' }];
    axios.get.mockResolvedValue({ data: mockData });

    const response = await listBooks();
    expect(response.data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/api/books');
  });

  it('createBook should call POST /api/books with data', async () => {
    const newBook = { title: 'New Book' };
    axios.post.mockResolvedValue({ data: newBook });

    const response = await createBook(newBook);
    expect(response.data).toEqual(newBook);
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/books', newBook);
  });

  it('getBook should call GET /api/books/:id', async () => {
    const bookId = 42;
    const mockBook = { id: 42, title: 'Found Book' };
    axios.get.mockResolvedValue({ data: mockBook });

    const response = await getBook(bookId);
    expect(response.data).toEqual(mockBook);
    expect(axios.get).toHaveBeenCalledWith(`http://localhost:8080/api/books/${bookId}`);
  });

  it('updateBook should call PUT /api/books/:id with data', async () => {
    const bookId = 10;
    const update = { title: 'Updated Title' };
    axios.put.mockResolvedValue({ data: update });

    const response = await updateBook(bookId, update);
    expect(response.data).toEqual(update);
    expect(axios.put).toHaveBeenCalledWith(`http://localhost:8080/api/books/${bookId}`, update);
  });

  it('deleteBook should call DELETE /api/books/:id', async () => {
    const bookId = 7;
    axios.delete.mockResolvedValue({ status: 200 });

    const response = await deleteBook(bookId);
    expect(response.status).toBe(200);
    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:8080/api/books/${bookId}`);
  });
});
