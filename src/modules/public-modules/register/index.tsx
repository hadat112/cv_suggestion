import { useAuthStore } from '@/stores/auth';
import { Form } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoginBtn from '../components/LoginBtn';
import LoginInput from '../components/LoginInput';
import LoginPasswordInput from '../components/LoginPasswordInput';
import { registerValidator } from '../validation/login';

const RegisterCard = () => {
  const router = useRouter();
  const authenticate = useAuthStore((state) => state.authenticate);
  const [form] = Form.useForm();

  const _showErr = (field, text) => {
    form.setFields([
      {
        name: field,
        errors: [text],
      },
    ]);
  };

  const handleRegister = async () => {
    // const { error, data }: APIResponse = await { data: { access_token: 'fadsf' } };
    // if (error) return showErr('password', error);
    // if (!data?.access_token) return showMessage.error('Login fail');

    // localStorage.setItem('token', data?.access_token);
    authenticate(true);
    router.push('/');
  };

  return (
    <>
      <h1 className="text-2xl leading-8 font-semibold text-center mb-6">Create your Free Account</h1>
      <Form
        form={form}
        layout="vertical"
        className="login flex flex-col items-center w-full mt-8 text-sm"
        onFinish={handleRegister}
      >
        <Form.Item className="w-full m-0" name="identity" label="Your email" rules={[registerValidator]}>
          <LoginInput placeholder="name@company.com" />
        </Form.Item>
        <Form.Item label="Password" className="w-full mt-8 mb-0" name="password" rules={[registerValidator]}>
          <LoginPasswordInput />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          className="w-full mt-8 mb-0"
          name="confirm_password"
          rules={[registerValidator]}
        >
          <LoginPasswordInput />
        </Form.Item>
        <Form.Item className="w-full m-0 mt-6">
          <LoginBtn text="Create an account" />
        </Form.Item>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?
          <Link href="/login" className="font-medium text-th-primary hover:underline">
            Sign in
          </Link>
        </p>
      </Form>
    </>
  );
};

export default RegisterCard;
