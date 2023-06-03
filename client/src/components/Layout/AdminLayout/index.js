import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Controller from './Controller';

const cx = classNames.bind(styles);

function AdminLayout({ chilren }) {
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .postForm(
                        'http://localhost:8080/login/check_token',
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        if (response.data.data.data) {
                            if (response.data.data.data.CheckAdmin === 0) {
                                navigate('../');
                            }
                        } else {
                            localStorage.clear();
                            navigate('../');
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <Container fluid="xxl">
                <div className={cx('content')}>
                    <Header />
                    <Controller />
                </div>
            </Container>
        </div>
    );
}

export default AdminLayout;
