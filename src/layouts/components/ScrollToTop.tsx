import { ArrowUpIcon } from '@/components/icons';
import cx from 'classnames';
import { MutableRefObject, forwardRef, useEffect, useState } from 'react';

interface IProps {
  onGotoTop: () => void;
}

const DISTANCE_SHOW_SCROLL_TOP = 300;

const ScrollTopButton = forwardRef(({ onGotoTop }: IProps, ref: MutableRefObject<HTMLDivElement>) => {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.onscroll = (e: any) => {
      const scrollTop = e?.currentTarget?.scrollTop;
      const shouldShow = scrollTop > DISTANCE_SHOW_SCROLL_TOP;

      setShowScrollUp(shouldShow);
    };
  }, [ref]);

  return (
    <div
      className={cx('block justify-end absolute z-50 bottom-[40px] right-[20px] pr-4', {
        hidden: !showScrollUp,
      })}
    >
      <div
        className="flex items-center justify-center p-0 bg-th-primary shadow-md h-9 w-9 rounded-full text-white cursor-pointer text-lg opacity-70"
        onClick={onGotoTop}
      >
        <ArrowUpIcon />
      </div>
    </div>
  );
});

export default ScrollTopButton;
