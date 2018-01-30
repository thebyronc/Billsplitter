package dao;

import models.Item;
import models.Receipt;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import static org.junit.Assert.*;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.*;

/**
 * Created by Guest on 1/30/18.
 */
public class Sql2oItemDaoTest {
    private Sql2oItemDao itemDao;
    private Connection conn;

    @Before
    public void setUp() throws Exception {
        String connectionString = "jdbc:h2:mem:testing;INIT=RUNSCRIPT from 'classpath:db/create.sql'";
        Sql2o sql2o = new Sql2o(connectionString, "", "");
        itemDao = new Sql2oItemDao(sql2o);

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
    public void findById() throws Exception {
        Item item1 = setupNewItem();
        Item item2 = setupNewItem();
        itemDao.add(item1);
        itemDao.add(item2);
        assertEquals(2, itemDao.getAll().size());
    }

    @Test
    public void findItemsByReceiptId() throws Exception {
    }

    @Test
    public void findItemsByUserId() throws Exception {
    }

    @Test
    public void getAll() throws Exception {
    }

    @Test
    public void update() throws Exception {
    }

    @Test
    public void deleteById() throws Exception {
    }

    @Test
    public void splitItemById() throws Exception {
        Item item = setupNewItem();
        itemDao.add(item);
        int id = item.getId();
        itemDao.splitItemById(id, 10, 2);
        assertEquals(5.0, itemDao.findById(id).getCost());
    }

    public Item setupNewItem() {
        return new Item("fries", 10, 2, 1);
    }


}