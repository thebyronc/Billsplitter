package dao;

import models.User;

import java.util.List;

public interface UserDao {
    void add(User user);
    User findById(int id);
    List<User> getAll();

    void update(int id, String name, String email);

    void deleteById(int id);
}
