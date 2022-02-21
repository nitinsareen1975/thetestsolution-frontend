import React from "react";
import { PageHeader, Button, Descriptions, Row, Col } from 'antd';
const output = (props) => {
    return <Row type="flex" justify="center" align="middle" style={{ maxWidth: 768 }}>
        <Col>
            <PageHeader
                ghost={false}
                title="Patient Report"
                subTitle=""
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                    <Descriptions.Item label="Association">
                        <a>421421</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
                    <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
                    <Descriptions.Item label="Remarks">
                        Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <PageHeader>
            <Descriptions title="User Info">
                <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
            </Descriptions>
            </PageHeader>
        </Col>
    </Row>;
}
export default output;