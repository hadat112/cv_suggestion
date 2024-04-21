import { useState, forwardRef, useEffect, MutableRefObject } from 'react';
import { Button } from 'antd';
import cx from 'classnames';
import { ArrowUpIcon } from '../icons';

interface IProps {
  onGotoTop: () => void;
}

const DISTANCE_SHOW_SCROLL_TOP = 500;

// eslint-disable-next-line react/display-name
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
      <Button size="small" onClick={onGotoTop} type="primary" shape="circle" icon={<ArrowUpIcon />} />
    </div>
  );
});

export default ScrollTopButton;
