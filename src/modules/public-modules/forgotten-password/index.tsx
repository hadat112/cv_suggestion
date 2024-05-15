import { useState } from 'react';
import ForgotStep1 from './components/ForgotStep1';
import ForgotStep3 from './components/ForgotStep3';
import Link from 'next/link';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [identity, setIdentity] = useState<string>('');

  return (
    <>
      <h1 className="text-2xl leading-8 font-semibold text-center mb-6">Forgotten password</h1>
      {step === 1 && <ForgotStep1 setStep={setStep} setIdentity={setIdentity} />}
      {step === 2 && <ForgotStep3 identity={identity} />}
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-th-primary hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default ForgotPassword;
