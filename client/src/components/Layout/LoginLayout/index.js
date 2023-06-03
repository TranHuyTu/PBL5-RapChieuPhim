import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';

const cx = classNames.bind(styles);

let imgBGR = [
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/mQjeuj9daalPzpqllOB2dnmWzCV.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/u3M1bVxEbIe3BVkFJWwMi8DIea1.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/tvVVdUf7GuUGpCYg10Sj5RIz0cf.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg',
];
function hasVietnameseCharacter(str) {
    var vietnamese =
        /[\u00C0-\u1EF9\u1EA0-\u1EF9\u00D2-\u1ED3\u1ECC-\u1EEF\u00D4-\u1ED7\u1EDC-\u1EE3\u01A0-\u1EDF\u1EEA-\u1EEF\u0110\u0111]/;
    return vietnamese.test(str);
}
function LoginLayout({ chilren }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [mess1, setMess1] = useState('');
    const [mess2, setMess2] = useState('');
    const [mess3, setMess3] = useState('');
    let history = useNavigate();
    useLayoutEffect(() => {
        if (localStorage.getItem('movie')) {
            let movie = JSON.parse(localStorage.getItem('movie'));
            localStorage.clear();
            localStorage.setItem('movie', JSON.stringify(movie));
        } else {
            localStorage.clear();
        }
    }, []);
    const Submit = function () {
        const account = {
            user: user,
            password: password,
        };

        try {
            axios
                .post('http://localhost:8080/login', account, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                })
                .then((response) => {
                    if (response.data.result) {
                        localStorage.setItem('token-login', JSON.stringify(response.data.result));
                        const _token = response.data.result;
                        try {
                            axios
                                .post(
                                    'http://localhost:8080/login/check_token',
                                    { x: 1 },
                                    {
                                        headers: {
                                            'content-type': 'application/x-www-form-urlencoded',
                                            authorization: _token,
                                        },
                                    },
                                )
                                .then((response) => {
                                    localStorage.setItem(
                                        'CheckAcc',
                                        JSON.stringify(response.data.data.data.CheckAdmin),
                                    );
                                    if (response.data.data.data.CheckAdmin == 0) {
                                        history('/');
                                        Swal.fire(
                                            'Logged in successfully!',
                                            'Bạn muốn đặt vé xem phim hãy chọn OK để tiếp tục',
                                            'success',
                                        );
                                    } else if (response.data.data.data.CheckAdmin == 1) {
                                        history('/Admin');
                                        Swal.fire(
                                            'Logged in successfully!',
                                            'Chào mừng Admin đến với hệ thống',
                                            'success',
                                        );
                                    }
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        document.querySelector('#span-login').style.display = 'block';
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('imgBx')}>
                <Carousel variant="dark" interval="1000">
                    {imgBGR.map((value, index) => (
                        <Carousel.Item key={index}>
                            <img className={cx('bgrImg')} src={value} alt="First slide" />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <div className={cx('form')} id="form">
                <h3 className={cx('heading')}>Đăng nhập</h3>
                <p className={cx('desc')}> Vui lòng đăng nhập có những trải nghiệm thú vị nhé ❤️</p>

                <div className={cx('spacer')}></div>

                <div className={cx('form-group')}>
                    <label htmlFor="user" className={cx('form-label')}>
                        Tài khoản
                    </label>
                    <input
                        id="user"
                        name="user"
                        type="text"
                        placeholder="Nhâp tài khoản"
                        className={cx('form-control')}
                        onChange={(e) => {
                            if (hasVietnameseCharacter(e.target.value) || e.target.value.length <= 8) {
                                setMess1('error');
                            } else {
                                setMess1('');
                                document.querySelector('#span-login').style.display = 'none';
                            }
                            setUser(e.target.value);
                        }}
                    />
                    <span className={cx('form-message', mess1)}>*Tài khoản ko hợp lệ</span>
                </div>

                <div className={cx('form-group')}>
                    <label htmlFor="password" className={cx('form-label')}>
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className={cx('form-control')}
                        onChange={(e) => {
                            if (hasVietnameseCharacter(e.target.value) || e.target.value.length <= 8) {
                                setMess2('error');
                            } else {
                                setMess2('');
                                document.querySelector('#span-login').style.display = 'none';
                            }
                            setPassword(e.target.value);
                        }}
                    />
                    <span className={cx('form-message', mess2)}>*Mật khẩu chưa hợp lệ</span>
                </div>
                <span id="span-login" className={cx('loginError', mess3)}>
                    *Thông tin tài khoản hoặc mật khẩu không chính xác
                </span>
                <button
                    className={cx('form-submit')}
                    onClick={() => {
                        if (document.querySelectorAll('.form-message').length != 0) {
                            console.log('TK ko hợp lệ');
                            console.log(document.querySelectorAll('.form-message'));
                            document.querySelector('#span-login').style.display = 'block';
                        } else {
                            Submit();
                        }
                    }}
                >
                    Đăng nhập
                </button>
                <div className={cx('form-register')}>
                    <a href="/Register" className={cx('register')}>
                        Đăng ký
                    </a>
                    <a href="./ForgotPassword" className={cx('forgot-password')}>
                        Quên Mật Khẩu ?
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;
