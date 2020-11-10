import React from 'react';

import './style.css';

// Components
import { MyDashboard } from '../../components/MyDashboard';
import ConsultSherpas from '../../components/ConsultSherpas';


function userDashboard () {
    return (
        <>
            <div className='knot-container'>
                <div>
                    < MyDashboard />
                    < ConsultSherpas />
                </div>
            </div>
        </>
    );
}

export default userDashboard;
