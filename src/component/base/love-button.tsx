import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Rate, Tooltip } from "antd";

interface LoveButtonPropsType {
  loved: boolean;
  handleClick?: (loved: boolean) => void;
  tipTitle?: string;
  buttonIcons?: { lovedIcon: JSX.Element; unlovedIcon: JSX.Element };
}

export const LoveButton = ({
  loved,
  handleClick,
  tipTitle,
  buttonIcons,
}: LoveButtonPropsType) => {
  const customIcons = buttonIcons || {
    unlovedIcon: <HeartOutlined style={{ color: "gray" }} />,
    lovedIcon: <HeartFilled style={{ color: "orangered" }} />,
  };

  return (
    // <Tooltip title={loved ? (tipTitle ? tipTitle : "比心") : (tipTitle ? "取消" + tipTitle : "取消比心")}>
    //     <Button type="text" onClick={()=> handleClick ? handleClick(loved) : !!loved}>
    //         {loved ? <HeartOutlined/> : <HeartFilled style={{color: "orangered"}}/>}
    //     </Button>
    <Rate
      count={1}
      value={loved ? 1 : 0}
      character={loved ? customIcons["lovedIcon"] : customIcons["unlovedIcon"]}
      onChange={(num) => handleClick?.(!!num)}
    />
    // </Tooltip>
  );
};
