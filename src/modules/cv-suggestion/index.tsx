import React, { useState } from 'react';
import { Input, Spin } from 'antd';
import { Send } from '@/components/icons';
const CvSuggestion = () => {
  const [fetching, setFetching] = useState(false);

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
    <div className="flex flex-col items-center w-full p-8">
      <div className="w-full flex items-center justify-center relative">
        <Input.TextArea
          className="w-full max-h-[240px] overflow-auto pr-8"
          placeholder="Nhập mô tả công việc cần tuyển dụng!"
          autoSize
        />
        <button
          className="absolute bottom-[7px] right-2 bg-transparent border-none flex items-center justify-center text-2xl cursor-pointer hover:text-th-primary focus-visible:outline-none"
          onClick={handleSend}
        >
          <Send />
        </button>
      </div>

      {!fetching ? (
        <div className="w-full mt-8 flex flex-col gap-4 ">
          <h2 className="text-">Danh sách cv phù hợp</h2>
          <CvDownloadBtn onClick={onDownload} />
          <CvDownloadBtn onClick={onDownload} />
          <CvDownloadBtn onClick={onDownload} />
          <CvDownloadBtn onClick={onDownload} />
          <CvDownloadBtn onClick={onDownload} />
        </div>
      ) : (
        <div className="min-h-[500px] flex items-center justify-center">
          <Spin spinning />
        </div>
      )}
    </div>
  );
};

export default CvSuggestion;

const CvDownloadBtn = ({ onClick }) => {
  return (
    <div
      className="border border-solid hover:border-th-primary rounded-lg px-4 py-3 flex flex-col gap-1 cursor-pointer"
      onClick={onClick}
    >
      <span>Name: cv1</span>
      <span>Received date: 01-01-2024</span>
    </div>
  );
};
