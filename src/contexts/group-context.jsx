import { createContext, useContext, useState } from "react";

const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [group, setGroup] = useState(null);

  return (
    <GroupsContext.Provider value={{ group, setGroup }}>
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = () => {
  return useContext(GroupsContext);
};
