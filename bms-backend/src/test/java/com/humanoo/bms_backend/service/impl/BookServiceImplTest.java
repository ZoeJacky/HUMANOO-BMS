package com.humanoo.bms_backend.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.json.JSONException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.humanoo.bms_backend.dto.BookDto;
import com.humanoo.bms_backend.entity.Book;
import com.humanoo.bms_backend.mapper.BookMapper;
import com.humanoo.bms_backend.repository.BookRepository;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;
import static org.junit.Assert.assertEquals;

@ExtendWith(MockitoExtension.class)
class BookServiceImplTest {
    @InjectMocks
    private BookServiceImpl bookService;

    @Mock
    private BookRepository bookRepository;

    private ObjectMapper objectMapper = new ObjectMapper();
    private Book testBook;
    private BookDto testBookDto;

    @BeforeEach
    void setUp() throws IOException {
        testBook = objectMapper.readValue(
                new ClassPathResource("book.json").getFile(), Book.class);
        testBookDto = BookMapper.mapToBookDto(testBook);
    }

    @Test
    void createBook() throws JSONException {
        // Arrange
        when(bookRepository.save(any(Book.class))).thenReturn(testBook);

        // Act
        BookDto result = bookService.createBook(testBookDto);

        // Assert
        assertEquals(testBookDto.getTitle(), result.getTitle(), true);
    }

    @Test
    void getBookById() throws JSONException {
        // Arrange
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));

        // Act
        BookDto result = bookService.getBookById(1L);

        // Assert
        assertEquals(testBookDto.getTitle(), result.getTitle(), true);
    }

    @Test
    void getAllBooks() throws JSONException {
        // Arrange
        when(bookRepository.findAll()).thenReturn(List.of(testBook));

        // Act
        List<BookDto> result = bookService.getAllBooks();

        // Assert
        assertEquals(1, result.size());
        assertEquals(testBook.getTitle(), result.get(0).getTitle(), true);
    }

    @Test
    void updateBook() {
        // Arrange
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));
        when(bookRepository.save(any(Book.class))).thenReturn(testBook);

        // Act
        BookDto updated = new BookDto(testBook.getId(), "Updated Title", "Author", "123", new BigDecimal("10.0"));
        BookDto result = bookService.updateBook(1L, updated);

        // Assert
        assertEquals("Updated Title", result.getTitle());
    }

    @Test
    void deleteBook() {
        // Arrange
        when(bookRepository.findById(1L)).thenReturn(Optional.of(testBook));

        // Act
        bookService.deleteBook(1L);

        // Assert
        verify(bookRepository).delete(testBook);
    }
}