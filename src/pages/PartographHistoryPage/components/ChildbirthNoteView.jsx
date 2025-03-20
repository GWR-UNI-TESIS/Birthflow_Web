import React, { useState } from "react";
import { Descriptions, Typography, Button } from "antd";

const ChildbirthNoteView = ({ childbirthNote }) => {
    return (
        <div style={{ paddingTop: 16 }}>
            <Typography.Title level={3}>Nota de Parto</Typography.Title>
            {childbirthNote ? (
                <>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="Descripción">{childbirthNote.description}</Descriptions.Item>
                        <Descriptions.Item label="Hora">{childbirthNote.hour}</Descriptions.Item>
                        <Descriptions.Item label="Sexo">{childbirthNote.sex}</Descriptions.Item>
                        <Descriptions.Item label="APGAR">{childbirthNote.apgar}</Descriptions.Item>
                        <Descriptions.Item label="Temperatura">{childbirthNote.temperature}</Descriptions.Item>
                        <Descriptions.Item label="Caput Succedaneum">{childbirthNote.caputto}</Descriptions.Item>
                        <Descriptions.Item label="Circular">{childbirthNote.circular}</Descriptions.Item>
                        <Descriptions.Item label="Líquido Amniótico">{childbirthNote.lamniotico}</Descriptions.Item>
                        <Descriptions.Item label="Micción">{childbirthNote.miccion}</Descriptions.Item>
                        <Descriptions.Item label="Meconio">{childbirthNote.meconio}</Descriptions.Item>
                        <Descriptions.Item label="PA">{childbirthNote.pa}</Descriptions.Item>
                        <Descriptions.Item label="Expulsivo">{childbirthNote.expulsivo}</Descriptions.Item>
                        <Descriptions.Item label="Placenta">{childbirthNote.placenta}</Descriptions.Item>
                        <Descriptions.Item label="Alumbramiento">{childbirthNote.alumbramiento}</Descriptions.Item>
                        <Descriptions.Item label="Huella Plantar">{childbirthNote.huellaPlantar}</Descriptions.Item>
                        <Descriptions.Item label="Perímetro Cefálico">{childbirthNote.pc}</Descriptions.Item>
                        <Descriptions.Item label="Talla">{childbirthNote.talla}</Descriptions.Item>
                        <Descriptions.Item label="Brazalete">{childbirthNote.brazalete}</Descriptions.Item>
                        <Descriptions.Item label="Huella Digital">{childbirthNote.huellaDig}</Descriptions.Item>
                    </Descriptions>

                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <Button type="primary" onClick={() => setModalVisible(true)}>
                            Editar Nota de Parto
                        </Button>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: "center", margin: 10, }}>
                    <Typography.Title level={5} style={{ marginBottom: 25 }}>No hay nota de parto registrada.</  Typography.Title>

                </div>
            )}
        </div>
    );
};

export default ChildbirthNoteView;
