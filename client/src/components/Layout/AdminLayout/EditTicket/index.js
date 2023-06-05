import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditTicket.module.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import moment from 'moment';
import * as formik from 'formik';
import * as yup from 'yup';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function EditTicket(props) {
    const navigate = useNavigate();
    const fetchData = async (API, setAPI) => {
        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            await axios
                .post(
                    API,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    setAPI(response.data.result);
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {}, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        DayOfWeek: yup.string().required(),
        Price: yup.string().required(),
        PriceID: yup.string().required(),
        TicketType: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const handleSubmit = async (values, actions) => {
        console.log(values);
        // Xử lý dữ liệu form
        // Gửi dữ liệu đến server
        // ...
        // Reset form sau khi submit
        actions.resetForm();
    };
    let Ticket = JSON.parse(localStorage.getItem('Ticket'));
    if (Ticket) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            DayOfWeek: Ticket.DayOfWeek,
                            Price: Ticket.Price,
                            PriceID: Ticket.PriceID,
                            TicketType: Ticket.TicketType,
                            terms: false,
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit} className={cx('form')}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationFormik03">
                                        <Form.Label>Loại vé</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder="Loại Vé"
                                            name="TicketType"
                                            value={values.TicketType}
                                            onChange={handleChange}
                                            isInvalid={!!errors.TicketType}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.TicketType}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="12" controlId="validationFormik03">
                                        <Form.Label>Giá</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                size="lg"
                                                type="text"
                                                placeholder="Gia"
                                                name="Price"
                                                value={values.Price}
                                                onChange={handleChange}
                                                isInvalid={!!errors.Price}
                                            />
                                            <InputGroup.Text id="inputGroupPrepend">Đ</InputGroup.Text>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a username.
                                            </Form.Control.Feedback>
                                        </InputGroup>

                                        <Form.Control.Feedback type="invalid">{errors.Price}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="12" controlId="validationFormik05">
                                        <Form.Label>Ngày trong tuần</Form.Label>
                                        <Form.Select size="lg" name="DayOfWeek" onChange={handleChange}>
                                            <option>{values.DayOfWeek}</option>
                                            <option>Monday</option>
                                            <option>Tuesday</option>
                                            <option>Wednesday</option>
                                            <option>Thursday</option>
                                            <option>Friday</option>
                                            <option>Saturday</option>
                                            <option>Sunday</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        required
                                        name="terms"
                                        label="Agree to terms and conditions"
                                        onChange={handleChange}
                                        isInvalid={!!errors.terms}
                                        feedback={errors.terms}
                                        feedbackType="invalid"
                                        id="validationFormik0"
                                    />
                                </Form.Group>
                                <Button className={cx('Submit')} type="submit" size="lg">
                                    Sửa Thông Tin
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        );
    } else {
        localStorage.removeItem('Ticket');
        localStorage.removeItem('EditTicket');
        navigate('/');
    }
}

export default EditTicket;
