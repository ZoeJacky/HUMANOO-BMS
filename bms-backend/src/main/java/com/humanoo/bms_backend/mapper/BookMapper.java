package com.humanoo.bms_backend.mapper;

import com.humanoo.bms_backend.dto.BookDto;
import com.humanoo.bms_backend.entity.Book;

public class BookMapper {

    public static BookDto mapToBookDto(Book book){
        return new BookDto(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getIsbn(),
                book.getPrice()
        );
    }

    public static Book mapToBook(BookDto bookDto){
        return new Book(
                bookDto.getId(),
                bookDto.getTitle(),
                bookDto.getAuthor(),
                bookDto.getIsbn(),
                bookDto.getPrice()
        );
    }
}
