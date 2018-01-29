package dao;

import models.Item;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.List;

public class Sql2oItemDao implements ItemDao {
    private final Sql2o sql2o;

    public Sql2oItemDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    @Override
    public void add(Item item) {
        String sql = "INSERT INTO receipts (itemName, cost, receiptId) VALUES (itemName, cost, receiptId)";
        try(Connection con = sql2o.open()){
            int id = (int) con.createQuery(sql)
                    .bind(item)
                    .executeUpdate()
                    .getKey();
            item.setId(id);
        } catch (Sql2oException ex) {
            System.out.println(ex);
        }
    }

    @Override
    public Item findById(int id) {
        try(Connection con = sql2o.open()){
            return con.createQuery("SELECT * FROM items WHERE id=:id")
                    .addParameter("id", id)
                    .executeAndFetchFirst(Item.class);
        }
    }
    @Override
    public List<Item> findItemsByReceiptId(int id) {
        try(Connection con = sql2o.open()){
            return con.createQuery("SELECT * FROM items WHERE receiptId=:receiptId")
                    .addParameter("receiptId", id)
                    .executeAndFetch(Item.class);
        }
    }
    @Override
    public List<Item> findItemsByUserId(int id) {
        try(Connection con = sql2o.open()){
            return con.createQuery("SELECT * FROM items WHERE userId=:userId")
                    .addParameter("userId", id)
                    .executeAndFetch(Item.class);
        }
    }
    @Override
    public List<Item> getAll() {
        try(Connection con = sql2o.open()){
            return con.createQuery("SELECT * FROM items")
                    .executeAndFetch(Item.class);
        }
    }

    @Override
    public void update(int id, String itemName, double cost, int userId) {
        String sql = "UPDATE items SET (itemName, cost, userId) = (:itemName, :cost, :userId) WHERE id=:id";
        try (Connection con = sql2o.open()) {
            con.createQuery(sql)
                    .addParameter("itemName", itemName)
                    .addParameter("cost", cost)
                    .addParameter("userId", userId)
                    .addParameter("id", id)
                    .executeUpdate();
        } catch (Sql2oException ex) {
            System.out.println(ex);
        }
    }

    @Override
    public void deleteById(int id) {
        try(Connection con = sql2o.open()){
            con.createQuery("DELETE FROM items WHERE id=:id")
                    .addParameter("id", id)
                    .executeUpdate();
        } catch (Sql2oException ex) {
            System.out.println(ex);
        }
    }
}
