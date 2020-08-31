import PasswordToggler from './components/PasswordToggler';
import ThemeToggler from './components/ThemeToggler';
import Checkbox from './components/Checkbox';
import ReactDOM from 'react-dom';
import React from 'react';
import './bootstrap';
import './nav';

document.querySelector('html').setAttribute('data-theme', localStorage.getItem('theme') ?? 'light');

const themeToggler = document.getElementById('themeToggler');
if (themeToggler) {
    ReactDOM.render(<ThemeToggler />, themeToggler);
}

const checkBoxes = document.querySelectorAll('.checkbox');
if (checkBoxes.length) {
    checkBoxes.forEach(checkBox => {
        ReactDOM.render(<Checkbox />, checkBox);
    });
}

const passwordToggler = document.getElementById('passwordToggler');
if (passwordToggler) {
    ReactDOM.render(<PasswordToggler />, passwordToggler);
}