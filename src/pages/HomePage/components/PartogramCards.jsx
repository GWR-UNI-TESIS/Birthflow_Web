import React from 'react';
import { Card, Descriptions } from "antd";
import { SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import {formatTimeNumeric} from '../../../utils/datetime-format';

const PartogramCards = ({ data }) => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {data.map((item) => (
            <Card key={item.key} title={item.name}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Expediente">  {item.recordName}</Descriptions.Item>
                    <Descriptions.Item label="Fecha">  {formatTimeNumeric(item.date)}</Descriptions.Item>
                    <Descriptions.Item label="Modificado">  {formatTimeNumeric(item.updateAt)}</Descriptions.Item>
                    <Descriptions.Item label="Propiedad">  {item.nameCreatedBy}</Descriptions.Item>
                </Descriptions>


            </Card>
        ))}
    </div>
);

export default PartogramCards;