import React from 'react';
import { useSpring, animated, UseSpringProps, config } from 'react-spring';
import { useHeight } from '@treelof/hooks';

interface Props {
  show: boolean; // component is visible
  withDelay?: boolean; // there shold be a delay before rendering and showing the component
  children?: React.ReactNode;
}
/**
 * @return A wrapper component for slide in/out based on component visibility
 */
const animationDuration = 250;
const SlideVertical: React.FC<Props> = (props) => {
  const { show } = props;
  const [ref, height] = useHeight();
  const additionalAnimProps: UseSpringProps = {};
  // animation delay
  if (props.withDelay) additionalAnimProps.delay = animationDuration;
  const styles = useSpring({
    config: { ...config.stiff },
    from: { opacity: 0, height: 0 },
    to: {
      opacity: show ? 1 : 0,
      height: show ? height : 0
    },
    ...additionalAnimProps
    // onStart: () => {
    //   if (show) setIsComponentRendered(show);
    // },
    // onRest: () => setIsComponentRendered(show)
  });
  // const [isComponentRendered, setIsComponentRendered] = useState(show); // indicates the component should render on the DOM

  // if (!isComponentRendered) return null;
  return (
    <animated.div style={{ ...styles }}>
      <div ref={ref} className="slide-vertical">
        {props.children}
      </div>
    </animated.div>
  );
};

export default SlideVertical;
