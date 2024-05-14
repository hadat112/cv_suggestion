const formatImages = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
import { Image } from 'antd';
export const MessageAttachment = ({ attachments }) => {
  return (
    <div className="grid">
      {attachments?.map((attachment) => {
        const isImage = formatImages?.includes(attachment?.ext);
        return (
          <div key={attachments?.id} className="max-w-[450px] max-h-[300px] min-h-[100px] rounded-lg mb-1">
            {isImage && (
              <Image
                className="w-auto h-[250px] max-w-full max-h-[300px] rounded-lg border border-solid border-th-grey-300 object-cover"
                src={attachment?.url}
                alt={attachment?.name}
              />
            )}

            {attachment?.ext === 'mp4' && (
              <video width="400" controls>
                <source src={attachment?.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        );
      })}
    </div>
  );
};
