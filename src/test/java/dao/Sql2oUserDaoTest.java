package dao;

import models.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import static org.junit.Assert.*;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.*;

public class Sql2oUserDaoTest {

    private Sql2oUserDao userDao;
    private Connection conn;

    @Before
    public void setUp() throws Exception {
        String connectionString = "jdbc:h2:mem:testing;INIT=RUNSCRIPT from 'classpath:db/create.sql'";
        Sql2o sql2o = new Sql2o(connectionString, "", "");
        userDao = new Sql2oUserDao(sql2o);

        conn = sql2o.open();
    }

    @After
    public void tearDown() throws Exception {
        conn.close();
    }

    @Test
    public void addingUserSetsId() throws Exception {
        User user = setupNewUser();
        int originalUserId = user.getId();
        userDao.add(user);
        assertNotEquals(originalUserId, user.getId());
    }

    @Test
    public void userCanBeFoundById() throws Exception {
        User user1 = setupNewUser();
        User user2 = setupNewUser();
        userDao.add(user1);
        userDao.add(user2);
        assertEquals(2, userDao.getAll().size());
    }

    @Test
    public void getAllUsers() throws Exception {
        User user = setupNewUser();
        userDao.add(user);
        int userId = user.getId();
        assertEquals(user.getName(), userDao.findById(userId).getName());
    }

    @Test
    public void updateChangesUserName() throws Exception {
        User user = setupNewUser();
        userDao.add(user);
        int userId = user.getId();
        userDao.update(userId, "Foiled", "foiled@email.com");
        assertEquals("Foiled", userDao.findById(userId).getName());
    }

    @Test
    public void deleteUserById() throws Exception {
        User user = setupNewUser();
        userDao.add(user);
        int userId = user.getId();
        userDao.deleteById(userId);
        assertEquals(0, userDao.getAll().size());
    }

    public User setupNewUser() {
        return new User("Byron", "byron@email.com");
    }
}