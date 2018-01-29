package dao;

import models.Receipt;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import static org.junit.Assert.*;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.*;
import static org.junit.Assert.*;

public class Sql2oReceiptDaoTest {
    private Sql2oReceiptDao receiptDao;
    private Connection conn;

    @Before
    public void setUp() throws Exception {
        String connectionString = "jdbc:h2:mem:testing;INIT=RUNSCRIPT from 'classpath:db/create.sql'";
        Sql2o sql2o = new Sql2o(connectionString, "", "");
        receiptDao = new Sql2oReceiptDao(sql2o);

        conn = sql2o.open();
    }

    @After
    public void tearDown() throws Exception {
        conn.close();
    }

    @Test
    public void addingReceiptSetsId() throws Exception {
        Receipt receipt = setupNewReceipt();
        int originalReceiptId = receipt.getId();
        receiptDao.add(receipt);
        assertNotEquals(originalReceiptId, receipt.getId());
    }

    @Test
    public void receiptCanBeFoundById() throws Exception {
        Receipt receipt1 = setupNewReceipt();
        Receipt receipt2 = setupNewReceipt();
        receiptDao.add(receipt1);
        receiptDao.add(receipt2);
        assertEquals(2, receiptDao.getAll().size());
    }

    @Test
    public void getAllReceipts() throws Exception {
        Receipt receipt = setupNewReceipt();
        receiptDao.add(receipt);
        int receiptId = receipt.getId();
        assertEquals(receipt.getReceiptName(), receiptDao.findById(receiptId).getReceiptName());
    }

    @Test
    public void updateChangesReceiptName() throws Exception {
        Receipt receipt = setupNewReceipt();
        receiptDao.add(receipt);
        int receiptId = receipt.getId();
        receiptDao.update(receiptId,"Chicken Rice", 22.22, true);
        assertEquals("Chicken Rice", receiptDao.findById(receiptId).getReceiptName());
    }

    @Test
    public void deleteReceiptById() throws Exception {
        Receipt receipt = setupNewReceipt();
        receiptDao.add(receipt);
        int receiptId = receipt.getId();
        receiptDao.deleteById(receiptId);
        assertEquals(0, receiptDao.getAll().size());
    }

    public Receipt setupNewReceipt() {
        return new Receipt("PizzaPizza");
    }
}