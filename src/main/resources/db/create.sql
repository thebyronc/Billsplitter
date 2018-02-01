SET MODE PostgreSQL;

CREATE TABLE IF NOT EXISTS users (
  id int PRIMARY KEY auto_increment,
  name VARCHAR,
  email VARCHAR
);

CREATE TABLE IF NOT EXISTS receipts (
  id int PRIMARY KEY auto_increment,
  receiptName VARCHAR,
  salestax VARCHAR,
  total INTEGER,
  cleared BOOLEAN
);

CREATE TABLE IF NOT EXISTS items (
  id int PRIMARY KEY auto_increment,
  itemName VARCHAR,
  cost DOUBLE,
  tip DOUBLE,
  userId INTEGER,
  receiptId INTEGER
);

CREATE TABLE IF NOT EXISTS itemId_UserId (
    id int PRIMARY KEY auto_increment,
    itemId INTEGER,
    userId INTEGER
);