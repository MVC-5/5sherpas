import React from 'react';

import './style.css';

import sherpa4 from '../../assets/sherpa4.png';
import Challenge from '../Challenge';

export function WeeklyChallenges () {
    return (
        <>
        <div className= 'dash-section-1'>
        <img className='sherpa-img-smaller' src={sherpa4} alt='sherpa4' />
        <h1 className='section-title'>weekly challenges</h1>
        </div>
        <div className='challenges-container'>
            < Challenge />
            < Challenge />
            < Challenge />
        </div>
        </>
    )
}
