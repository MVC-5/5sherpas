import React from 'react';
import './style.css';
import mainKnot from '../../assets/main-knot.png';
import sherpa1 from '../../assets/sherpa1.png';
import sherpa3 from '../../assets/sherpa3.png';
import sherpa5 from '../../assets/sherpa5.png';
import yak1 from '../../assets/yak1.png'

import bubble1 from '../../assets/bubble-1.png';
import bubble2 from '../../assets/bubble-2.png';
import bubble3 from '../../assets/bubble-3.png';
import bubble4 from '../../assets/bubble-4.png';

function ConsultSherpas() {
    return (
      <>
        <h1 className='header'>consult a sherpa</h1>
        <div className='knot-container'>
          <img className='sherpa-img s-8' src={sherpa1} alt='sherpa1' />
          <img className='sherpa-img s-9' src={sherpa3} alt='sherpa3' />
          <img className='sherpa-img s-10' src={sherpa5} alt='sherpa5' />
          <img className='yak-img s-yak' src={yak1} alt='yak1' />

          <img className='bubble-img bubble-1' src={bubble1} alt='bubble' />
          <img className='bubble-img bubble-2' src={bubble2} alt='bubble' />
          <img className='bubble-img bubble-3' src={bubble3} alt='bubble' />
          <img className='bubble-img bubble-4' src={bubble4} alt='bubble' />

          <img id='second-knot' src={mainKnot} alt='knot-logo' />
        </div>
      </>
    );
}
  
export default ConsultSherpas;
