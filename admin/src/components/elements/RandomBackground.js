import React from 'react';
import bg1 from '../../assets/img/bg-1.jpg';
import bg2 from '../../assets/img/bg-2.jpg';
import bg3 from '../../assets/img/bg-3.jpg';
import bg4 from '../../assets/img/bg-4.jpg';
import bg5 from '../../assets/img/bg-5.jpg';

const RandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * (4 - 0) + 0); // 0 - 4
  const images = [bg1, bg2, bg3, bg4, bg5];

  return (
    <div className="bg-random">
      <img src={images[randomIndex]} />
    </div>
  );
};

export default RandomBackground;
