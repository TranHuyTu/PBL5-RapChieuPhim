import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './Header';
import Controller from './Controller';

const cx = classNames.bind(styles);

function AdminLayout({ chilren }) {
    return (
        <div>
            <Container fluid="xxl">
                <div className="content">
                    <Header />
                    <Controller />
                </div>
            </Container>
        </div>
    );
}

export default AdminLayout;
