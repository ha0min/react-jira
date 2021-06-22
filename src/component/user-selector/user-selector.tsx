import React from "react";
import { IdSelector } from "../base/id-selector";
import { useUsers } from "../../utils/use-users";

export const UserSelector = (
  props: React.ComponentProps<typeof IdSelector>
) => {
  const { data: users } = useUsers();
  return <IdSelector selectorOptions={users || []} {...props} />;
};
