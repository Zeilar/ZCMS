import PasswordToggler from './components/PasswordToggler';
import LanguageToggler from './components/LanguageToggler';
import ThemeToggler from './components/ThemeToggler';
import Checkbox from './components/Checkbox';
import ReactDOM from 'react-dom';
import React from 'react';
import './bootstrap';

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

const passwordTogglers = document.querySelectorAll('.passwordToggler');
if (passwordTogglers.length) {
    passwordTogglers.forEach(passwordToggler => {
       ReactDOM.render(<PasswordToggler />, passwordToggler);    
    });
}

const languageToggler = document.getElementById('languageToggler');
if (languageToggler) {
    ReactDOM.render(<LanguageToggler />, languageToggler);
}