package com.humanoo.bms_backend.controller;

import com.humanoo.bms_backend.dto.BookDto;
import com.humanoo.bms_backend.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {
    private BookService bookService;

    @PostMapping
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto bookDto){
        BookDto savedBook = bookService.createBook(bookDto);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable("id") Long bookId){
        BookDto bookDto = bookService.getBookById(bookId);
        return ResponseEntity.ok(bookDto);
    }

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() throws InterruptedException {
//        Thread.sleep(2000); //mimic network latency
        List<BookDto> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PutMapping("{id}")
    public ResponseEntity<BookDto> updateBook(@PathVariable("id") Long bookId,
                                                      @RequestBody BookDto updatedBookDto){
        BookDto bookDto = bookService.updateBook(bookId, updatedBookDto);
        return ResponseEntity.ok(bookDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") Long bookId){
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("Book:"+bookId+" deleted successfully!");
    }

}
