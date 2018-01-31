package dao;

import models.Item;
import models.Receipt;
import models.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.*;


public class Sql2oItemDaoTest {
    private Sql2oItemDao itemDao;
    private Sql2oUserDao userDao;
    private Connection conn;

    @Before
    public void setUp() throws Exception {
        String connectionString = "jdbc:h2:mem:testing;INIT=RUNSCRIPT from 'classpath:db/create.sql'";
        Sql2o sql2o = new Sql2o(connectionString, "", "");
        itemDao = new Sql2oItemDao(sql2o);
        userDao = new Sql2oUserDao(sql2o);

        conn = sql2o.open();
    }

    @After
    public void tearDown() throws Exception {
        conn.close();
    }


    @Test
    public void addingItemSetsId() throws Exception {
        Item item = setupNewItem();
        int originalItemId = item.getId();
        itemDao.add(item);
        assertNotEquals(originalItemId, item.getId());

    }

    @Test
    public void addItemToUser() throws Exception {

        Item item1 = setupNewItem();
        Item item2 = setupNewItem2();
        itemDao.add(item1);
        itemDao.add(item2);

        User testUser = new User("chris", "chris@gmail.com");
        userDao.add(testUser);

        itemDao.addItemToUser(item1, testUser);
        itemDao.addItemToUser(item2, testUser);

        assertEquals(2, itemDao.findItemsByUserId(testUser.getId()).size());

    }

    @Test
    public void findById() throws Exception {
        Item item1 = setupNewItem();
        Item item2 = setupNewItem();
        itemDao.add(item1);
        itemDao.add(item2);
        assertEquals(2, itemDao.getAll().size());
    }

    @Test
    public void findItemsByReceiptId() throws Exception {
        Item item1 = setupNewItem();
        Item item2 = setupNewItem2();
        Item item3 = setupNewItem3();
        itemDao.add(item1);
        itemDao.add(item2);
        itemDao.add(item3);
        int receiptId = item2.getReceiptId();
        assertEquals(2, itemDao.findItemsByReceiptId(receiptId).size());
    }

    @Test
    public void findItemsByUserId() throws Exception {
        Item item1 = setupNewItem();
        Item item2 = setupNewItem2();
        itemDao.add(item1);
        itemDao.add(item2);
        User testUser = new User("chris", "chris@gmail.com");
        userDao.add(testUser);
        itemDao.addItemToUser(item1, testUser);
        itemDao.addItemToUser(item2, testUser);
        Item[] items = {item1, item2};
        assertEquals(2, itemDao.findItemsByUserId(testUser.getId()).size());
    }

    @Test
    public void getAll() throws Exception {
        Item item1 = setupNewItem();
        Item item2 = setupNewItem2();
        itemDao.add(item1);
        itemDao.add(item2);
        assertEquals(2, itemDao.getAll().size());
        }


    @Test
    public void update() throws Exception {
        Item item1 = setupNewItem();
        itemDao.add(item1);
        itemDao.update(item1.getId(), "Sandwich", 10, 1, 1);
        assertNotEquals(item1.getItemName(), itemDao.findById(item1.getId()).getItemName());
    }

    @Test
    public void deleteById() throws Exception {
        Item item1 = setupNewItem();
        itemDao.add(item1);
        itemDao.deleteById(item1.getId());
        assertEquals(0, itemDao.getAll().size());
    }

    @Test
    public void deletingByItemAlsoUpdatesJoinTable() throws Exception {
        User user = setupNewUser();
        userDao.add(user);

        Item item = setupNewItem();
        itemDao.add(item);

        Item item1 = setupNewItem();
        itemDao.add(item1);
        itemDao.addItemToUser(item,user);
        itemDao.addItemToUser(item1,user);
        itemDao.deleteById(item.getId());


        assertEquals(0,itemDao.getAllUsersForAItem(item.getId()).size());// need get all users for a item
    }


    public Item setupNewItem() {
        return new Item("fries", 10, 2, 1);
    }

    public Item setupNewItem2() {
        return new Item("drink", 5, 1, 1);
    }
    public Item setupNewItem3() {
        return new Item("drink", 5, 1, 2);
    }

    public User setupNewUser() {
        return new User("Byron", "byron@email.com");
    }



}