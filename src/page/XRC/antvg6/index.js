import React from "react";
import AntvG6 from '../../../components/Antvg6/index'
import {
    Col,
    Row,
    Radio,
    Tag,
    message,
  } from "antd";
export default function Page(){
    return <div>
        <Row gutter={[16, 24]}>
        <Col span={12}>
            <AntvG6/>
        </Col>
        </Row>
    </div>
}