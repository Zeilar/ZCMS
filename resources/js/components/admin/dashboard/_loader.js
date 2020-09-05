import ReactDOM from 'react-dom';
import Index from './Index';
import React from 'react';

const adminDashboardIndex = document.querySelector('#adminDashboardIndex');
if (adminDashboardIndex) {
    ReactDOM.render(<Index />, adminDashboardIndex);
}