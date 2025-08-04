import { render, screen, waitFor } from '@testing-library/react';
import ListBookComponent from '../ListBookComponent';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// ✅ Mock the BookService module
vi.mock('../../services/BookService', () => ({
  listBooks: vi.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          isbn: '978-0261103344',
          price: 29.99,
        },
      ],
    })
  ),
  deleteBook: vi.fn(),
}));

describe('ListBookComponent', () => {
  it('renders book table after loading', async () => {
    render(
      <MemoryRouter>
        <ListBookComponent />
      </MemoryRouter>
    );

    // ✅ Wait for the book title to appear after data is fetched
    await waitFor(() => {
      expect(screen.getByText('The Hobbit')).toBeInTheDocument();
    });

    // ✅ Check if the heading also appears
    expect(screen.getByText(/List of Books:/i)).toBeInTheDocument();
  });
});
