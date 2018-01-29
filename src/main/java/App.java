import com.google.gson.Gson;
import exceptions.ApiException;
import dao.Sql2oItemDao;
import dao.Sql2oReceiptDao;
import dao.Sql2oUserDao;
import models.Item;
import models.Receipt;
import models.User;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import java.util.HashMap;
import java.util.Map;
import static spark.Spark.*;

public class App extends RuntimeException {
    public static void main(String[] args) {
        Sql2oReceiptDao receiptDao;
        Sql2oItemDao itemDao;
        Sql2oUserDao userDao;
        Connection conn;
        Gson gson = new Gson();
        String connectionString = "jdbc:h2:~/Billsplitter.db;INIT=RUNSCRIPT from 'classpath:db/create.sql'";
        Sql2o sql2o = new Sql2o(connectionString, "","");
        receiptDao = new Sql2oReceiptDao(sql2o);
        itemDao = new Sql2oItemDao(sql2o);
        userDao = new Sql2oUserDao(sql2o);
        conn = sql2o.open();

        //DELETE


        //CREATE
        post("/receipts/new","application/json", (req, res) -> { //show form create new receipt
            Receipt receipt = gson.fromJson(req.body(), Receipt.class);
            receiptDao.add(receipt);
            res.status(201);
            return gson.toJson(receipt);
        });

        post("/receipts/:receiptId/items/new","applcation/json", (req, res) -> { //show form to create new item
            Item item = gson.fromJson(req.body(), Item.class);
            itemDao.add(item);
            res.status(201);
            return gson.toJson(item);
        });

        post("/users/new","application/json", (req, res) -> { //show form create new user
            User user = gson.fromJson(req.body(), User.class);
            userDao.add(user);
            res.status(201);
            return gson.toJson(user);
        });

        //READ
        get("/receipts","application/json", (req, res) -> { //show all receipts
            return gson.toJson(receiptDao.getAll());
        });

        get("/receipts/:receiptId/items","application/json", (req, res) -> { //show all items by receipt
            int receiptId = Integer.parseInt(req.params("receiptId"));
            return gson.toJson(itemDao.findItemsByReceiptId(receiptId));
        });

        get("/users", "application/json", (req, res) -> { //show all users
            return gson.toJson(userDao.getAll());
        });

        //UPDATE
        post("/receipts/:id/update", (req, res) -> { //process a form to update receipt
            Receipt editReceipt = gson.fromJson(req.body(), Receipt.class);
            int idOfReceiptToEdit = Integer.parseInt(req.params("id"));
            String receiptName = editReceipt.getReceiptName();
            double total = editReceipt.getTotal();
            boolean flag = editReceipt.getCleared();
            receiptDao.update(idOfReceiptToEdit, receiptName, total, flag);
            return gson.toJson(editReceipt);
        });

        post("/users/:id/update", (req, res) -> { //process a form to update users
            User editUser = gson.fromJson(req.body(), User.class);
            int idOfUserToEdit = Integer.parseInt(req.params("id"));
            String userName = editUser.getName();
            String userEmail = editUser.getEmail();
            userDao.update(idOfUserToEdit, userName, userEmail);
            return gson.toJson(editUser);
        });

        post("/receipts/:id/items/:itemId/update", (req, res) -> { //process a form to update item
            Item editItem = gson.fromJson(req.body(), Item.class);
            int idOfItemToEdit = Integer.parseInt(req.params("id"));
            String itemName = editItem.getItemName();
            double cost = editItem.getCost();
            int userId = editItem.getUserId();
            itemDao.update(idOfItemToEdit, itemName, cost, userId);
            return gson.toJson(editItem);
        });

        //EXCEPTIONS
        exception(ApiException.class, (exc, req, res) -> {
            ApiException err = (ApiException) exc;
            Map<String, Object> jsonMap = new HashMap<>();
            jsonMap.put("status", err.getStatusCode());
            jsonMap.put("errorMessage", err.getMessage());
            res.type("application/json");
            res.status(err.getStatusCode());
            res.body(gson.toJson(jsonMap));
        });

        //FILTERS
        after((req, res) -> {
            res.type("application/json");
        });
    }
}
