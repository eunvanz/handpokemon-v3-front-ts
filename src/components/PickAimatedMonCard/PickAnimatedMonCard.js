import React, { useCallback, useState, useRef, useEffect } from 'react';
import { TweenMax } from 'gsap';
import $ from 'jquery';
import MonCard from '../MonCard';
import { burstStar } from '../../libs/animation';
import { ATTR_COLOR } from '../../constants/styles';
import { RANK, GRADE } from '../../constants/codes';

const PickAnimatedMonCard = ({ delay, id, ...props }) => {
  const [hidden, setHidden] = useState(true);
  const wrapperEl = useRef(null);

  const burst = useCallback(() => {
    setTimeout(() => setHidden(false), 500);
    setTimeout(() => {
      setHidden(false);
      if (
        [GRADE.RARE, GRADE.ELITE, GRADE.LEGEND].indexOf(props.mon.mon.gradeCd) >
          -1 ||
        ([RANK.A, RANK.S, RANK.SS].indexOf(props.mon.rankCd) > -1 &&
          props.mon.level === 1)
      ) {
        const wrapper = $(`#animation-wrapper-${id}`);
        const wrapperPosition = wrapper.offset();
        const wrapperWidth = wrapper.width();
        if (wrapper && wrapperPosition) {
          burstStar({
            left: wrapperPosition.left + wrapperWidth / 2,
            top: wrapperPosition.top,
            color: ATTR_COLOR[props.mon.mainAttrCd],
            radius: wrapperWidth * 0.7
          });
        }
      }
    }, 500);
  }, [id, props.mon]);

  useEffect(() => {
    setHidden(true);
    TweenMax.to(wrapperEl.current, 0.1, {
      y: '+=5',
      yoyo: true,
      repeat: 10 + delay * 10
    });
    TweenMax.to(wrapperEl.current, 0.1, {
      y: '-=5',
      yoyo: true,
      repeat: 10 + delay * 10
    });
    TweenMax.to(wrapperEl.current, 1, {
      // scale: 1.1,
      delay: 1 + delay,
      rotationX: 360,
      transformOrigin: 'center',
      transformPerspective: 3000,
      onStart: burst
    });
    return () => {
      TweenMax.killTweensOf(wrapperEl.current);
    };
  }, [wrapperEl, delay, burst]);

  return (
    // <Tween
    //   duration={1}
    //   from={{ scale: 0, ease: Elastic.easeOut, delay }}
    //   onStart={
    //     [GRADE.RARE, GRADE.ELITE, GRADE.LEGEND].indexOf(props.mon.mon.gradeCd) >
    //       -1 ||
    //     ([RANK.A, RANK.S, RANK.SS].indexOf(props.mon.rankCd) > -1 &&
    //       props.mon.level === 1)
    //       ? burst
    //       : null
    //   }
    // >
    <div id={`animation-wrapper-${id}`} ref={wrapperEl}>
      <MonCard isMock={hidden} {...props} />
    </div>
    // </Tween>
  );
};

export default PickAnimatedMonCard;
