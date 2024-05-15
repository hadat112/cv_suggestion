import { AppleIcon, CHPlayIcon, ChatIcon, MoonIcon, SunIcon } from '@/components/icons';
import { useTheme } from '@/configs/theme/provider';
import cn from 'classnames';
import { Image } from 'antd';
import Link from 'next/link';

const SwitchTheme = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
  const Icon = checked ? MoonIcon : SunIcon;

  return (
    <button
      className="relative hover:border-th-grey-300 rounded-[11px] w-[38px] h-[20px] border border-solid border-th-grey-100 bg-th-background-overlay transition-all cursor-pointer"
      onClick={onChange}
      id="switch-theme"
    >
      <span
        className={cn('absolute top-[1px] left-[1px] w-4 h-4 rounded-full bg-th-background transition-all', {
          'translate-x-[18px]': checked,
        })}
      >
        <div className="relative w-4 h-4 rounded-full">
          <Icon className="text-th-text absolute top-[3px] left-[3px]" />
        </div>
      </span>
    </button>
  );
};

export default function LoginHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center px-3 py-2 bg-th-background gap-8 text-th-text text-sm">
      <Link className="flex-1 mb-0 flex items-center font-bold" href="/login">
        <Image preview={false} src="/Logo.gif" alt="" width={60} className="rounded-lg dark:bg-white" />
      </Link>
      <div className="flex gap-5 items-center justify-self-end">
        <span className="hidden md:block text-base">Available at</span>
        <div className="flex items-center gap-2 border border-solid border-th-border rounded-full px-2 py-1 font-medium">
          <AppleIcon />
          <span className="hidden md:flex">App Store</span>
        </div>
        <div className="flex items-center gap-2 border border-solid border-th-border rounded-full px-2 py-1 font-medium">
          <CHPlayIcon />
          <span className="hidden md:flex">Google play</span>
        </div>
        <div className="flex items-center gap-1">
          <ChatIcon />
          <span className="hidden md:flex">Need support?</span>
          <a className="font-semibold text-th-primary text-xs">CHAT NOW!</a>
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e?.stopPropagation()}>
          <SwitchTheme checked={theme === 'dark'} onChange={() => toggleTheme()} />
        </div>
      </div>
    </div>
  );
}
