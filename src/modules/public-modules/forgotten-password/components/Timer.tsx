import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { OTP_TIME } from '../../constants';

const Timer = ({ handleSendOtp }) => {
  const [time, setTime] = useState<number>(OTP_TIME);

  const tryAgainSend = () => {
    handleSendOtp();
    setTime(OTP_TIME);
  };

  useEffect(() => {
    handleSendOtp();
    const timerID: ReturnType<typeof setInterval> = setInterval(
      () =>
        setTime((state) => {
          if (state > 0) return state - 1;
        }),
      1000
    );
    return () => {
      clearInterval(timerID);
    };
  }, [handleSendOtp]);

  return (
    <div className="text-primary">
      {time > 0 ? (
        time
      ) : (
        <Button size="small" className="!rounded-full !px-4" type="text" onClick={tryAgainSend}>
          Thử lại
        </Button>
      )}
    </div>
  );
};

export default React.memo(Timer);
