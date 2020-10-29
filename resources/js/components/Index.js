import { mdiLoading, mdiGamepadVariant, mdiTelescope, mdiMessageText } from '@mdi/js';
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Http from '../classes/Http';
import Header from './Header';
import Icon from '@mdi/react';

export default function Index() {
    const styles = createUseStyles({
        categories: {
            
        },
    });
    const classes = styles();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        setCategories(await Http.get('categories'));
        setLoading(false);
    }, []);

    const categoriesRender = () => {
        if (loading) {
            return <Icon className="center-self loadingWheel-2" path={mdiLoading} spin={1} />;
        } else {
            
        }
    }

    return (
        <>
            <Header />
            <div className={`${classes.categories} row relative m-auto`}>
                {categoriesRender()}
            </div>
        </>
    );
}
