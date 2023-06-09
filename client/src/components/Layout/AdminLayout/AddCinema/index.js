import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './AddCinema.module.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TableSeats from '../TableSeats';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '~/api/axiosClient';

const cx = classNames.bind(styles);

function AddCinema(props) {
    const [ListHall, setListHall] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {}, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        CinemaName: yup.string().required(),
        Address: yup.string().required(),
        Phone: yup.string().required(),
        Class: yup.string().required(),
        NumSeats: yup.string().required(),
        HallNumber: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const handleSubmit = async (values, actions) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        const Cinema = {
            CinemaName: values.CinemaName,
            Address: values.Address,
            Phone: values.Phone,
        };
        let IDNewCinema = 0;
        await axiosClient
            .post('/cinema/add', Cinema, {
                headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
            })
            .then((response) => {
                console.log(response.result);
                IDNewCinema = response.result.insertId + '';
            })
            .catch((error) => {
                // Xử lý lỗi nếu yêu cầu thất bại
                console.error(error);
            });
        console.log(IDNewCinema);
        ListHall.map(async (value, index) => {
            const Hall = {
                Class: value.Class,
                NumSeats: value.NumSeats,
                CinemaID: IDNewCinema,
                IDShowtime: '1',
                HallNumber: value.HallNumber,
            };
            let IDHalls = 0;
            await axiosClient
                .post('/halls/add', Hall, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log(response);
                    IDHalls = response.result.insertId + '';
                })
                .catch((error) => {
                    // Xử lý lỗi nếu yêu cầu thất bại
                    console.error(error);
                });
            for (let i = 0; i < value.NumSeats; i++) {
                const seat = {
                    CheckSeat: 0,
                    IDHalls: IDHalls,
                };
                await axiosClient
                    .post('/Seat/add', seat, {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    })
                    .then((response) => {})
                    .catch((error) => {
                        // Xử lý lỗi nếu yêu cầu thất bại
                        console.error(error);
                    });
            }
        });
        // Xử lý dữ liệu form
        // Gửi dữ liệu đến server
        // ...
        // Reset form sau khi submit
        actions.resetForm();
        localStorage.removeItem('AddCinema');
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <h1 className={cx('title')}>Thêm rạp</h1>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        CinemaName: '',
                        Address: '',
                        Phone: '',
                        Class: '',
                        NumSeats: '',
                        HallNumber: '',
                        terms: false,
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>Tên Rạp</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Tên rạp"
                                        name="CinemaName"
                                        value={values.CinemaName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.CinemaName}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.CinemaName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="SĐT"
                                        name="Phone"
                                        value={values.Phone}
                                        onChange={handleChange}
                                        isInvalid={!!errors.Phone}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.Phone}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationFormik03">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Địa chỉ"
                                        name="Address"
                                        value={values.Address}
                                        onChange={handleChange}
                                        isInvalid={!!errors.Address}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Address}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFormik03">
                                    <Form.Label>Loại phòng</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Loại phòng"
                                        name="Class"
                                        value={values.Class}
                                        onChange={handleChange}
                                        isInvalid={!!errors.Class}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.Class}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik03">
                                    <Form.Label>Số lượng ghế</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Số ghế"
                                        name="NumSeats"
                                        value={values.NumSeats}
                                        onChange={handleChange}
                                        isInvalid={!!errors.NumSeats}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.NumSeats}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik03">
                                    <Form.Label>Số phòng</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Số phòng"
                                        name="HallNumber"
                                        value={values.HallNumber}
                                        onChange={handleChange}
                                        isInvalid={!!errors.HallNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.HallNumber}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <p className={cx('warning')}>Bạn muốn lâp số phòng : {ListHall.length}</p>
                            <button
                                type="button"
                                className={cx('btn-add-halls')}
                                onClick={() => {
                                    console.log(values);
                                    if (ListHall == []) {
                                        setListHall(values);
                                    } else {
                                        setListHall([values, ...ListHall]);
                                    }
                                }}
                            >
                                Add
                            </button>
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
                                Thêm danh sách rạp
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}

export default AddCinema;
