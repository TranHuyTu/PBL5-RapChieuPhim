import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';

const cx = classNames.bind(styles);

let imgBGR = [
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/mQjeuj9daalPzpqllOB2dnmWzCV.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/u3M1bVxEbIe3BVkFJWwMi8DIea1.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/tvVVdUf7GuUGpCYg10Sj5RIz0cf.jpg',
    'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg',
];
const initFormValue = {
    Username: '',
    Password: '',
    Name: '',
    Email: '',
    SDT: '',
    SEX: '',
    DateOfBirth: '',
};
function RegisterLayout({ chilren }) {
    const [formValue, setFormValue] = useState(initFormValue);

    let history = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        event.preventDefault();
    };

    useLayoutEffect(() => {
        localStorage.clear();
    }, []);
    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormValue({ ...formValue, [name]: value });
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
            <Form noValidate validated={validated} className={cx('form')} onSubmit={handleSubmit}>
                <h3 className={cx('heading')}>Đăng kí</h3>

                <div className={cx('spacer')}></div>
                <Row className="mb-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="Name"
                            required
                            type="text"
                            placeholder="First name"
                            size="lg"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="Username"
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            required
                            size="lg"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="Password"
                            type="password"
                            id="inputPassword"
                            aria-describedby="passwordHelpBlock"
                            size="lg"
                            onChange={handleChange}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and numbers, and must not
                            contain spaces, special characters, or emoji.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="Email"
                            type="email"
                            placeholder="Email"
                            required
                            size="lg"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>SDT</Form.Label>
                        <Form.Control
                            name="SDT"
                            type="text"
                            placeholder="SDT"
                            required
                            size="lg"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">Please provide a valid zip.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                        <Form.Label>SEX</Form.Label>
                        <Form.Select name="SEX" size="lg" onChange={handleChange}>
                            <option>Giới tính</option>
                            <option value="1">NAM</option>
                            <option value="2">NỮ</option>
                            <option value="3">KHÁC</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Please provide a valid zip.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom07">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control name="DateOfBirth" type="Date" required size="lg" onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-2">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <div className={cx('group_btn')}>
                    <button
                        type="submit"
                        className={cx('btn')}
                        onClick={() => {
                            if (
                                formValue.Username !== '' &&
                                formValue.Password !== '' &&
                                formValue.Name !== '' &&
                                formValue.Email !== '' &&
                                formValue.SDT !== '' &&
                                formValue.SEX !== '' &&
                                formValue.DateOfBirth !== ''
                            ) {
                                try {
                                    axios
                                        .post('http://localhost:8080/register', formValue, {
                                            headers: {
                                                'content-type': 'application/x-www-form-urlencoded',
                                            },
                                        })
                                        .then((response) => {
                                            if (response.data.result) {
                                                Swal.fire({
                                                    position: 'top-end',
                                                    icon: 'success',
                                                    title: 'Your work has been saved',
                                                    showConfirmButton: false,
                                                    timer: 1500,
                                                });
                                                history('/login');
                                            } else {
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Do you want to continue',
                                                    icon: 'error',
                                                    confirmButtonText: 'Cool',
                                                });
                                            }
                                        });
                                } catch (error) {
                                    console.log(error);
                                }
                            } else {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Do you want to continue',
                                    icon: 'error',
                                    confirmButtonText: 'Cool',
                                });
                            }
                        }}
                    >
                        ĐĂNG KÍ
                    </button>
                    <button
                        className={cx('btn')}
                        onClick={() => {
                            history('/login');
                        }}
                    >
                        ĐĂNG NHẬP
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default RegisterLayout;
