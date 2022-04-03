import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Rate, Tooltip } from "antd";
import { log } from "util";
import { useState } from "react";

interface LoveButtonPropsType {
  loved: boolean;
  onClickedChange?: (loved: boolean) => void;
  tipTitle?: string;
  buttonIcons?: { lovedIcon: JSX.Element; unlovedIcon: JSX.Element };
}

/**
 * 收藏组件
 * @param loved bool
 * @param onClickedChange 点击收藏按钮
 * @param tipTitle 提示文字，默认为收藏
 * @param buttonIcons
 * @constructor
 */
export const LoveButton = ({
  loved,
  onClickedChange,
  tipTitle,
  buttonIcons,
}: LoveButtonPropsType) => {
  const customIcons = buttonIcons || {
    unlovedIcon: <HeartOutlined style={{ color: "gray" }} />,
    lovedIcon: <HeartFilled style={{ color: "orangered" }} />,
  };

  const customTipTitle = tipTitle || "收藏";

  return (
    <Tooltip
      title={loved ? "点击以取消" + customTipTitle : "点击以" + customTipTitle}
    >
      <Button
        type="text"
        onClick={() => (onClickedChange ? onClickedChange(!loved) : !loved)}
      >
        {loved ? (
          <HeartFilled style={{ color: "orangered" }} />
        ) : (
          <HeartOutlined />
        )}
      </Button>
    </Tooltip>
    // <Rate
    //   count={1}
    //   value={loved ? 1 : 0}
    //   character={loved ? customIcons["lovedIcon"] : customIcons["unlovedIcon"]}
    //   onChange={(num) => onClickedChange?.(!!num)}
    // />
  );
};
