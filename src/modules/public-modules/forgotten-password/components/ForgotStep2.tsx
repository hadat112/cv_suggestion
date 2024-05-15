import { APIResponse } from '@/interfaces';
import { Form, Button } from 'antd';
// import InputOTP from '@/UI/input-otp';
import React, { useCallback, useEffect, useMemo } from 'react';
import { isEmail, isPhoneNumber } from '../../utils/function';
import Timer from './Timer';

const ForgotStep2 = ({ setStep, identity }) => {
  const [form] = Form.useForm();
  const isEmailIdentity = useMemo(() => isEmail(identity), [identity]);
  const isPhoneNumberIdentity = useMemo(() => isPhoneNumber(identity), [identity]);
  const otp = Form.useWatch('otp', form);

  const handleContinue = async (values) => {
    const { otp } = values;
    if (!otp || otp.includes(undefined) || otp.includes('') || otp?.length < 6) {
      return form.setFields([
        {
          name: 'otp',
          errors: ['Mã xác thực không đúng'],
        },
      ]);
    }

    // const { error, data }: APIResponse = await { error: '' };

    // if (error)
    //   return form.setFields([
    //     {
    //       name: 'otp',
    //       errors: [error],
    //     },
    //   ]);

    // if (data?.access_token) {
    //   localStorage.setItem('token', data?.access_token);
    //   setStep((state) => state + 1);
    // }
  };

  const sendOtpToUser = useCallback(async () => {
    // let res: APIResponse;
    // if (isEmailIdentity) res = await { error: '' };
    // if (isPhoneNumberIdentity) res = await { error: '' };
    // if (!res || res?.error)
    //   return form.setFields([
    //     {
    //       name: 'otp',
    //       errors: [res?.error],
    //     },
    //   ]);
  }, [form, identity, isEmailIdentity, isPhoneNumberIdentity]);

  const handleSendOtp = useCallback(() => {
    form.resetFields();
    sendOtpToUser();
  }, [form, sendOtpToUser]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <Form form={form} className="flex flex-col items-center w-full gap-y-6 px-12" onFinish={handleContinue}>
      <Form.Item className="w-full center-error-message" name="otp">
        {/* <InputOTP autoFocus inputType="numeric" /> */}
      </Form.Item>
      <div className="text-center text-th-grey-500">
        Vui lòng điền mã xác thực đã gửi về {isEmailIdentity ? 'email' : 'số điện thoại'}:{' '}
        <div className="font-medium text-th-primary">{identity}</div>
        <Timer handleSendOtp={handleSendOtp} />
      </div>
      <Form.Item className="w-full mb-0 mt-6">
        <Button
          htmlType="submit"
          type="primary"
          className="rounded-full w-full h-12"
          disabled={!otp?.length || otp?.length < 6}
        >
          Tiếp tục
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotStep2;
