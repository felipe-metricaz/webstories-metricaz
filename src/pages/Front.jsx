import React from 'react';
import LeftSidenav from '../components/leftsidenav';
import RightSidenav from '../components/rightSidenav';
import Iframe from '../components/iframe';


function Front() {
    return (
        <div>
            <RightSidenav/>
            <Iframe/>
            <LeftSidenav/>
        </div>
    )
}

export default Front