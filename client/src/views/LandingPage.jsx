import React from 'react';

import '.././Components/playStyles.css';

export default function LandingPage() {
  return (
    <div>
      <div className='landingDiv'></div>
      <h1 className='landingTitle'>
        Welcome to the <br /> <span className='twoLines'>slot game site!</span>
      </h1>
      <h3 className='landingTitle subtitle'>
        Please register to play or login to continue
      </h3>
    </div>
  );
}
