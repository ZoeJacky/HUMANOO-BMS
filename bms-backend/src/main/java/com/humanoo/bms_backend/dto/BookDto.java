package com.humanoo.bms_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private BigDecimal price;
}
