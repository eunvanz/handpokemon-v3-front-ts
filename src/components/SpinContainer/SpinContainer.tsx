import React, { useEffect, useState, useRef, ComponentProps } from 'react';
import './SpinContainer.less';
import Spinner from '../Spinner';

const SpinContainer = (props: ComponentProps<'div'>) => {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const alignerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef && alignerRef) {
      const currentWrapper = wrapperRef.current;
      const wrapperWidth = currentWrapper
        ? currentWrapper.getBoundingClientRect().width
        : 0;
      if (alignerRef.current) {
        alignerRef.current.style.width = `${wrapperWidth}px`;
      }
      setVisible(true);
    }
  }, []);

  return (
    <div className='spin-container' ref={wrapperRef} {...props}>
      <div className='center-middle-aligner always-center' ref={alignerRef}>
        <Spinner style={{ display: visible ? 'block' : 'none' }} />
      </div>
    </div>
  );
};

export default SpinContainer;
