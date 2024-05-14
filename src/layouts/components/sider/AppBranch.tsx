import { useRouter } from 'next/router';

export default function AppBranch({ collapsed, textSize, onChangePage }) {
  const router = useRouter();
  return (
    <div
      className={`app-brand bg-th-background-1 flex items-center overflow-hidden gap-2 px-3 py-5 cursor-pointer ${textSize}`}
      onClick={() => {
        onChangePage();
        router.push('/dashboard');
      }}
    >
      <span
        className={`flex items-center justify-center text-th-primary text-3xl font-bold ${
          collapsed ? 'text-sm' : ''
        }`}
      >
        LOGO
      </span>
      {/* <span
        className={`transition-opacity duration-500 flex items-center justify-center ${
          collapsed ? 'opacity-0 hidden' : 'opacity-100'
        } text-sm md:text-sm`}
      >
      </span> */}
    </div>
  );
}
