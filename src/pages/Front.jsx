import React from 'react';
import LeftSidenav from '../components/leftsidenav';
import Iframe from '../components/iframe';
import RightSidenav from '../components/rightsidenav';

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