import { showMessage } from '@/components/common/messages/GMessage';
import { APIResponse } from '@/interfaces';
import { Form, Input, Button } from 'antd';
import React, { useCallback } from 'react';
import { loginValidator } from '../../validation/login';
import LoginInput from '../../components/LoginInput';
import LoginBtn from '../../components/LoginBtn';

const ForgotStep1 = ({ setStep, setIdentity }) => {
  const [form] = Form.useForm();
  const identity = Form.useWatch('identity', form);

  const showErr = useCallback(
    (text) => {
      form.setFields([
        {
          name: 'identity',
          errors: [text],
        },
      ]);
    },
    [form]
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
    [setIdentity, setStep, showErr]
  );

  return (
    <Form
      className="flex flex-col items-center w-full gap-y-6 px-12 mt-6"
      form={form}
      onFinish={handleContinue}
    >
      <div className="text-center">Nhập số điện thoại hoặc emai của bạn để tiếp tục.</div>
      <Form.Item className="w-full m-0" name="identity" rules={[loginValidator]}>
        <LoginInput placeholder="Số điện thoại hoặc email" />
      </Form.Item>
      <Form.Item className="w-full m-0">
        <LoginBtn text="Tiếp tục" />
      </Form.Item>
    </Form>
  );
};

export default ForgotStep1;
