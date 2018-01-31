package dao;

import models.Item;
import models.User;

import java.util.List;

public interface ItemDao {
    void add(Item item);
    Item findById(int id);
    void addItemToUser(Item item, User user);
    List<Item> getAll();
    List<User> getAllUsersForAItem(int itemId);

    List<Item> findItemsByReceiptId(int id);
    List<Item> findItemsByUserId(int userId);
    void update(int id, String itemName, double cost, int receiptId);

    void deleteById(int id);
  
    void splitItemById(int id, double cost, int getSplit);
}
