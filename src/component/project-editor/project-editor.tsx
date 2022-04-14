import { Button, Drawer } from "antd";
import { useProjectEditor } from "../../pages/project-list/util";

export const ProjectEditor = () => {
  const { isProjectEditorOpen, close } = useProjectEditor();

  return (
    <Drawer onClose={close} width={"90%"} visible={isProjectEditorOpen}>
      <h1>Project Model</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
