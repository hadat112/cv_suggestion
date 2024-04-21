/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Image, Upload, UploadFile, UploadProps } from 'antd';
import { getBase64 } from '@/utils/functions';
import { RcFile } from 'antd/es/upload';
import { HttpRequestHeader } from 'antd/es/upload/interface';

interface IProps {
  accept?: string;
  action?: string;
  headers?: HttpRequestHeader;
  defaultFileList?: any[];
  onChange?: (newFileList: UploadFile<any>[]) => void;
}

export default function GUpload({ accept, action, headers, defaultFileList, onChange }: IProps) {
  const [previewCurrent, setPreviewCurrent] = useState(0);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (!defaultFileList?.length) return;
    const defaultFiles = defaultFileList?.map((file) => ({
      uid: file?.id,
      name: file?.name,
      mime: file?.mime,
      url: file?.url,
    }));
    setFileList(defaultFiles);
  }, [defaultFileList]);

  const handlePreview = async (file: UploadFile) => {
    const newPreviewFiles = [...previewFiles];
    const newFiles = fileList.slice(newPreviewFiles.length);
    const previewIndex = fileList.findIndex((f) => f.uid === file.uid);

    for (const file of newFiles) {
      const preview = await getBase64(file.originFileObj as RcFile);
      newPreviewFiles.push(preview);
    }

    setPreviewFiles(newPreviewFiles);
    setPreviewCurrent(previewIndex);
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange(newFileList);
  };

  const handleClickUpload = () => {
    const uploadInput: HTMLElement = document.querySelector(
      '.ant-upload-wrapper .ant-upload input[type=file]'
    );
    uploadInput.click();
  };

  const token = localStorage.getItem('token') ?? '';
  const defaultHeaders = headers ?? {
    Authorization: `Bearer ${token}`,
  };

  return (
    <div className="flex mt-2">
      <div className="custom-upload-button" onClick={handleClickUpload}>
        <p className="font-semibold">+ Ảnh</p>
      </div>
      <Upload
        className="ml-2"
        listType="picture-card"
        accept={accept}
        fileList={fileList}
        multiple
        name="files"
        action={action}
        headers={defaultHeaders}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        Upload
      </Upload>

      <Image.PreviewGroup
        items={previewFiles}
        preview={{
          visible: previewOpen,
          current: previewCurrent,
          onVisibleChange: (value) => setPreviewOpen(value),
          onChange: (current) => {
            setPreviewCurrent(current);
          },
        }}
      />
    </div>
  );
}
