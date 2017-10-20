import * as React from 'react';
import './Header.css';

export const Header = () => (
    <header className="px-md-5 pt-md-2">
        <h1 className="display-4 rumble" id="title">Rage Assistant</h1>
        <hr className="my-0" />
        <p className="lead text-highlight">Start complaining more accurately</p>
    </header>
);

export default Header;