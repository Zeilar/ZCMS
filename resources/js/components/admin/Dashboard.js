import { Route, Switch } from 'react-router';
import { createUseStyles } from 'react-jss';
import { Start, Users, Sidebar } from './';
import classnames from 'classnames';
import React from 'react';

export default function Dashboard() {
    document.title = 'TPH | Admin';

    const styles = createUseStyles({
        wrapper: {
            
        },
    });
    const classes = styles();

    return (
        <div className={classnames(classes.wrapper, 'row flex')}>
            <Sidebar />
            <div className={classnames('col flex p-4')}>
                <Switch>
                    <Route component={Start} path="/admin" exact />
                    <Route component={Users} path="/admin/users" exact />
                    <Route>
                        {/* <HttpError code={404} /> */}
                    </Route>
                </Switch>
            </div>
        </div>
    );
}
