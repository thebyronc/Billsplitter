package dao;

import models.Receipt;

import java.util.List;

public interface ReceiptDao {
    void add(Receipt receipt);
    Receipt findById(int id);
    List<Receipt> getAll();

    void update(int id, String receiptName, double total, Boolean cleared);

    void deleteById(int id);
}
