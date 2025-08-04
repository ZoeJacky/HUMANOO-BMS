package com.humanoo.bms_backend.service.impl;

import com.humanoo.bms_backend.dto.BookDto;
import com.humanoo.bms_backend.entity.Book;
import com.humanoo.bms_backend.exception.ResourceNotFoundException;
import com.humanoo.bms_backend.mapper.BookMapper;
import com.humanoo.bms_backend.repository.BookRepository;
import com.humanoo.bms_backend.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    private BookRepository bookRepository;

    @Override
    public BookDto createBook(BookDto bookDto) {
        Book book = BookMapper.mapToBook(bookDto);
        Book savedBook = bookRepository.save(book);
        return BookMapper.mapToBookDto(savedBook);
    }

    @Override
    public BookDto getBookById(Long bookId) {
        Book book = bookRepository.findById(bookId).
                orElseThrow(()->new ResourceNotFoundException("Book not found with given bookId:"+bookId));
        return BookMapper.mapToBookDto(book);
    }

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream().map(BookMapper::mapToBookDto).
                collect(Collectors.toList());
    }

    @Override
    public BookDto updateBook(Long bookId, BookDto updatedBookDto) {
        Book book=bookRepository.findById(bookId).
                orElseThrow(()->new ResourceNotFoundException("Book not found with given bookId:"+bookId));
        book.setTitle(updatedBookDto.getTitle());
        book.setAuthor(updatedBookDto.getAuthor());
        book.setIsbn(updatedBookDto.getIsbn());
        book.setPrice(updatedBookDto.getPrice());
        Book savedBook = bookRepository.save(book);
        return BookMapper.mapToBookDto(savedBook);
    }

    @Override
    public void deleteBook(Long bookId) {
        Book book = bookRepository.findById(bookId).
                orElseThrow(()->new ResourceNotFoundException("Book not found with given bookId:"+bookId));
        bookRepository.delete(book);

    }
}
