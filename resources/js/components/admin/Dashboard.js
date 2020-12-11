import { Route, Switch } from 'react-router';
import { createUseStyles } from 'react-jss';
import { Start, Users, Sidebar } from './';
import classnames from 'classnames';
import React from 'react';

export default function Dashboard() {
    const styles = createUseStyles({
        wrapper: {
            
        },
    });
    const classes = styles();

    return (
        <div className={classnames(classes.wrapper, 'row flex')}>
            <Sidebar />
            <Switch>
                <Route component={Start} path="/admin" exact />
                <Route component={Users} path="/admin/users" exact />
                <Route component={Start} />
            </Switch>
        </div>
    );
}
