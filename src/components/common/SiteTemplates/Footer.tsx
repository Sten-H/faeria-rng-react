import * as React from 'react';
import './Footer.css';

const octocatLogo = require('./Octocat.png');

export const Footer = () => (
    <div className="footer float-right">
        <div className="float-right pr-md-3">
        <a
            href="https://github.com/Sten-H/faeria-rng"
            target="_blank"
        >
            View on Github
            <img
                className="reactive"
                src={octocatLogo}
                width={40}
            />
        </a>
        </div>
    </div>
);

export default Footer;