import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Controller.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Main from '../Main';

import { useState, useEffect } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

function Controller() {
    const [typeMain, setTypeMain] = useState('');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('controller')}>
                <ul className={cx('wrapper-ul')}>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('TrangChu');
                        }}
                    >
                        TRANG CHỦ
                    </li>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('Phim');
                        }}
                    >
                        PHIM
                    </li>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('LichChieu');
                        }}
                    >
                        LỊCH CHIẾU
                    </li>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('DaoDien');
                        }}
                    >
                        ĐẠO DIỄN
                    </li>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('DienVien');
                        }}
                    >
                        DIỄN VIÊN
                    </li>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('NguoiDung');
                        }}
                    >
                        NGƯỜI DÙNG
                    </li>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('GiaVe');
                        }}
                    >
                        GIÁ VÉ
                    </li>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('Rap');
                        }}
                    >
                        RẠP
                    </li>
                    <li
                        className={cx('controler-value')}
                        onClick={() => {
                            setTypeMain('Blog');
                        }}
                    >
                        BLOG
                    </li>
                </ul>
            </div>
            <Main typeMain={typeMain} />
        </div>
    );
}

export default Controller;
