package com.hitesh.expensemanager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hitesh.expensemanager.model.Expense;
import com.hitesh.expensemanager.service.ExpenseService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/expenses")
public class ExpenseController {

    private ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense e) {
        return service.addExpense(e);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return service.getAllExpenses();
    }
    @DeleteMapping("/{id}")
public void deleteExpense(@PathVariable String id) {
    service.deleteExpense(id);
    }
    @PutMapping("/{id}")
public Expense updateExpense(@PathVariable String id, @RequestBody Expense e) {
    return service.updateExpense(id, e);
    }
    @GetMapping("/category/{category}")
public List<Expense> getByCategory(@PathVariable String category) {
    return service.getByCategory(category);
    }
    @GetMapping("/date")
public List<Expense> getByDateRange(@RequestParam String start,
                                    @RequestParam String end) {
    return service.getByDateRange(start, end);
    }
    @GetMapping("/total")
public double getMonthlyTotal(@RequestParam String month,
                             @RequestParam String year) {
    return service.getMonthlyTotal(month, year);
    }
    @GetMapping("/category-total")
public Map<String, Double> getCategoryTotals() {
    return service.getCategoryTotals();
    }
}