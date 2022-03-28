import { Order } from "./Order";

export class OrderBuidler {
  private name: String; //顾客姓名
  private goods: String; //购买的商品
  private address: String; //地址

  constructor(name: String, goods: String, address: String) {
    this.name = name;
    this.goods = goods;
    this.address = address;
  }

  //生成订单方法
  create() {
    return new Order(this);
  }

  getName() {
    return this.name;
  }

  getGoods() {
    return this.goods;
  }

  getAddress() {
    return this.address;
  }
}
