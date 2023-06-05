import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditCinema.module.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import * as formik from 'formik';
import * as yup from 'yup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TableSeats from '../TableSeats';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const cx = classNames.bind(styles);

function EditCinema(props) {
    const [Cinema, setCinema] = useState([]);
    const [Halls, setHalls] = useState([]);
    const [dateTimeValue, setDateTimeValue] = useState('');

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
    useEffect(() => {
        setCinema(JSON.parse(localStorage.getItem('Cinema')));
        fetchData('http://localhost:8080/halls/cinema/' + JSON.parse(localStorage.getItem('Cinema')).ID, setHalls);
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        CinemaName: yup.string().required(),
        Address: yup.string().required(),
        Phone: yup.string().required(),
        // HallNumber: yup.string().required(),
        // Class: yup.string().required(),
        // NumSeats: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const handleSubmit = async (values, actions) => {
        const dateString = values.ShowtimeDateTime;
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedDate = `${year}-${month}-${day}` + 'T' + `${hours}:${minutes}:${seconds}` + '.000Z';
        console.log(formattedDate);
        values.ShowtimeDateTime = formattedDate;
        console.log(values.ShowtimeDateTime);
        // Xử lý dữ liệu form
        // Gửi dữ liệu đến server
        // ...
        // Reset form sau khi submit
        actions.resetForm();
    };
    const handleDateTimeChange = (event) => {
        setDateTimeValue(event.target.value);
    };
    if (Halls) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin lịch chiếu</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            CinemaName: JSON.parse(localStorage.getItem('Cinema')).CinemaName,
                            Address: JSON.parse(localStorage.getItem('Cinema')).Address,
                            Phone: JSON.parse(localStorage.getItem('Cinema')).Phone,
                            // HallNumber: '',
                            // Class: '',
                            // NumSeats: '',
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
                                            placeholder="Lịch chiếu"
                                            name="CinemaName"
                                            value={values.CinemaName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.CinemaName}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.CinemaName}
                                        </Form.Control.Feedback>
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
                                <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3">
                                    {Halls.map((value, index) => {
                                        const schema = yup.object().shape({
                                            HallNumber: yup.string().required(),
                                            Class: yup.string().required(),
                                            NumSeats: yup.string().required(),
                                            terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
                                        });
                                        return (
                                            <Tab eventKey={index} title={'Phòng số' + value.HallNumber} key={index}>
                                                <Formik
                                                    validationSchema={schema}
                                                    onSubmit={console.log}
                                                    initialValues={{
                                                        HallNumber: value.HallNumber,
                                                        Class: value.Class,
                                                        NumSeats: value.NumSeats,
                                                        terms: false,
                                                    }}
                                                >
                                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                                        <Form noValidate onSubmit={handleSubmit}>
                                                            <Row className="mb-3">
                                                                <Form.Group
                                                                    as={Col}
                                                                    md="3"
                                                                    controlId="validationFormik03"
                                                                >
                                                                    <Form.Label>Tên Phòng</Form.Label>
                                                                    <Form.Control
                                                                        size="lg"
                                                                        type="text"
                                                                        placeholder="Số Phòng"
                                                                        name="HallNumber"
                                                                        value={values.HallNumber}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.HallNumber}
                                                                    />

                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.HallNumber}
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                                <Form.Group
                                                                    as={Col}
                                                                    md="3"
                                                                    controlId="validationFormik03"
                                                                >
                                                                    <Form.Label>Loại Phòng</Form.Label>
                                                                    <Form.Control
                                                                        size="lg"
                                                                        type="text"
                                                                        placeholder="Loại Phòng"
                                                                        name="Class"
                                                                        value={values.Class}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.Class}
                                                                    />

                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.Class}
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                                <Form.Group
                                                                    as={Col}
                                                                    md="3"
                                                                    controlId="validationFormik03"
                                                                >
                                                                    <Form.Label>Số ghế</Form.Label>
                                                                    <Form.Control
                                                                        size="lg"
                                                                        type="text"
                                                                        placeholder="Số ghế"
                                                                        name="NumSeats"
                                                                        value={values.NumSeats}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!errors.NumSeats}
                                                                    />

                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.NumSeats}
                                                                    </Form.Control.Feedback>
                                                                </Form.Group>
                                                            </Row>
                                                            <TableSeats data={value} />
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
                                                            <Button type="submit" size="lg">
                                                                Submit form
                                                            </Button>
                                                        </Form>
                                                    )}
                                                </Formik>
                                                {/* <Row className="mb-3">
                                                    <Form.Group as={Col} md="3" controlId="validationFormik03">
                                                        <Form.Label>Tên Phòng</Form.Label>
                                                        <Form.Control
                                                            size="lg"
                                                            type="text"
                                                            placeholder="Số Phòng"
                                                            name="HallNumber"
                                                            value={values.HallNumber}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.HallNumber}
                                                        />

                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.HallNumber}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="3" controlId="validationFormik03">
                                                        <Form.Label>Loại Phòng</Form.Label>
                                                        <Form.Control
                                                            size="lg"
                                                            type="text"
                                                            placeholder="Loại Phòng"
                                                            name="Class"
                                                            value={values.Class}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.Class}
                                                        />

                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.Class}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="3" controlId="validationFormik03">
                                                        <Form.Label>Số ghế</Form.Label>
                                                        <Form.Control
                                                            size="lg"
                                                            type="text"
                                                            placeholder="Số ghế"
                                                            name="NumSeats"
                                                            value={values.NumSeats}
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.NumSeats}
                                                        />

                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.NumSeats}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row> */}
                                            </Tab>
                                        );
                                    })}
                                </Tabs>

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
                                    Sửa thông tin rạp
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        );
    } else {
        localStorage.removeItem('Cinema');
        localStorage.removeItem('EditCinema');
        navigate('/');
    }
}

export default EditCinema;
