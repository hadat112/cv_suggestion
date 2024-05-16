import { MoonIcon, SunIcon } from '@/components/icons';
import { useTheme } from '@/providers/ThemeProvider';
import cn from 'classnames';

export default function DarkModeBtn({ collapsed }) {
  const { toggleTheme, theme } = useTheme();

  const darkMode = theme === 'dark';
  return (
    <div className="bg-th-background-1 h-fit">
      <div
        className={cn('flex flex-shrink-0 overflow-hidden items-center rounded-lg gap-x-3 m-1 mt-0', {
          'justify-center py-3': collapsed,
          'justify-between p-3 hover:bg-th-white border border-solid border-th-background-1 hover:border-th-border':
            !collapsed,
        })}
      >
        {!collapsed && <span className="leading-6 whitespace-nowrap flex items-center">Theme</span>}
        <SwitchTheme checked={darkMode} onChange={toggleTheme} />
      </div>
    </div>
  );
}

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
