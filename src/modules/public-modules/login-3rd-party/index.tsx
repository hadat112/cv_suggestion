import { Button, Divider, Form, Input } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { APIResponse } from '@/interfaces';
import { registerValidator } from '../validation/login';
import { OTP_TIME } from '../constants';
import { isPhoneNumber } from '../utils/function';

const Login3rdParty = () => {
  const [form] = Form.useForm();
  const phone = Form.useWatch('phone', form);
  const router = useRouter();
  const state = useMemo(() => router?.query?.state, [router]);
  const [hasOtp, setHasOtp] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [time, setTime] = useState<number>(OTP_TIME);

  useEffect(() => {
    if (state === 'facebook') setHasOtp(true);
  }, [state]);

  useEffect(() => {
    let timerID: ReturnType<typeof setInterval>;
    if (showOtp) timerID = setInterval(() => setTime((state) => state - 1), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, [showOtp]);

  const handleContinue = async (values) => {
    // if (!hasOtp || showOtp) {
    //   window.location.href = `/api/auth/callback${toQueryParams({
    //     otp: values.otp,
    //     phone: values.phone,
    //     state,
    //   })}`;
    //   return;
    // }

    handleSendOtp();
  };

  const tryAgainSend = async () => {
    const isPhoneNumberIdentity = isPhoneNumber(phone);
    if (!isPhoneNumberIdentity) return;

    // const res: APIResponse = await sendOtp({ phone_number: phone });
    // if (!res || res?.error) return showMessage.error(res?.error);

    setTime(OTP_TIME);
  };

  const sendOtpToUser = useCallback(async () => {
    //     const { error }: APIResponse = await sendOtp({ phone_number: phone });
    // //
    //     if (error)
    //       return form.setFields([
    //         {
    //           name: 'otp',
    //           errors: [error],
    //         },
    //       ]);
    setShowOtp(true);
  }, [form, phone]);

  const handleSendOtp = useCallback(() => {
    sendOtpToUser();
  }, [sendOtpToUser]);

  return (
    <>
      <h1 className="text-3xl font-medium mb-0">Xác nhận số điện thoại</h1>
      <p className="w-full px-12 mt-8 text-center">Vui lòng cài đặt thêm số điện thoại để đăng nhập</p>
      <div className="w-full px-12">
        <Divider className="bg-th-border my-8" />
      </div>
      <Form className="flex flex-col items-center w-full gap-y-6 px-12" form={form} onFinish={handleContinue}>
        <Form.Item className="w-full mb-0" name="phone" rules={[registerValidator]}>
          <Input
            className="rounded-full h-12 px-4 py-3 border-th-border placeholder:text-th-text-secondary identity-input"
            placeholder="Số điện thoại"
            autoFocus
            disabled={showOtp}
          />
        </Form.Item>
        {hasOtp && showOtp && (
          <div className="w-full flex flex-col items-end">
            <Form.Item className="w-full mb-2" name="otp" rules={[registerValidator]}>
              <Input
                className="rounded-full h-12 loginmd:h-10 px-4 py-3 border-border placeholder:text-text-secondary username-input"
                placeholder="Nhập mã OTP"
              />
            </Form.Item>
            {time > 0 && <span className="px-4">{time}</span>}
            {time <= 0 && (
              <Button size="small" className="!rounded-full !px-4" type="text" onClick={tryAgainSend}>
                Thử lại
              </Button>
            )}
          </div>
        )}

        <Form.Item className="w-full m-0">
          <Button htmlType="submit" type="primary" className="rounded-full w-full h-12" disabled={!phone}>
            {!hasOtp || showOtp ? 'Xác nhận' : 'Lấy mã OTP'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login3rdParty;
