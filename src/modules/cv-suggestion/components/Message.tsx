import cn from 'classnames';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const PERIOD_MESSAGE = 3;
const PERIOD_AVATAR = 1;

export const showTimeAndAvatar = (time: string, prevTime: string, hours: number) => {
  return dayjs(time).diff(dayjs(prevTime), 'hour') > hours;
};

export const getFormatTimeMessage = (time: string) => {
  const dateMessage = dayjs(time).date();
  const hour = dayjs(time).format('HH:mm');
  const today = new Date();
  if (dateMessage === today.getDate()) {
    return `Hôm nay, ${hour}`;
  }

  if (today.getDate() - dateMessage === 1) {
    return `Hôm qua, ${hour}`;
  }

  return dayjs(time).format('DD/MM/YYYY, HH:mm');
};

const Message = ({ message, nextMessage }) => {
  const isCurrentUser = message?.sender?.user_type === 'user';
  const isMessageSameUser = message?.sender?.id === nextMessage?.sender?.id;
  const isShowTimeMessage = showTimeAndAvatar(message?.created_at, nextMessage?.created_at, PERIOD_MESSAGE);

  const isShowAvatar = showTimeAndAvatar(message?.created_at, nextMessage?.created_at, PERIOD_AVATAR);
  return (
    <div>
      {isShowTimeMessage && (
        <div className="text-center text-sm text-th-grey-300">
          {getFormatTimeMessage(message?.created_at)}
        </div>
      )}
      <div
        className={cn('flex gap-2', {
          'justify-end': isCurrentUser,
          'mt-4': !isMessageSameUser,
        })}
      >
        <div
          className={cn({
            invisible: isMessageSameUser && !isShowAvatar,
          })}
        >
          {!isCurrentUser && (
            <Avatar
              className="border border-solid border-th-border"
              src={<img src="/fallback.png" alt="avatar" />}
            />
          )}
        </div>
        <div
          className={cn('flex flex-col text-base max-w-2xl mx-2', {
            'order-1 items-end': isCurrentUser,
            'order-2 items-start': !isCurrentUser,
          })}
        >
          {!isMessageSameUser && !isCurrentUser && (
            <div className="text-sm text-th-grey-400 mb-1">{message?.sender?.username}</div>
          )}
          {message?.text && (
            <div
              className={cn(
                'px-4 py-1 rounded-xl inline-block break-words border border-solid border-th-border',
                {
                  'bg-th-primary text-white': isCurrentUser,
                  'bg-th-background-1': !isCurrentUser,
                }
              )}
            >
              {message?.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
