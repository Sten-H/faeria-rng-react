import * as React from 'react';
import './SiteTemplate.css';
const octocatLogo = require('./Octocat.png');

const Header = () => (
    <header className="px-md-5 pt-md-2">
        <h1 className="display-4 rumble" id="title">Rage Assistant</h1>
        <hr className="my-0" />
        <p className="lead text-highlight">Start complaining more accurately</p>
    </header>
);
const Footer = () => (
    <div className="footer float-right">
        <div className="float-right pr-md-3">
            <a
                href="https://github.com/Sten-H/faeria-rng-react"
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
interface PageProps {
    children: {};
}
export const Page = (props: PageProps) => (
    <div>
        <Header />
        <div>
            {props.children}
        </div>
        <Footer />
    </div>
);
export default Page;
