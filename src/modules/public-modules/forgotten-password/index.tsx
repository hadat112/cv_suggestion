import { Divider } from 'antd';
import { useState } from 'react';
import ForgotStep1 from './components/ForgotStep1';
import ForgotStep2 from './components/ForgotStep2';
import ForgotStep3 from './components/ForgotStep3';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [identity, setIdentity] = useState<string>('');

  return (
    <>
      <h1 className="text-2xl leading-8 font-bold mb-0 text-center">Quên mật khẩu</h1>
      {step === 1 && <ForgotStep1 setStep={setStep} setIdentity={setIdentity} />}
      {step === 2 && <ForgotStep2 setStep={setStep} identity={identity} />}
      {step === 3 && <ForgotStep3 />}
    </>
  );
};

export default ForgotPassword;
