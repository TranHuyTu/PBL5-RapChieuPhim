import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditShowtime.module.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import * as formik from 'formik';
import * as yup from 'yup';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function EditShowtime(props) {
    const [Showtime, setShowtime] = useState([]);
    const [ListSeat, setListSeat] = useState([]);
    const [ListHall, setListHall] = useState([]);
    const [ListMovie, setListMovie] = useState([]);
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
        setShowtime(JSON.parse(localStorage.getItem('showtime')));
        fetchData(
            'http://localhost:8080/halls/showtime/' + JSON.parse(localStorage.getItem('showtime')).HallID,
            setListSeat,
        );
        fetchData('http://localhost:8080/halls', setListHall);
        fetchData('http://localhost:8080/TrangChu', setListMovie);
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        ShowtimeID: yup.string().required(),
        MovieID: yup.string().required(),
        HallID: yup.string().required(),
        HallNumber: yup.string().required(),
        MovieName: yup.string().required(),
        HallNumber: yup.string().required(),
        ShowtimeDateTime: yup.date().required(),
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
    if (ListSeat !== [] && ListMovie !== [] && ListHall !== [] && Showtime !== []) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin lịch chiếu</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            ShowtimeID: '',
                            MovieID: '',
                            HallID: '',
                            HallNumber: '',
                            MovieName: '',
                            ShowtimeDateTime: '',
                            terms: false,
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="3" controlId="validationFormik03">
                                        <Form.Label>Lịch Chiếu</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="datetime-local"
                                            placeholder="Lịch chiếu"
                                            name="ShowtimeDateTime"
                                            value={
                                                Showtime.ShowtimeDateTime
                                                    ? Showtime.ShowtimeDateTime.substring(0, 16)
                                                    : ''
                                            }
                                            onChange={handleChange}
                                            isInvalid={!!errors.ReleaseYear}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.ReleaseYear}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="3" controlId="validationFormik05">
                                        <Form.Label>Tên Phim</Form.Label>
                                        <Form.Select size="lg" name="IDNSX" onChange={handleChange}>
                                            <option>{Showtime.MovieName}</option>
                                            {ListMovie.map((value, index) => (
                                                <option value={value.ID} key={index}>
                                                    {value.MovieName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                                        <Form.Label>Chọn phòng chiếu</Form.Label>
                                        <Form.Select size="lg" name="IDDirector" onChange={handleChange}>
                                            <option>{Showtime.HallNumber}</option>
                                            {ListHall.map((value, index) => (
                                                <option value={value.ID} key={index}>
                                                    {value.HallNumber}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik04">
                                        <Form.Label>Ghế được đặt</Form.Label>
                                        <Form.Select
                                            size="lg"
                                            name="ListSeat"
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                            }}
                                        >
                                            <option>Chọn Ghế</option>
                                            {ListSeat.map((value, index) => (
                                                <option value={value.ID} key={index}>
                                                    {value.ID}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {/* <ul>
                                            {ListSeat ? (
                                                ListSeat.map((value, index) => {
                                                    if (value.CheckSeat) {
                                                        return (
                                                            <li key={index}>
                                                                {value.ID}
                                                                <a
                                                                    className={cx('btn_delete_actor')}
                                                                    onClick={() => {}}
                                                                >
                                                                    X
                                                                </a>
                                                            </li>
                                                        );
                                                    }
                                                })
                                            ) : (
                                                <p>Ko co ghế nào được đặt</p>
                                            )}
                                        </ul> */}
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
                                    Sửa Phim
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        );
    } else {
        localStorage.removeItem('showtime');
        localStorage.removeItem('EditShowtime');
        navigate('/');
    }
}

export default EditShowtime;
