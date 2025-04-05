import { useEffect, useState } from "react";
import { getListGroups } from "../../services/groups/groups-service";
import GroupForm from "./components/Form/GroupForm";
import GroupTable from "./components/table/TableListGroup";

function GroupsApp() {
  const [listData, setListData] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null); // Estado para el grupo en edición

  const handleListGroupData = async () => {
    const response = await getListGroups();
    setListData(response);
  };

  useEffect(() => {
    handleListGroupData();
  }, []);

  return (
    <div>
      <h1>Gestión de Grupos</h1>
      <GroupForm
        onRefresh={handleListGroupData}
        editingGroup={editingGroup}
        setEditingGroup={setEditingGroup} // Pasa el setter al formulario
      />
      <GroupTable listData={listData} onEdit={setEditingGroup} /> {/* Envía la función a la tabla */}
    </div>
  );
}

export default GroupsApp;
