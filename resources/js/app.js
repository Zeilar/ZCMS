import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import './bootstrap';

document.querySelector('html').classList.add(localStorage.getItem('theme') ?? 'light');

if (document.getElementById('app')) ReactDOM.render(<App />, document.getElementById('app'));