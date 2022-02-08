import React from "react";
import IntlMessages from "../../../../services/intlMesseges";
import { Form, Button, Checkbox } from "antd";
const output = ({ ...props }) => {
    return <Form onFinish={(values) => props.next(values)} initialValues={props.data}>
        <Form.Item>
            <div className="waiver-text">
                <h2 className="form-section-title">Waiver</h2>
                <div className="divWaiver" style={{ color: 'red' }}>
                    <p>Please carefully read and sign the following Informed Consent:</p>
                    <p style={{ marginleft: 40 + 'px' }}>A)	I authorize this COVID-19 testing unit to conduct collection and testing for COVID-19 through a nasopharyngeal swab or oral swab, as a requirement of testing by an authorized medical provider and lab.</p>
                    <p style={{ marginleft: 40 + 'px' }}>B)	I authorize my test results to be disclosed to the county, state, or to any other governmental entity as required by law. This authorization is valid for one (1) year from the date this authorization is signed.</p>
                    <p style={{ marginleft: 40 + 'px' }}>C)	I acknowledge that a positive test result is an indication that I must self-isolate and/or wear a mask or face covering as directed to avoid infecting others.</p>
                    <p style={{ marginleft: 40 + 'px' }}>D)	I understand that “TheTestSolution,” or our partner service providers are not acting as my medical provider, this testing does not replace treatment by my medical provider, and I assume complete and full responsibility to take appropriate action with regards to my test results. I agree I will seek medical advice, care, and treatment from my medical provider if I have questions or concerns, or if I receive a positive result and my condition worsens.</p>
                    <p style={{ marginleft: 40 + 'px' }}>E)	I understand that, as with any medical test, there is a possibility of a false positive or false negative COVID-19 test result.</p>
                    <p style={{ marginleft: 40 + 'px' }}>F)	Customer understands and acknowledges that there shall be no cancellations and/or refunds given once they are checked in at one of our “TheTestSolution” service provider labs and testing is performed.</p>
                    <p>I, the undersigned, understand the test purpose, procedures, possible benefits, and risks, and I understand that I will receive a copy of this Informed Consent over email along with my registration confirmation. I understand that I can ask questions at any time while at the lab. I voluntarily agree to this testing for COVID-19 and fully understand that payment for this service is final once I have checked-in for service at one of our “TheTestSolution” service provider labs and testing is performed.</p>
                </div>
            </div>
        </Form.Item>
        <Form.Item name='agreed' valuePropName="checked" rules={[{ required: true, message: <IntlMessages id="admin.input.required" /> }]}>
            <Checkbox>Agreed</Checkbox>
        </Form.Item>
        <div className="steps-action">
            <Button type="primary" htmlType="submit">
                Next
            </Button>
        </div>
    </Form>
}
export default output;