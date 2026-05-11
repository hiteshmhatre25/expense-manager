package com.hitesh.expensemanager.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hitesh.expensemanager.model.Expense;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
    List<Expense> findByCategory(String category);
    List<Expense> findByDateBetween(String start, String end);
}