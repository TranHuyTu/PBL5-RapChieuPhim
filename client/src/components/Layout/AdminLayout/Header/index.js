import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

function DangNhap() {
    const [checklogin, setCheckLogin] = useState('');
    const [User, setUser] = useState([]);
    useEffect(() => {
        if (localStorage.getItem('token-login')) {
            setCheckLogin(localStorage.getItem('token-login'));
        }
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
                        setUser(response.data.data.data);
                    });
            } catch (error) {
                console.error(error);
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
        localStorage.removeItem('token-login');
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
                    <Row className={cx('row')}>
                        <Col className={cx('col')}>
                            <img
                                className={cx('logopages')}
                                src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg"
                                alt="LogoPages"
                            />
                        </Col>
                        <Col className={cx('col-search')}>
                            <img
                                className={cx('icon')}
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/1200px-Vector_search_icon.svg.png"
                            ></img>
                            <input className={cx('search')} type="text" placeholder="Tim kiem"></input>
                        </Col>
                        <Col className={cx('col')}>
                            <div className={cx('user-login')}>
                                <DangNhap />
                                <DangXuat />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Header;
