import { Avatar } from 'antd';
import cn from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import CvDownloadBtn from './CvDownloadBtn';

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

  const onDownload = () => {
    const pdfUrl = 'fallback.png';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'document.png'; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {isShowTimeMessage && (
        <div className="text-center text-sm text-th-grey-300">
          {getFormatTimeMessage(message?.created_at)}
        </div>
      )}
      <div
        className={cn('flex gap-1 w-full items-stretch', {
          'justify-end': isCurrentUser,
          'mt-4': !isMessageSameUser,
        })}
      >
        <div
          className={cn('flex items-end', {
            invisible: isMessageSameUser && !isShowAvatar,
          })}
        >
          {!isCurrentUser && (
            <Avatar
              className="border border-solid border-th-border"
              src={<img src="/TA.png" alt="avatar" />}
            />
          )}
        </div>
        <div
          className={cn('flex flex-col justify-center text-base max-w-[80%] mx-2 flex-1 msg', {
            'order-1 items-end': isCurrentUser,
            'order-2 items-start': !isCurrentUser,
          })}
        >
          {/* {!isMessageSameUser && !isCurrentUser && (
            <div className="text-sm text-th-grey-400 mb-1 username">{message?.sender?.username}</div>
          )} */}
          {message?.msg_type === 'text' && (
            <div
              className={cn(
                'px-4 py-1 rounded-xl inline-block break-words border border-solid border-th-border',
                {
                  'bg-th-primary text-white': isCurrentUser,
                  'bg-th-background-1': !isCurrentUser,
                },
              )}
            >
              {message?.text}
            </div>
          )}
          {message?.msg_type === 'cv' && (
            <div className="flex flex-col gap-y-2">
              {message.list_cv.map((cv) => (
                <CvDownloadBtn key={cv.id} onClick={onDownload} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
