export interface Food {
  produce: () => String;
}

export class JiGongBao implements Food {
  produce() {
    return "鸡";
  }
}

export class LuoSiFen implements Food {
  produce() {
    return "螺蛳粉";
  }
}
