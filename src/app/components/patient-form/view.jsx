import { Button, Col, Row, Table, Tooltip, Descriptions, List, Avatar, Typography } from "antd";
import React from "react";
import { FileProtectOutlined } from '@ant-design/icons';

const dataSource = [
  {
    key: '1',
    testname: 'SARS-CoV-2 RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Not Detected',
    testresult: 'Negative',
  },
  {
    key: '2',
    testname: 'RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Detected',
    testresult: 'Positive',
  },
  {
    key: '3',
    testname: 'SARS-CoV-2 RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Not Detected',
    testresult: 'Negative',
  },
  {
    key: '4',
    testname: 'RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Not Detected',
    testresult: 'Negative',
  },
  {
    key: '5',
    testname: 'SARS-CoV-2 RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Detected',
    testresult: 'Positive',
  },
  {
    key: '6',
    testname: 'RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Detected',
    testresult: 'Positive',
  },
  {
    key: '7',
    testname: 'SARS-CoV-2 RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Not Detected',
    testresult: 'Negative',
  },
  {
    key: '8',
    testname: 'RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Not Detected',
    testresult: 'Negative',
  },
  {
    key: '9',
    testname: 'SARS-CoV-2 RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Detected',
    testresult: 'Positive',
  },
  {
    key: '10',
    testname: 'SARS-CoV-2 RT PCR',
    testdate: '2022-02-26',
    remarks: 'Negative RNA specific to SARS-CoV-2 Detected',
    testresult: 'Positive',
  },
];

const columns = [
  {
    title: 'Type of Test',
    dataIndex: 'testname',
    key: 'testname',
  },
  {
    title: 'Test Date',
    dataIndex: 'testdate',
    key: 'testdate',
    
  },
  {
    title: 'Test result',
    dataIndex: 'testresult',
    key: 'testresult',
    
  },
  {
    title: 'Remarks',
    dataIndex: 'remarks',
    key: 'remarks',
  },
    {
      title: "Actions",
      rowKey: "action",
      width: 100,
      // width: "200px",
      render: (_text, record) => (
        <span>
          <Tooltip title="View Result">
            <Button
              onClick={() => this.props.history.push("#", {lab_assigned: record.id})}
            >
              <FileProtectOutlined />
            </Button>
          </Tooltip>
        </span>
      )
    }
];
const data = [
  {
    title: 'Patients Name',
  },
];
const AdminDashboard=()=>
{
  return<div className="profileDashboard" style={{ maxWidth: 980, margin: '0 auto' }}>
    <Row>
      <Col xs={24} sm={6}>
        <div className="sidebar">
        <List
          itemLayout="horizontal"
          dataSource={data}
          size="large"
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.title}</a>}
              />
            </List.Item>
          )}
        />
      <Descriptions title="Patients Info">
        <Descriptions.Item label="Full Name"  span={3}>Praveen Kumar</Descriptions.Item>
        <Descriptions.Item label="Sex"  span={3}>Male</Descriptions.Item>
        <Descriptions.Item label="Date Of Birthday"  span={3}>1992-04-24</Descriptions.Item>
        <Descriptions.Item label="Age"  span={3}>29</Descriptions.Item>
        <Descriptions.Item label="Pregnancy status"  span={3}> if applicable</Descriptions.Item>       
        
        <Descriptions.Item label="Phone Number"  span={3}>8054002663</Descriptions.Item>
        <Descriptions.Item label="Email ID"  span={3}>praveen@alphawebtech.com</Descriptions.Item>
        <Descriptions.Item label="Social Security Number"  span={3}> 123</Descriptions.Item>
        <Descriptions.Item label="Ethnicity"  span={3}>Ethnicity</Descriptions.Item>
        <Descriptions.Item label="Race"  span={3}>Race</Descriptions.Item>
        <Descriptions.Item label="Street Addresh" span={3}>25737 US Rt 11</Descriptions.Item>
        <Descriptions.Item label="City" span={3}>USA</Descriptions.Item>
        <Descriptions.Item label="State" span={3}>USA</Descriptions.Item>
        <Descriptions.Item label="Country" span={3}>USA</Descriptions.Item>
        <Descriptions.Item label="Zip Code" span={3}>13637</Descriptions.Item>
      </Descriptions>
        </div>
      </Col>
      <Col xs={24} sm={18}>
        <div className="testTable">
        <Typography.Title level={4}>Number of test</Typography.Title>
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 50 }} scroll={{ y: 650 }}  />
        </div>
      </Col>
    </Row>
  </div>;
}
 
export default AdminDashboard;