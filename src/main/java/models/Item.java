package models;

public class Item {
  private String itemName;
  private double cost;
  private double tip;
  private int percent;
  private int receiptId;
  private int userId;
  private int id;

  public Item(String itemName, double cost, int percent, int userId, int receiptId) {
    this.itemName = itemName;
    this.cost = cost;
    this.percent = percent;
    this.tip = 0;
    this.userId = userId;
    this.receiptId = receiptId;

  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }
  public String getItemName() {
    return this.itemName;
  }

  public void setCost(double cost) {
    this.cost = cost;
  }
  public double getCost() {
    return this.cost;
  }

  public int getPercent(){
    return percent;
  }

  public double getTip(int percent){
    tip = (cost * percent)/100;
    return tip;
  }

  public void setReceiptId(int id) {
    this.receiptId = id;
  }
  public int getReceiptId() {
    return this.receiptId;
  }

  public void setUserId(int id) {
    this.userId = id;
  }
  public int getUserId() {
    return this.userId;
  }

  public void setId(int id) {
    this.id = id;
  }
  public int getId() {
    return this.id;
  }
}
