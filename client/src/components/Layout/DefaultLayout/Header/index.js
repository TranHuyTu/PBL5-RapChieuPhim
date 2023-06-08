import * as React from 'react';
import classNames from 'classnames/bind';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from '~/api/axiosClient';

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />;

const cx = classNames.bind(styles);

function DangNhap() {
    const [checklogin, setCheckLogin] = useState('');
    const [User, setUser] = useState([]);
    const navigate = useNavigate();
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
                            '/login/check_token',
                            { x: 1 },
                            {
                                headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                            },
                        )
                        .then((response) => {
                            setUser(response.data.data);
                            if (response.data.data.CheckAdmin !== 0) {
                                navigate('/Admin');
                            }
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
                        src="https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png"
                        alt=""
                    />
                    <a href="" className={cx('btn-login')}>
                        {User.Name}
                    </a>
                </div>
            );
        } else {
            return (
                <div className={cx('login')}>
                    <img href="" alt="" />
                    <a className={cx('btn-login')} href="/login">
                        Đăng nhập
                    </a>
                </div>
            );
        }
    } else {
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
    const [User, setUser] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token-login')) {
                try {
                    const token = localStorage.getItem('token-login');
                    const _token = token.substring(1, token.length - 1);
                    await axios
                        .postForm(
                            '/login/check_token',
                            { x: 1 },
                            {
                                headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                            },
                        )
                        .then((response) => {
                            setUser(response.data.data);
                            if (response.data.data.CheckAdmin !== 0) {
                                navigate('/Admin');
                            }
                        });
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, []);
    function handleLogout() {
        localStorage.clear();
        window.location.reload();
    }
    if (User !== []) {
        if (localStorage.getItem('token-login'))
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
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('headerController')}>
                <Container fluid="xxl" className={cx('container')}>
                    <div className={cx('row')}>
                        <img
                            className={cx('logo-web')}
                            src="https://res.cloudinary.com/dbaul3mwo/image/upload/v1686202031/CinemaReal_vb9wsi.png"
                            alt="Logo"
                            onClick={() => {
                                navigate('/');
                            }}
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
