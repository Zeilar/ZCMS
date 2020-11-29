import React, { useState, useRef, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import classnames from 'classnames';
import { Http } from '../../classes';

export default function Chat() {
    const { id } = useParams();
    const { data, status } = useQuery(`chat-${id}`, async () => {
        const { data } = await Http.get(`chatmessages?profile=${id}`);
        console.log(data);
    });

    return (
        <>

        </>
    );
}
