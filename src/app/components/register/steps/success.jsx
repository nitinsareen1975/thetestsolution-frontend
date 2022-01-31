import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
const output = () => {
    return <div>
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
            <Input />
        </Form.Item>
        <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label="Website">
            <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="Introduction">
            <Input.TextArea />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Next
            </Button>
        </Form.Item>
    </div>
}
export default output;