import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Controller.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { useState, useEffect } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

function Controller() {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('wrapper-ul')}>
                <li className={cx('controler-value')}>TRANG CHỦ</li>
                <li className={cx('controler-value')}>PHIM</li>
                <li className={cx('controler-value')}>LỊCH CHIẾU</li>
                <li className={cx('controler-value')}>ĐẠO DIỄN</li>
                <li className={cx('controler-value')}>DIỄN VIÊN</li>
                <li className={cx('controler-value')}>NGƯỜI DÙNG</li>
                <li className={cx('controler-value')}>GIÁ VÉ</li>
                <li className={cx('controler-value')}>RẠP</li>
                <li className={cx('controler-value')}>BLOG</li>
            </ul>
        </div>
    );
}

export default Controller;
