import React, { useState } from 'react';
import { Input, Spin } from 'antd';
import { Send } from '@/components/icons';
import CvDownloadBtn from './components/CvDownloadBtn';
import MessagesList from './components/MessagesList';

const CvSuggestion = () => {
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState('');
  const handleSend = () => {
    setFetching(true);

    setTimeout(() => {
      setFetching(false);
    }, 1000);
  };

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
    <div className="flex flex-col items-center w-full flex-1 overflow-auto">
      <div className="h-14 border-0 border-b border-solid border-th-grey-200 grid items-center grid-cols-2 grid-rows-1 w-full p-4">
        Search
      </div>
      <div className="flex flex-col items-center w-full flex-1 overflow-auto">
        {!fetching ? (
          <MessagesList />
        ) : (
          <div className="min-h-[500px] flex items-center justify-center">
            <Spin spinning />
          </div>
        )}
      </div>
      <div className="border-0 border-t border-solid border-th-grey-200 p-3 w-full">
        <div className="w-full flex items-center justify-center relative">
          <Input.TextArea
            className="w-full max-h-[240px] overflow-auto pr-8"
            placeholder="Nhập mô tả công việc cần tuyển dụng!"
            autoSize
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            // eslint-disable-next-line max-len
            className={`absolute bottom-[7px] right-2 bg-transparent border-none flex items-center justify-center text-2xl cursor-pointer focus-visible:outline-none ${
              search?.length ? 'text-th-primary ' : ''
            }`}
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
