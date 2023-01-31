import React from 'react';
import LeftSidenav from '../components/leftSidenav';
import RightSidenav from '../components/rightSidenav';
import Iframe from '../components/iFrame';


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