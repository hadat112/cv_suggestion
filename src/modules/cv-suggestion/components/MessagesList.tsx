import { messages } from 'mockup';
import Message from './Message';
import { memo } from 'react';

const MessagesList = () => {
  const listMessages = messages.data;

  return (
    <div className="flex h-full flex-1 flex-col-reverse gap-1 p-4 overflow-y-auto w-full">
      {listMessages?.map((message, index) => (
        <Message key={message?.id} message={message} nextMessage={listMessages[index + 1]} />
      ))}
    </div>
  );
};

export default memo(MessagesList);
