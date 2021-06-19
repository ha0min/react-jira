import { Link, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import { KanBan } from "../kanban/kanban";
import { Epic } from "../epic/epic";

export const ProjectDetail = () => {
  return (
    <div>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanBan />} />
        <Route path={"/epic"} element={<Epic />} />
        {/*<Navigate to={"/kanban"} />*/}
      </Routes>
    </div>
  );
};
