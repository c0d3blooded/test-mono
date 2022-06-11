import { BsCircleFill, BsCircleHalf, BsCircle } from 'react-icons/bs';

// default icons for chips with the given labels
const chipIcons: Record<string, any> = {
  sun_preferences: {
    full_sun: <BsCircle />,
    partial_shade: <BsCircleHalf />,
    full_shade: <BsCircleFill />
  }
};
export default chipIcons;
