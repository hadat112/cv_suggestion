import { Image } from 'antd';
import { useRouter } from 'next/router';

export default function AppBranch({ collapsed, textSize, onChangePage }) {
  const router = useRouter();
  return (
    <div
      className={`app-brand bg-th-background-1 flex items-center justify-center overflow-hidden gap-2 px-3 pt-4 cursor-pointer ${textSize}`}
      onClick={() => {
        onChangePage();
        router.push('/dashboard');
      }}
    >
      <Image preview={false} src="/Logo.gif" alt="" width={collapsed ? 36 : 50} className="rounded-lg" />
      {/* <span
        className={`transition-opacity duration-500 flex items-center justify-center ${
          collapsed ? 'opacity-0 hidden' : 'opacity-100'
        } text-sm md:text-sm`}
      >
      </span> */}
    </div>
  );
}
