import { useEffect, useState } from "react";
import { getListGroups } from "../../services/groups/groups-service";
import { Content } from "antd/es/layout/layout";
import GroupForm from "./components/Form/GroupForm";
import GroupTable from "./components/table/TableListGroup";


function GroupsApps () {
  const [listData, setListData] = useState([]);

  const handleListGroupData = async () => {
    const response = await getListGroups();
    console.log("respose",response);
    setListData(response);
  }  
  
  useEffect(() => {
    handleListGroupData();
  }, []);

  useEffect(() => {
    console.log("listData", listData);
  }, [listData])
  
  return (
    <div>
      <h1>Gestión de Grupos</h1>
      <GroupForm onRefresh={handleListGroupData} />
      <GroupTable listData={listData} />
    </div>
  );
} 

export default GroupsApps;