import { Table } from "antd";

const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "groupName", key: "name" }
]

function GroupTable({ listData }) {
    return (
      <div>
        <Table
                        key="group-table"
                        dataSource={listData || []}
                        columns={columns}
                        rowKey="groupId"
                        pagination={{ pageSize: 15 }}
                    />
      </div>
    );
  };
  
  export default GroupTable;
  

