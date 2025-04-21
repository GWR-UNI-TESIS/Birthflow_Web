import React, { useRef, useEffect } from 'react';
import { Card, Layout, Button, message, theme, Descriptions, Typography, Empty, Spin } from "antd";
import usePartographsPin from '../../../hooks/use-partographs-pin';
import { EyeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/auth-context';
import { formatTimeNumeric } from '../../../utils/datetime-format';
import { motion } from "framer-motion";
import '../../../styles/scrollbar.module.css';
import { useNavigate } from 'react-router-dom';
import PATH from '../../../routes/path';

const PinPartograms = () => {
  const scrollRef = useRef();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const { user } = useAuth();
  const { data, loading: dataLoading, error: dataError } = usePartographsPin(user.id);

  let navigate = useNavigate();

  const handleNavigateToPartograph = (partographId) => {
    navigate(PATH.PARTOGRAPH(partographId));
  }


  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  useEffect(() => {

    if (dataError) message.error("Error al cargar los partogramas.");
  }, [dataError]);


  const isEmpty = !data || !data.response || data.response.length === 0;

  if (dataError) {
    return <Empty description="Error al cargar los datos" />;
  }

  return (
    <Spin spinning={dataLoading} tip="Cargando partogramas anclados...">
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
                disabled={isEmpty}
              />
              <Button shape="circle" icon={<RightOutlined />} onClick={scrollRight}
                disabled={isEmpty} />
            </div>
          </div>


          {isEmpty ? (
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
                    <a onClick={() => handleNavigateToPartograph(item.partographId)}>
                      <EyeOutlined key="show" label='Ver' />
                    </a>,

                  ]}
                >
                  <Descriptions layout="vertical" >
                    <Descriptions.Item label="Expediente" span={2}>
                      {item.recordName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Fecha">
                      {formatTimeNumeric(item.date)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Modificado">
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

    </Spin>
  );
};

export default PinPartograms;