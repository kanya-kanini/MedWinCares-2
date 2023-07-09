import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { Carousel, Row, Col, Card, Divider, Menu } from 'antd';



const Navbar = () => {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item className="navbar-hospital">
        <a href="/"className="nav-link">MEDWIN CARES</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/"className="nav-link">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/patientreg"className="nav-link">Patient Registration</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/patients"className="nav-link">Doctors</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/appointments"className="nav-link">Appointments</a>
      </Menu.Item>
    </Menu>
  );
};
const PatientRegistration = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('https://localhost:7010/api/Patient', values);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    form.resetFields();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name={['patient', 'patient_Name']}
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Age"
            name={['patient', 'age']}
            rules={[{ required: true, message: 'Please enter the age' }]}
          >
            <Input type="number" placeholder="Age" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name={['patient', 'gender']}
            rules={[{ required: true, message: 'Please enter the gender' }]}
          >
            <Input placeholder="Gender" />
          </Form.Item>

          <Form.Item
            label="Blood Group"
            name={['patient', 'bloodGroup']}
            rules={[{ required: true, message: 'Please enter the blood group' }]}
          >
            <Input placeholder="Blood Group" />
          </Form.Item>

          <Form.Item
            label="Address"
            name={['patient', 'patient_Address']}
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name={['patient', 'patient_Phone']}
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input type="number" placeholder="Phone" />
          </Form.Item>

          <Form.Item
            label="Email"
            name={['patient', 'patient_Email']}
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Username"
            name={['patient', 'patient_UserName']}
            rules={[{ required: true, message: 'Please enter the username' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .ant-form-item-label {
          text-align: left;
          margin-bottom: 6px;
        }

        .ant-input {
          width: 100%;
        }

        .ant-btn {
          width: 100%;
        }
      `}</style>
    </>
  );
};


export default PatientRegistration;