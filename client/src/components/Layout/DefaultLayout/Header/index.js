import * as React from 'react';
import classNames from 'classnames/bind';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Header.module.scss';

import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />;

const cx = classNames.bind(styles);

function DangNhap() {
    const [checklogin, setCheckLogin] = useState('');
    const [User, setUser] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('token-login')) {
            setCheckLogin(localStorage.getItem('token-login'));
        }
        const fetchData = async () => {
            if (localStorage.getItem('token-login')) {
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
                            setUser(response.data.data.data);
                        });
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, []);
    if (User && checklogin) {
        if (User.Avatar && User.Name) {
            return (
                <div className={cx('login')}>
                    <img className={cx('avatar')} src={User.Avatar} alt="" />
                    <a href="" className={cx('btn-login')}>
                        {User.Name}
                    </a>
                </div>
            );
        } else if (User.Name) {
            return (
                <div className={cx('login')}>
                    <img
                        className={cx('avatar')}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqt6ww0fR2ENknaKd8Xy_bStSsKcVXfdoIzA&usqp=CAU"
                        alt=""
                    />
                    <a href="" className={cx('btn-login')}>
                        {User.Name}
                    </a>
                </div>
            );
        }
    } else {
        // localStorage.clear();
        // window.location.reload();
        return (
            <div className={cx('login')}>
                <img href="" alt="" />
                <a className={cx('btn-login')} href="/login">
                    Đăng nhập
                </a>
            </div>
        );
    }
}

function DangXuat() {
    function handleLogout() {
        localStorage.clear();
        window.location.reload();
    }
    if (localStorage.getItem('token-login')) {
        return (
            <div className={cx('logout')}>
                <a href="./" className={cx('btn-logout')} onClick={handleLogout}>
                    Đăng Xuất
                </a>
            </div>
        );
    }
}

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('headerController')}>
                <Container fluid="xxl" className={cx('container')}>
                    <div className={cx('row')}>
                        <img
                            className={cx('logo-web')}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtQRHjRZlYfBxxA73H4WfyIESKEmbK6T1lA&usqp=CAU"
                            alt="Logo"
                        />
                        <div className={cx('search')}>
                            <input
                                placeholder="Tìm tên phim, diễn viên..."
                                className={cx('input-search')}
                                type="text"
                                autoComplete="off"
                            />
                            <a className={cx('icon-Search')}>
                                <SearchIcon className={cx('icon')} fontSize="large" color="disabled"></SearchIcon>
                            </a>
                        </div>
                        <div className={cx('login-wrapper')}>
                            <div className={cx('user-login')}>
                                <DangNhap />
                                <DangXuat />
                            </div>
                            <div className={cx('language')}>
                                <a href="" className={cx('vn')}>
                                    VN
                                </a>
                                <span>|</span>
                                <a href="" className={cx('en')}>
                                    EN
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Header;
