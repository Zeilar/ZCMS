import ReactDOM from 'react-dom';
import Index from './Index';
import Users from './Users';
import React from 'react';

const adminDashboardIndex = document.querySelector('#adminDashboardIndex');
if (adminDashboardIndex) {
    ReactDOM.render(<Index />, adminDashboardIndex);
}

const adminDashboardUsers = document.querySelector('#adminDashboardUsers');
if (adminDashboardUsers) {
    ReactDOM.render(<Users />, adminDashboardUsers);
}