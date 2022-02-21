import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { RadialBar, Column } from "@ant-design/plots";
import { Card, Row, Col } from "antd";
import { TeamOutlined } from "@ant-design/icons";
const AdminDashboard = () => {
  const DemoRadialBar = () => {
    const data = [
      {
        name: "Number Of Patients",
        number: 30178,
      },
    ];
    const config = {
      data,
      xField: "name",
      yField: "number",
      maxAngle: 260, //最大旋转角度,
      radius: 1,
      innerRadius: 0.9,
      width: 200,
      height: 200,
      tooltip: {
        formatter: datum => {
          return {
            name: "number",
            value: datum.number,
          };
        },
      },
    };
    return <RadialBar {...config} />;
  };
  const DemosRadialBar = () => {
    const data = [
      {
        name: "Number Of Patients",
        number: 30178,
      },
    ];
    const config = {
      data,
      xField: "name",
      yField: "number",
      maxAngle: 260, //最大旋转角度,
      radius: 1,
      innerRadius: 0.9,
      width: 200,
      height: 200,
      tooltip: {
        formatter: datum => {
          return {
            name: "number",
            value: datum.number,
          };
        },
      },
    };
    return <RadialBar {...config} />;
  };
  const DemoColumn = () => {
    const data = [
      {
        type: "家具家电",
        sales: 38,
      },
      {
        type: "粮油副食",
        sales: 52,
      },
      {
        type: "生鲜水果",
        sales: 61,
      },
      {
        type: "美容洗护",
        sales: 145,
      },
      {
        type: "母婴用品",
        sales: 48,
      },
      {
        type: "进口食品",
        sales: 38,
      },
      {
        type: "食品饮料",
        sales: 36,
      },
      {
        type: "red",
        sales: 38,
      },
      {
        type: "green",
        sales: 38,
      },
      {
        type: "white",
        sales: 38,
      },
      {
        type: "yellow",
        sales: 38,
      },
      {
        type: "blue",
        sales: 38,
      },
    ];
    const config = {
      data,
      xField: "type",
      yField: "sales",
      label: {
        // 可手动配置 label 数据标签位置
        position: "middle",
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: "类别",
        },
        sales: {
          alias: "销售额",
        },
      },
    };
    return <Column {...config} />;
  };
  return (
    <div>
      <h1>Welcome to dashboard</h1>
      <Row gutter={24}>
        <Col xs={12} sm={12} md={6}>
          <Card bordered={true}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  background: "red",
                  borderRadius: "100%",
                  width: "50px",
                  height: "50px",
                  lineHeight: "50px",
                  textAlign: "center",
                  marginRight: "20px",
                }}>
                <TeamOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div>
                <h4 style={{ display: "block" }}>Total Patients</h4>
                <p style={{ display: "block", margin: "0" }}>23400</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card bordered={true}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  background: "red",
                  borderRadius: "100%",
                  width: "50px",
                  height: "50px",
                  lineHeight: "50px",
                  textAlign: "center",
                  marginRight: "20px",
                }}>
                <TeamOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div>
                <h4 style={{ display: "block" }}>Total Patients</h4>
                <p style={{ display: "block", margin: "0" }}>23400</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card bordered={true}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  background: "red",
                  borderRadius: "100%",
                  width: "50px",
                  height: "50px",
                  lineHeight: "50px",
                  textAlign: "center",
                  marginRight: "20px",
                }}>
                <TeamOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div>
                <h4
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "normal",
                  }}>
                  Total Patients
                </h4>
                <div
                  style={{
                    display: "block",
                    fontSize: "20px",
                    fontWeight: "bold",
                    margin: "0",
                  }}>
                  23400
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card bordered={true}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  background: "red",
                  borderRadius: "100%",
                  width: "50px",
                  height: "50px",
                  lineHeight: "50px",
                  textAlign: "center",
                  marginRight: "20px",
                }}>
                <TeamOutlined
                  style={{
                    color: "white",
                    fontSize: "20px",
                  }}
                />
              </div>
              <div>
                <h4 style={{ display: "block" }}>Total Patients</h4>
                <p style={{ display: "block", margin: "0" }}>23400</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <DemoRadialBar />
      <DemosRadialBar />
      <DemoColumn />
    </div>
  );
};

export default AdminDashboard;
