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

  function handleSherpaClick(id) {
    console.log(id)
  }
  return (
    <>
      <h1 className='header'>consult a sherpa</h1>
      <div className='knot-container'>
        <button onClick={(e)=>handleSherpaClick(e.target.id)}> <img className='sherpa-img s-8' id='Jon' src={sherpa1} alt='sherpa1' /></button>
        <button onClick={(e)=>handleSherpaClick(e.target.id)}> <img className='sherpa-img s-9' id='Josh' src={sherpa3} alt='sherpa3' /></button>
        <button onClick={(e)=>handleSherpaClick(e.target.id)}> <img className='sherpa-img s-10' id='Caleb' src={sherpa5} alt='sherpa5' /></button>
        <button onClick={(e)=>handleSherpaClick(e.target.id)}> <img className='yak-img s-yak' src={yak1} id='PC Yak' alt='yak1' /></button>

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
