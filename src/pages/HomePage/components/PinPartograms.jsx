import React, { useRef, useEffect } from 'react';
import { Card, Layout, Button, message, theme, Descriptions, Typography } from "antd";
import usePartographsPin from '../../../hooks/use-partographs-pin';
import { EyeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/auth-context';
import { formatTimeNumeric } from '../../../utils/datetime-format';


const PinPartograms = () => {
  const scrollRef = useRef();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const { user } = useAuth();
  const { data, loading: dataLoading, error: dataError } = usePartographsPin(user.id);


  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  useEffect(() => {

    if (dataError) message.error("Error al cargar los partogramas.");
  }, [dataError]);


  if (data == null) return <div>Error</div>;
  return (

    <Layout.Content style={{ margin: "1rem", color: 'lightblue' }}>
      <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",

          }}
        >
          <Typography.Title level={4}>Partogramas anclados</Typography.Title>
          <div>
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={scrollLeft}
              style={{ marginRight: 8 }}
            />
            <Button shape="circle" icon={<RightOutlined />} onClick={scrollRight} />
          </div>
        </div>

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "16px",
            scrollBehavior: "smooth",
            paddingBottom: 8,
          }}
        >
          {data.response.map((item) => (
            <Card
              key={item.partographId}
              title={item.name}
              style={{
                minWidth: 320,
                maxWidth: 400,
                flex: "0 0 auto",
                borderRadius: "10px",
              }}
              actions={[
                <EyeOutlined key="show" label='Ver' />,
              ]}
            >
              <Descriptions layout="vertical" >
                <Descriptions.Item label="Expediente">
                  {item.recordName}
                </Descriptions.Item>
                <Descriptions.Item label="Fecha">
                  {formatTimeNumeric(item.date)}
                </Descriptions.Item>
                <Descriptions.Item label="Tiempos Trabajo">
                  {formatTimeNumeric(item.updateAt)}
                </Descriptions.Item>
                <Descriptions.Item label="Propiedad">
                  {item.nameCreatedBy}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ))}
        </div>
      </div>
    </Layout.Content>
  );
};

export default PinPartograms;