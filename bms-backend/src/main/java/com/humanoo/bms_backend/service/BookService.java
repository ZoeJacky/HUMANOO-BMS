package com.humanoo.bms_backend.service;

import com.humanoo.bms_backend.dto.BookDto;

import java.util.List;

public interface BookService {
    BookDto createBook(BookDto bookDto);

    BookDto getBookById(Long bookId);

    List<BookDto> getAllBooks();

    BookDto updateBook(Long bookId, BookDto updatedBookDto);

    void deleteBook(Long bookId);
}
