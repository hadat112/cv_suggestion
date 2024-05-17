import { Form } from 'antd';
import React, { useCallback } from 'react';
import LoginBtn from '../../components/LoginBtn';
import LoginInput from '../../components/LoginInput';
import { loginValidator } from '../../validation/login';

const ForgotStep1 = ({ setStep, setIdentity }) => {
  const [form] = Form.useForm();

  const _showErr = useCallback(
    (text) => {
      form.setFields([
        {
          name: 'identity',
          errors: [text],
        },
      ]);
    },
    [form],
  );

  const handleContinue = useCallback(
    async (values) => {
      // const { error, data }: APIResponse = await { error: '' };

      // if (error) return showMessage.error(error);
      // if (!data) {
      //   return showErr('Số điện thoại/email chưa đăng ký');
      // }

      setIdentity(values?.identity);
      setStep((state) => state + 1);
    },
    [setIdentity, setStep],
  );

  return (
    <Form className="flex flex-col items-center w-full gap-y-6 px-12" form={form} onFinish={handleContinue}>
      <div className="text-center">Please enter your username.</div>
      <Form.Item className="w-full m-0" name="identity" rules={[loginValidator]}>
        <LoginInput placeholder="name@company.com" />
      </Form.Item>
      <Form.Item className="w-full m-0">
        <LoginBtn text="Tiếp tục" />
      </Form.Item>
    </Form>
  );
};

export default ForgotStep1;
