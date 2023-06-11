import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from '~/api/axiosClient';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';

const cx = classNames.bind(styles);

let imgBGR = [
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/mQjeuj9daalPzpqllOB2dnmWzCV.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/u3M1bVxEbIe3BVkFJWwMi8DIea1.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/tvVVdUf7GuUGpCYg10Sj5RIz0cf.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg',
];
const RandomPass = function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
};
function ForgotPasswordLayout({ chilren }) {
    const [Email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleOnClick = () => {
        try {
            if (Email) {
                console.log(Email);
                axios
                    .post('/accountlogin/' + Email, {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                        },
                    })
                    .then((response) => {
                        if (response.result.length != 0) {
                            const PasswordNew = RandomPass(8);
                            let email = {
                                to: Email,
                                subject: 'Yêu cầu lấy lại mật khẩu của bạn đã được thực hiện thành công.',
                                text:
                                    'Mật khẩu hiện tại của bạn là :' +
                                    PasswordNew +
                                    'Hãy đăng nhập lại vào hệ thống để trải nghiệm  ' +
                                    'https://localhost:3000"',
                            };
                            console.log(response.result);
                            let User = {
                                ID: response.result[0].ID,
                                Username: response.result[0].Username,
                                Password: PasswordNew,
                                Name: response.result[0].Name,
                                Email: response.result[0].Email,
                                CheckAdmin: response.result[0].CheckAdmin,
                                Money: response.result[0].Money,
                                SDT: response.result[0].SDT,
                                SEX: response.result[0].SEX,
                                DateOfBirth: response.result[0].DateOfBirth,
                                Avatar: response.result[0].Avatar,
                            };
                            axios
                                .put('/accountlogin/update', User, {
                                    headers: {
                                        'content-type': 'application/x-www-form-urlencoded',
                                    },
                                })
                                .then((response) => {
                                    if (response.result) {
                                        console.log(response.result);
                                    }
                                });
                            axios
                                .post('/send-email', email, {
                                    headers: {
                                        'content-type': 'application/x-www-form-urlencoded',
                                    },
                                })
                                .then((response) => {
                                    if (response.result) {
                                        console.log(response);
                                    }
                                });
                            Swal.fire(
                                'Logged in successfully!',
                                'Mật khẩu mới đã được gửi tới email của bạn.Vui lòng kiểm tra !!!',
                                'success',
                            );
                            navigate('/Login');
                        } else {
                            Swal.fire('Logged in successfully!', 'Email không tồn tại. Vui lòng kiểm tra !!!', 'error');
                            // navigate('/');
                        }
                    });
            }
        } catch (error) {
            console.log(error);
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
            <div className={cx('form')}>
                <h3 className={cx('heading')}>Quên mật khẩu</h3>

                <div className={cx('spacer')}></div>
                <Form.Group className={cx('Email-wrapper')} as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        className={cx('Email')}
                        name="Name"
                        required
                        type="text"
                        placeholder="Email"
                        size="lg"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <div className={cx('group_btn')}>
                    <button className={cx('btn')} onClick={() => handleOnClick()}>
                        Quên mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordLayout;
