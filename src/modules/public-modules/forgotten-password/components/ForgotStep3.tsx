import { Button, Form, Input } from 'antd';
import { useCallback, useState } from 'react';
import { forgottenPasswordValidator } from '../../validation/login';
import { showMessage } from '@/components/common/messages/GMessage';
import { APIResponse } from '@/interfaces';
import { useAuthStore } from '@/stores/auth';
import { passwordRecommendMsg } from '../../constants';

const ForgotStep3 = () => {
  const [showExtra, setShowExtra] = useState({
    password: false,
  });
  const [form] = Form.useForm();
  const password = Form.useWatch('password', form);
  const confirm_password = Form.useWatch('confirm_password', form);
  const authenticate = useAuthStore((state) => state.authenticate);

  const handleFinishUpdate = useCallback(
    async (allValues) => {
      // const { error }: APIResponse = await { error: '' };
      // if (error) return showMessage.error(error);

      authenticate(true);
      window.location.href = '/';
    },
    [authenticate]
  );

  return (
    <Form
      className="flex flex-col items-center w-full gap-y-6 px-12"
      onFinish={handleFinishUpdate}
      form={form}
    >
      <Form.Item
        extra={showExtra.password && passwordRecommendMsg}
        className="w-full mb-0"
        name="password"
        rules={[forgottenPasswordValidator]}
      >
        <Input.Password
          autoFocus
          onFocus={() => {
            setShowExtra((state) => ({ ...state, password: true }));
          }}
          onBlur={() => {
            setShowExtra((state) => ({ ...state, password: false }));
          }}
          className="rounded-full h-12 px-4 py-3 border-th-border placeholder:text-th-text-secondary password-input"
          placeholder="Nhập mật khẩu mới"
        />
      </Form.Item>
      <Form.Item
        className="w-full"
        name="confirm_password"
        dependencies={['password']}
        rules={[forgottenPasswordValidator]}
      >
        <Input.Password
          className="rounded-full h-12 px-4 py-3 border-th-border placeholder:text-th-text-secondary password-input"
          placeholder="Nhập lại mật khẩu mới"
        />
      </Form.Item>
      <Form.Item className="w-full m-0">
        <Button
          htmlType="submit"
          type="primary"
          className="rounded-full w-full h-12"
          disabled={!password || !confirm_password}
        >
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotStep3;
