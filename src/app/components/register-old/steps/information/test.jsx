import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Radio, Row, Button } from "antd";
import IntlMessages from "../../../../services/intlMesseges";
import TestsAPI from "../../../../redux/api/tests-api";
const output = ({ ...props }) => {
    const [tests, setTests] = useState([]);
    useEffect(async() => {
        var args = {
            filters: {},
            pagination: {},
            sorter: {column: "name", order: "asc"}
        }
        await TestsAPI.getGlobalTestTypes(args).then(resp => {
            if(resp.status && resp.status === true){
                setTests(resp.data);
            }
        });
    },[]);
    return <Form layout="vertical" onFinish={(values) => props.next(values)} initialValues={props.data}>
        <h2 className="form-section-title">Test</h2>
        <Row gutter={15}>           
            <Col xs={24}> 
                <Form.Item name="test_type" label="Select Test" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
                    <Radio.Group>
                        {tests.map(test => {
                            return <Radio key={test.id} value={test.id}>{test.name}</Radio>
                        })}
                    </Radio.Group>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <div className="steps-action">
                <Button  onClick={props.prev}>
                    Previous
                </Button>
                <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">
                    Next
                </Button>
            </div>
        </Row>
    </Form>
}
export default output;