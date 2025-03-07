import React from 'react';
import { GREY_COLOR } from '../../utils/constants';

const PhoneInnerImage = () => {
  return (
    <svg
      width='286'
      height='612'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 45.5C1 20.923 20.923 1 45.5 1h24C75.851 1 81 6.149 81 12.5 81 20.508 87.492 27 95.5 27h95c8.008 0 14.5-6.492 14.5-14.5C205 6.149 210.149 1 216.5 1h24C265.077 1 285 20.923 285 45.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C20.923 611 1 591.077 1 566.5v-521Z'
        fill='#fff'
        stroke={GREY_COLOR}
      />
    </svg>
  );
};

export default PhoneInnerImage;
