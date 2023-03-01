//import React, { useState } from 'react';
import "../App.css";

const Footer = ({ socket }) => {

    const year = new Date().getFullYear();

    return (
        <div className="square border border-info border-2 footer">
            <h2>Giving App Footer</h2>
            <footer>{`Copyright @ The Giving App ${year}`}</footer>
        </div>
    );
};

export default Footer;