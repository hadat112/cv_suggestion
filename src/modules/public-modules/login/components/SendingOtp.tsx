import { Button } from 'antd';
import { useState, useEffect } from 'react';
import { isPhoneNumber } from '../../utils/function';
import { OTP_TIME } from '../../constants';

const SendingOtp = ({ identity }) => {
  const [type, setType] = useState<'firstTime' | 'tryAgain'>('firstTime');
  const [time, setTime] = useState<number>(OTP_TIME);

  const tryAgainSend = async () => {
    const isPhoneNumberIdentity = isPhoneNumber(identity);
    if (!isPhoneNumberIdentity) return;

    setType('tryAgain');
    setTime(OTP_TIME);
  };

  useEffect(() => {
    const timerID: ReturnType<typeof setInterval> = setInterval(() => setTime((state) => state - 1), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    setType('firstTime');
  }, [identity]);

  return (
    <div className="text-th-primary">
      {type === 'firstTime' && (
        <Button size="small" className="!rounded-full !px-4" type="text" onClick={tryAgainSend}>
          Gửi OTP
        </Button>
      )}
      {time > 0 && type !== 'firstTime' && <span className="px-4">{time}</span>}
      {time <= 0 && type !== 'firstTime' && (
        <Button size="small" className="!rounded-full !px-4" type="text" onClick={tryAgainSend}>
          Thử lại
        </Button>
      )}
    </div>
  );
};

export default SendingOtp;
