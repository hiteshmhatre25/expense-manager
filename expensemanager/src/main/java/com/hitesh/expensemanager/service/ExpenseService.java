package com.hitesh.expensemanager.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.hitesh.expensemanager.model.Expense;
import com.hitesh.expensemanager.repository.ExpenseRepository;

@Service
public class ExpenseService {

    private ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo) {
        this.repo = repo;
    }

    public Expense addExpense(Expense e) {
        return repo.save(e);
    }

    public List<Expense> getAllExpenses() {
        return repo.findAll();
    }
    public void deleteExpense(String id) {
    repo.deleteById(id);
    }
    public Expense updateExpense(String id, Expense newExpense) {
    Expense existing = repo.findById(id).orElse(null);

    if (existing != null) {
        existing.setAmount(newExpense.getAmount());
        existing.setCategory(newExpense.getCategory());
        existing.setDescription(newExpense.getDescription());
        existing.setDate(newExpense.getDate());

        return repo.save(existing);
    }

    return null;
    }
    public List<Expense> getByCategory(String category) {
    return repo.findByCategory(category);
    }
    public List<Expense> getByDateRange(String start, String end) {
    return repo.findByDateBetween(start, end);
    }
    public double getMonthlyTotal(String month, String year) {

    List<Expense> allExpenses = repo.findAll();

    double total = 0;

    for (Expense e : allExpenses) {
        String date = e.getDate(); // format: YYYY-MM-DD

        if (date.startsWith(year + "-" + month)) {
            total += e.getAmount();
        }
    }

    return total;
    }
    public Map<String, Double> getCategoryTotals() {

    List<Expense> allExpenses = repo.findAll();

    Map<String, Double> totals = new HashMap<>();

    for (Expense e : allExpenses) {
        String category = e.getCategory();
        double amount = e.getAmount();

        if (totals.containsKey(category)) {
            totals.put(category, totals.get(category) + amount);
        } else {
            totals.put(category, amount);
        }
    }

    return totals;
    }
}