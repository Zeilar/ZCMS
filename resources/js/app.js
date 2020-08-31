import ThemeToggler from './components/ThemeToggler';
import ReactDOM from 'react-dom';
import React from 'react';
import './bootstrap';
import './nav';

document.querySelector('html').setAttribute('data-theme', localStorage.getItem('theme') ?? 'light');

if (document.getElementById('themeToggler')) {
    ReactDOM.render(<ThemeToggler />, document.getElementById('themeToggler'));
}