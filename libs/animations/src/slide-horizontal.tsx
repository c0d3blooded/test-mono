import React from 'react';
import { animated, config, easings, useTransition } from 'react-spring';

interface Props {
  show: boolean; // component is visible
  className?: string;
  duration?: number; // optional duration prop
  withDelay?: boolean; // there shold be a delay before rendering and showing the component
  children?: React.ReactNode;
  direction: 'left' | 'right';
}
/**
 * @return A wrapper component for slide in/out based on component visibility
 */
const SlideHorizontal: React.FC<Props> = (props) => {
  const { show, direction } = props;
  // slide in the right direction
  const isRight = direction === 'right';
  const target = React.useRef(null);

  const transitions = useTransition(show, {
    from: { transform: isRight ? 'translateX(-100%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: isRight ? 'translateX(-100%)' : 'translateX(100%)' },
    reverse: show,
    config: {
      ...config.molasses,
      duration: props.duration ?? 500,
      easing: easings.easeInOutQuint
    }
  });
  return transitions(
    (styles, item) =>
      item && (
        <animated.div ref={target} style={styles} className={props.className}>
          {props.children}
        </animated.div>
      )
  );
};

export default SlideHorizontal;
