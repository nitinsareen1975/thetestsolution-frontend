import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { RadialBar, Column } from "@ant-design/plots";
import { Card, Row, Col, Table, Space, Button, Tooltip } from "antd";
import { TeamOutlined, EyeOutlined, CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
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
  const AppointmentColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <div>{text}</div>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      key: 'time',
      dataIndex: 'time',     
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
            <Tooltip title="View">
              <Button onClick={() => this.props.history.push("#")} >
                <EyeOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Accept">
              <Button onClick={() => this.props.history.push("#")} >
              <CheckCircleOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Decline">
              <Button onClick={() => this.props.history.push("#")} >
              <CloseCircleOutlined />
              </Button>
            </Tooltip>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      gender: 'Male',
      date: '2022-02-11',
      time: '09:00 PM',
    },
    {
      key: '2',
      name: 'John Brown',
      gender: 'Female',
      date: '2022-02-11',
      time: '09:00 PM',
    },
    {
      key: '3',
      name: 'John Brown',
      gender: 'Male',
      date: '2022-02-11',
      time: '09:00 PM',
    },
  ];
  return (
    <div>
      <h1>Welcome to dashboard</h1>
      <Row gutter={24} style={{marginBottom: "24px",}}>
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
      </Row>
      <Row gutter={24}  style={{marginBottom: "24px",}}>
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
      </Row>
      <Row gutter={24}   style={{marginBottom: "24px",}}>
        <Col xs={16} sm={16}>
          <Card bordered={true}>
            <DemoColumn />
          </Card>
        </Col>
        <Col xs={8} sm={8}>
          <Card title="Total Test" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
      <Row gutter={24}   style={{marginBottom: "24px",}}>
        <Col xs={24} sm={24}>
          <Card className="appointment-table" title="Appointment" bordered={false}>
            <Table columns={AppointmentColumns} dataSource={data} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
