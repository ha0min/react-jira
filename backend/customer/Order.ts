import { OrderBuidler } from "./OrderBuilder";

export class Order {
  private name: String; //顾客姓名
  private goods: String; //购买的商品
  private address: String; //地址

  constructor(builder: OrderBuidler) {
    this.name = builder.getName();
    this.goods = builder.getGoods();
    this.address = builder.getAddress();
  }

  //生成订单
  createOrder() {
    // System.out.println("----订单已生成----");
    // if(name != null){
    //     System.out.println("顾客姓名："+name);
    // }
    // System.out.println("购买的商品："+goods);
    // System.out.println("地址"+address);
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
