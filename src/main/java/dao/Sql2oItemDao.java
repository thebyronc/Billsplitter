package dao;

import models.Item;
import models.User;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.sql2o.Sql2oException;

import java.util.ArrayList;
import java.util.List;

public class Sql2oItemDao implements ItemDao {
    private final Sql2o sql2o;

    public Sql2oItemDao(Sql2o sql2o) {
        this.sql2o = sql2o;
    }


    @Override
    public void add(Item item) {

        String sql = "INSERT INTO items (itemName, cost, receiptId) VALUES (:itemName, :cost, :receiptId)";

        try (Connection con = sql2o.open()) {
            int id = (int) con.createQuery(sql, true)
                    .addParameter("itemName", item.getItemName())
                    .addParameter("cost", item.getCost())
                    .addParameter("receiptId", item.getReceiptId())
                    .executeUpdate()
                    .getKey();
            item.setId(id);
        } catch (Sql2oException ex) {
            System.out.println(ex);
        }
    }
    @Override
    public void addItemToUser(Item item, User user) {
        String sql = "INSERT INTO itemid_userid (itemId, userId) VALUES (:itemId, :userId)";
        try (Connection con = sql2o.open()) {
            con.createQuery(sql)
                    .addParameter("itemId", item.getId())
                    .addParameter("userId", user.getId())
                    .executeUpdate();
        } catch (Sql2oException ex) {
            System.out.println(ex);
        }
    }

    @Override
    public Item findById(int id) {
        try (Connection con = sql2o.open()) {
            return con.createQuery("SELECT * FROM items WHERE id=:id")
                    .addParameter("id", id)
                    .executeAndFetchFirst(Item.class);
        }
    }

    @Override
    public List<Item> findItemsByReceiptId(int id) {
        try (Connection con = sql2o.open()) {
            return con.createQuery("SELECT * FROM items WHERE receiptId=:receiptId")
                    .addParameter("receiptId", id)
                    .executeAndFetch(Item.class);
        }
    }

    @Override
    public List<Item> findItemsByUserId(int userId) {
        ArrayList<Item> items = new ArrayList<>();

        String joinQuery = "SELECT itemId FROM itemid_userid WHERE userId=:userId";

        try (Connection con = sql2o.open()) {
            List<Integer> allItemsIds = con.createQuery(joinQuery)
                    .addParameter("userId", userId)
                    .executeAndFetch(Integer.class);
            for (Integer itemId : allItemsIds) {
                String ItemQuery = "SELECT * FROM items WHERE id = :itemId";
                items.add(
                        con.createQuery(ItemQuery)
                                .addParameter("itemId", itemId)
                                .executeAndFetchFirst(Item.class));
            }
        } catch (Sql2oException ex) {
            System.out.println(ex);
        }
        return items;
    }

    @Override
    public List<Item> getAll() {
        try (Connection con = sql2o.open()) {
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
        String sql = "DELETE FROM items WHERE id = :id";
        String deleteJoin = "DELETE FROM itemId_UserId WHERE itemId = :itemId";
        try (Connection con = sql2o.open()) {
            con.createQuery(sql)
                    .addParameter("id", id)
                    .executeUpdate();
            con.createQuery(deleteJoin)
                    .addParameter("itemId", id)
                    .executeUpdate();
        } catch (Sql2oException ex) {
            System.out.println(ex);
        }
    }

    @Override
    public List<User> getAllUsersForAItem(int itemId) {
        ArrayList<User> users = new ArrayList<>();
        String getUserIdQuery = "DELETE userId FROM itemId_UserId WHERE itemId = :itemId";
        try (Connection con = sql2o.open()) {
            List<Integer> allUsersId = con.createQuery(getUserIdQuery)
                    .addParameter("itemId", itemId)
                    .executeAndFetch(Integer.class);

            for (Integer userId : allUsersId) {
                String sql = "SELECT * FROM users WHERE id = :userId";
                users.add(con.createQuery(sql)
                        .addParameter("userId", userId)
                        .executeAndFetchFirst(User.class));
            }
        }catch (Sql2oException ex) {
              System.out.println(ex);
        }
        return users;
    }
}
