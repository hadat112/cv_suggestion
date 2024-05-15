import { DownloadIcon } from '@/components/icons';
import useHover from '@/hooks/useHover';
import { Image } from 'antd';
const CvDownloadBtn = ({ onClick }) => {
  const { refWrapper, isHover } = useHover();

  return (
    <div
      ref={refWrapper}
      className="relative bg-th-background-1 border border-solid border-th-border hover:border-th-primary rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <Image src="/ic_file_pdf.png" alt="image" fallback="/fallback.png" width={52} />
      <div className="flex flex-col items-center text-sm">
        <div className="flex items-start w-full">
          <span className="min-w-[104px]">Name:</span>
          <span className="col-span-5 flex-1"> cv1</span>
        </div>
        <div className="flex items-start w-full">
          <span className="min-w-[104px]">Desciption: </span>
          <span className="col-span-5 flex-1 max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio odit sequi unde autem ad expedita
            iure illum ipsam ipsa deserunt cupiditate facilis saepe, aspernatur ab vel blanditiis quibusdam
            aliquid nihil?
          </span>
        </div>
        <div className="flex items-start w-full">
          <span className="min-w-[104px]">Received date: </span>
          <span className="col-span-5 flex-1">01-01-2024</span>
        </div>
      </div>
      {isHover && (
        <>
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-white text-3xl z-10">
            <DownloadIcon />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-th-primary opacity-40 z-8"></div>
        </>
      )}
    </div>
  );
};

export default CvDownloadBtn;
