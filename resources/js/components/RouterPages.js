import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import AdminDashboard from './admin/dashboard/Index';
import { Route, Switch } from 'react-router';
import AdminRoute from './routes/AdminRoute';
import NotFound from './NotFound';
import Index from './Index';

export default function Pages() {
    return (
        <Switch>
            <Route component={Index} path="/" exact />
            <AdminRoute component={AdminDashboard} path="/admin" />
            <Route component={NotFound} />
        </Switch>
    );
}