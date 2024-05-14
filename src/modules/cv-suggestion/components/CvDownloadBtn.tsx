import { DownloadIcon } from '@/components/icons';
import useHover from '@/hooks/useHover';

const CvDownloadBtn = ({ onClick }) => {
  const { refWrapper, isHover } = useHover();

  return (
    <div
      ref={refWrapper}
      className="relative bg-th-white border border-solid border-th-border hover:border-th-primary rounded-lg px-4 py-3 flex flex-col gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start w-full">
        <span className="min-w-[120px]">Name:</span>
        <span className="col-span-5 flex-1"> cv1</span>
      </div>
      <div className="flex items-start w-full">
        <span className="min-w-[120px]">Desciption: </span>
        <span className="col-span-5 flex-1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio odit sequi unde autem ad expedita
          iure illum ipsam ipsa deserunt cupiditate facilis saepe, aspernatur ab vel blanditiis quibusdam
          aliquid nihil?
        </span>
      </div>
      <div className="flex items-start w-full">
        <span className="min-w-[120px]">Received date: </span>
        <span className="col-span-5 flex-1">01-01-2024</span>
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
