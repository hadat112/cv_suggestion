import { LeftTriggerIcon, RightTriggerIcon } from '@/components/icons';

export default function Trigger({ collapsed, setCollapsed }) {
  return (
    <div
      className={
        'w-full h-full bg-th-background-1 flex items-center hover:bg-th-white border-0 border-t border-solid border-th-border justify-center text-th-grey-400'
      }
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? <RightTriggerIcon /> : <LeftTriggerIcon />}
    </div>
  );
}
