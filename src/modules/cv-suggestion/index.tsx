import { Send } from '@/components/icons';
import { Avatar, Image, Input } from 'antd';
import React, { useState } from 'react';
import MessagesList from './components/MessagesList';

const CvSuggestion = () => {
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState('');

  const handleSend = () => {
    if (!search?.length) return;

    setFetching(true);
    setSearch('');
    setTimeout(() => {
      setFetching(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center w-full flex-1 overflow-auto">
      <div className="flex items-center h-15 border-0 border-b border-solid border-th-border w-full p-4">
        <h2 className="text-xl m-0">CV SEARCH</h2>
      </div>
      <div className="flex flex-col items-center w-full flex-1 overflow-auto">
        <MessagesList />
      </div>
      {fetching && (
        <div className="flex items-center justify-start mb-2 ml-6 mr-auto relative filter-[alpha(opacity=100)]">
          <Avatar className="border border-solid border-th-border" src="/TA.png" size={26} />
          <Image preview={false} className="ml-2 mt-2" src="/dots.gif" alt="Dot" width={40} />
        </div>
      )}
      <div className="border-0 border-t border-solid border-th-border p-3 w-full">
        <div className="w-full flex items-center justify-center relative">
          <Input.TextArea
            className="w-full max-h-[240px] overflow-auto pr-8"
            placeholder="Nhập mô tả công việc cần tuyển dụng!"
            autoSize={true}
            autoFocus={true}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={`absolute bottom-[7px] right-2 bg-transparent border-none flex items-center justify-center
             text-2xl cursor-pointer focus-visible:outline-none ${search?.length ? 'text-th-primary ' : ''}`}
            onClick={handleSend}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CvSuggestion;
