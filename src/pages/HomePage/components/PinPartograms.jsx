import React, { useRef, useEffect } from 'react';
import { Card, Layout, Button, message, theme, Descriptions, Typography, Empty } from "antd";
import usePartographsPin from '../../../hooks/use-partographs-pin';
import { EyeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/auth-context';
import { formatTimeNumeric } from '../../../utils/datetime-format';
import { motion } from "framer-motion";
import '../../../styles/scrollbar.module.css';
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
              disabled={!data.response || data.response.length === 0}
            />
            <Button shape="circle" icon={<RightOutlined />} onClick={scrollRight}
              disabled={!data.response || data.response.length === 0} />
          </div>
        </div>

        {data.response.length === 0 ? (
          <Empty description="No hay partogramas anclados" />
        ) : (<div
          ref={scrollRef}
           className="horizontal-scroll"
          style={{
            display: "flex",
            overflowX: "auto",        // permite scroll horizontal
            overflowY: "hidden",
            gap: "16px",
            scrollBehavior: "smooth",
            paddingBottom: 8,
          }}
        >

          {data.response.map((item, index) => (
            <motion.div
              key={item.partographId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
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
            </motion.div>
          ))}
        </div>)}
      </div>
    </Layout.Content>


  );
};

export default PinPartograms;