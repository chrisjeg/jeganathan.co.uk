import React from 'react';
import './Social.scss';

import GitHubLogo from '../../resources/github-logo.png';
import LinkedInLogo from '../../resources/linkedin-logo.png';
import MediumLogo from '../../resources/medium-logo.png';

export default ()=>(
    <div className="social">
        <a href="https://github.com/chrisjeg/">
            <img alt="github-link" src={GitHubLogo} height="64px"/>
        </a>
        <a href="https://www.linkedin.com/in/chris-jeganathan-67091460/">
            <img alt="linkedin-link" src={LinkedInLogo} height="64px"/>
        </a>
        <a href="https://medium.com/@chris.jeganathan">
            <img alt="medium-link" src={MediumLogo} height="64px"/>
        </a>
    </div>
);