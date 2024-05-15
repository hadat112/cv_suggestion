import { Form } from 'antd';
import { useCallback, useState } from 'react';
import { forgottenPasswordValidator } from '../../validation/login';
import { useAuthStore } from '@/stores/auth';
import { passwordRecommendMsg } from '../../constants';
import LoginPasswordInput from '../../components/LoginPasswordInput';
import LoginBtn from '../../components/LoginBtn';

const ForgotStep3 = ({ identity }) => {
  const [showExtra, setShowExtra] = useState({
    password: false,
  });
  const [form] = Form.useForm();
  const authenticate = useAuthStore((state) => state.authenticate);

  const handleFinishUpdate = useCallback(async () => {
    // const { error }: APIResponse = await { error: '' };
    // if (error) return showMessage.error(error);

    authenticate(true);
    window.location.href = '/';
  }, [authenticate]);

  const handleExtra = (show) => {
    setShowExtra((state) => ({ ...state, password: show }));
  };

  return (
    <Form
      className="flex flex-col items-center w-full gap-y-6 px-12 login"
      onFinish={handleFinishUpdate}
      form={form}
    >
      <Form.Item
        extra={showExtra.password && passwordRecommendMsg}
        className="w-full mb-0"
        name="password"
        rules={[forgottenPasswordValidator]}
      >
        <LoginPasswordInput
          autoFocus
          onFocus={() => handleExtra(true)}
          onBlur={() => handleExtra(false)}
          placeholder="Enter your password!"
        />
      </Form.Item>
      <Form.Item
        className="w-full"
        name="confirm_password"
        dependencies={['password']}
        rules={[forgottenPasswordValidator]}
      >
        <LoginPasswordInput placeholder="Re-enter your password!" />
      </Form.Item>
      <Form.Item className="w-full m-0">
        <LoginBtn text="Cập nhật" />
      </Form.Item>
    </Form>
  );
};

export default ForgotStep3;
