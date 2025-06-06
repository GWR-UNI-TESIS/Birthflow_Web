import { useEffect, useState } from "react";
import { getListGroups } from "../../services/groups/groups-service";
import GroupForm from "./components/Form/GroupForm";
import GroupTable from "./components/table/TableListGroup";
import { Typography, Layout, Breadcrumb, Divider } from "antd";
import BackButton from "../../components/ReturnButton";
import PATH from "../../routes/path";
import { NavLink } from "react-router-dom";
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
    <>
      <div>

        <div style={{ marginLeft: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <BackButton to={PATH.HOME} />
          <Breadcrumb
            items={[
              { title: <NavLink to={PATH.HOME}>Inicio</NavLink> },
              { title: "Grupos de trabajo" },
            ]}
          />
        </div>
      </div>
      <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>

        <div style={{ background: "#fff", minHeight: 280, padding: 10, borderRadius: "8px" }}>

          <Typography.Title level={3}>Gestión de Grupos</Typography.Title>
          <GroupForm
            onRefresh={handleListGroupData}
            editingGroup={editingGroup}
            setEditingGroup={setEditingGroup} // Pasa el setter al formulario
          />

          <Divider />
          <GroupTable listData={listData} onEdit={setEditingGroup}  />
        </div>
      </Layout.Content>
    </>
  );
}

export default GroupsApp;
