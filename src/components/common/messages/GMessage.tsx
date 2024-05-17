import { CloseIcon } from '@/components/icons';
import { message } from 'antd';

interface IProps {
  key?: string;
  msg?: string | string[];
}

const GMessage = ({ key, msg }: IProps) => {
  const messageContent = Array.isArray(msg) ? (
    <div>
      {msg?.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  ) : (
    msg
  );

  return (
    <div className="flex items-center gap-x-[8px]">
      <div>{messageContent}</div>
      <CloseIcon
        className="text-xl hover:cursor-pointer bg-gray-300 rounded-[50%] text-white"
        onClick={() => {
          message.destroy(key);
        }}
      />
    </div>
  );
};

const DEFAULT_MESSAGE_DURATION = 3;
message.config({
  duration: DEFAULT_MESSAGE_DURATION,
  maxCount: 5, // Tối đa hiện 5 message
});

export const showMessage = {
  success: (msg, msgKey = null) => {
    const key = msgKey ?? msg;
    message.success({ key, content: GMessage({ key, msg }), className: 'message-custom' });
  },
  info: (msg, msgKey = null) => {
    const key = msgKey ?? msg;
    message.info({ key, content: GMessage({ msg }) });
  },
  warn: (msg, msgKey = null) => {
    const key = msgKey ?? msg;
    message.warning({
      key,
      content: GMessage({
        key,
        msg,
      }),
      className: 'message-custom',
    });
  },
  error: (msg, msgKey = null) => {
    const key = msgKey ?? msg;
    message.error({ key, content: GMessage({ key, msg }), className: 'message-custom' });
  },
  loading: (msg, msgKey = null) => {
    const key = msgKey ?? msg;
    message.loading({ key, content: GMessage({ key, msg }), className: 'message-custom' });
  },
};
