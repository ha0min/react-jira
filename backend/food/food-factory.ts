import { Food, JiGongBao, LuoSiFen } from "./food";

export interface FoodFactory {
  produceFood: () => Food;
}

export class JiGongBaoFactory implements FoodFactory {
  produceFood() {
    return new JiGongBao();
  }
}

export class LuoSiFenFactory implements FoodFactory {
  produceFood() {
    return new LuoSiFen();
  }
}
