import { Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../routes/path";

const columns = [
  { title: "Id", dataIndex: "id", key: "id" },
  { title: "Nombre", dataIndex: "groupName", key: "name" },
];

function GroupTable({ listData, onEdit }) {

  const navigate = useNavigate();
  return (
    <div>
      <Table
        key="group-table"
        dataSource={listData || []}
        columns={[
          ...columns,
          {
            title: "Acción",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <a onClick={() => onEdit(record)}>Editar</a>
                <a onClick={() => {
                  navigate(PATH.USERS_IN_GROUP(record.id), { state: { createdBy: record.createdBy } })
                }
                }>Usuarios</a>
              </Space>
            ),
          },
        ]}
        rowKey="id"
        pagination={{ pageSize: 15 }}
      />
    </div>
  );
}

export default GroupTable;
