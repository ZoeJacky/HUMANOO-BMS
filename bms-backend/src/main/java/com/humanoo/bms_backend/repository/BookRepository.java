package com.humanoo.bms_backend.repository;

import com.humanoo.bms_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
