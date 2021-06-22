import { Button, Drawer } from "antd";

export const ProjectEditor = (props: {
  projectEditorOpen: boolean;
  handleClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.handleClose}
      width={"60%"}
      visible={props.projectEditorOpen}
    >
      <h1>Project Model</h1>
      <Button onClick={props.handleClose}>关闭</Button>
    </Drawer>
  );
};
