import { Table } from "antd";

const columns = [
  { title: "Id", dataIndex: "id", key: "id" },
  { title: "Nombre", dataIndex: "groupName", key: "name" },
];

function GroupTable({ listData, onEdit }) {
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
              <a onClick={() => onEdit(record)}>Editar</a> // Botón de edición
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
