import { useAuthStore } from '@/stores/auth';
import { Checkbox, Form } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginBtn from '../components/LoginBtn';
import LoginInput from '../components/LoginInput';
import LoginPasswordInput from '../components/LoginPasswordInput';
import { loginValidator } from '../validation/login';

const LoginCard = () => {
  const router = useRouter();
  const authenticate = useAuthStore((state) => state.authenticate);
  const [form] = Form.useForm();

  useEffect(() => {
    const identity = localStorage.getItem('identity');
    const remember = localStorage.getItem('isRemembered') === 'true';
    form.setFieldsValue({ identity, remember });
  }, [form]);

  // const showErr = (field, text) => {
  //   form.setFields([
  //     {
  //       name: field,
  //       errors: [text],
  //     },
  //   ]);
  // };

  const handleLogin = async (allValues) => {
    // const { error, data }: APIResponse = await { data: { access_token: 'fadsf' } };

    // if (error) return showErr('password', error);
    // if (!data?.access_token) return showMessage.error('Login fail');

    allValues.remember
      ? localStorage.setItem('userID', allValues.identity)
      : localStorage.removeItem('userID');

    // localStorage.setItem('token', data?.access_token);
    authenticate(true);
    router.push('/');
  };

  return (
    <>
      <h1 className="text-2xl leading-8 font-semibold text-center mb-6">Sign in to your account</h1>
      <Form
        form={form}
        layout="vertical"
        className="login flex flex-col items-center w-full mt-8 text-sm"
        onFinish={handleLogin}
      >
        <Form.Item className="w-full m-0" name="identity" label="Your email" rules={[loginValidator]}>
          <LoginInput placeholder="name@company.com" />
        </Form.Item>
        <Form.Item label="Password" className="w-full mt-8 mb-0" name="password" rules={[loginValidator]}>
          <LoginPasswordInput />
        </Form.Item>
        <div className="flex items-center justify-between w-full mt-2 gap-4">
          <div className="flex items-center justify-center flex-shrink-0 gap-2">
            <Form.Item name="remember" valuePropName="checked" className="mb-0">
              <Checkbox />
            </Form.Item>
            Remember me
          </div>
          <Link className="rounded-lg inline-block text-th-primary" type="text" href="/forgotten-password">
            Forgot password?
          </Link>
        </div>
        <Form.Item className="w-full m-0 mt-6">
          <LoginBtn text="Log in to your account" />
        </Form.Item>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-6">
          Don’t have an account yet?{' '}
          <Link href="/register" className="font-medium text-th-primary hover:underline">
            Sign up
          </Link>
        </p>
      </Form>
    </>
  );
};

export default LoginCard;
