import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './AddShowtime.module.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import axiosClient from '~/api/axiosClient';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddShowtime(props) {
    const [ListSeat, setListSeat] = useState([]);
    const [ListSeatNew, setListSeatNew] = useState([]);
    const [ListHall, setListHall] = useState([]);
    const [ListMovie, setListMovie] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const FetchAPI = async function () {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axiosClient
                    .post(
                        '/halls',
                        { a: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setListHall(response.result);
                    })
                    .catch((error) => {
                        // Xử lý lỗi nếu yêu cầu thất bại
                        console.error(error);
                    });
                await axiosClient
                    .post(
                        '/TrangChu',
                        { a: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setListMovie(response.result);
                    })
                    .catch((error) => {
                        // Xử lý lỗi nếu yêu cầu thất bại
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        FetchAPI();
        const ValueAdd = {
            MovieID: '',
            HallNumber: '',
            ShowtimeDateTime: '',
        };
        localStorage.setItem('ValueAdd', JSON.stringify(ValueAdd));
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        ShowtimeID: yup.string().required(),
        MovieID: yup.string().required(),
        HallID: yup.string().required(),
        HallNumber: yup.string().required(),
        MovieName: yup.string().required(),
        ShowtimeDateTime: yup.date().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const handleClick = async () => {
        let ValueAdd = JSON.parse(localStorage.getItem('ValueAdd'));
        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            const showtime = {
                MovieID: ValueAdd.MovieID,
                ShowtimeDateTime: ValueAdd.ShowtimeDateTime,
            };
            const hall = {
                Class: '',
                NumSeats: '',
                CinemaID: '',
                IDShowtime: '',
                HallNumber: '',
            };
            const seat = {
                CheckSeat: 0,
                IDHalls: '',
            };
            if (ListHall) {
                ListHall.map((value, index) => {
                    if (value.HallNumber == ValueAdd.HallNumber) {
                        hall.Class = value.Class;
                        hall.NumSeats = value.NumSeats;
                        hall.CinemaID = value.CinemaID;
                        hall.HallNumber = value.HallNumber;
                    }
                });
            }
            await axiosClient
                .post('/showtime/add', showtime, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    hall.IDShowtime = response.result.insertId + '';
                })
                .catch((error) => {
                    // Xử lý lỗi nếu yêu cầu thất bại
                    console.error(error);
                });
            console.log(ListHall, hall);
            await axiosClient
                .post('/halls/add', hall, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    seat.IDHalls = response.result.insertId + '';
                })
                .catch((error) => {
                    // Xử lý lỗi nếu yêu cầu thất bại
                    console.error(error);
                });
            console.log(seat);
            for (let i = 0; i < 41; i++) {
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

            localStorage.removeItem('ValueAdd');
            localStorage.removeItem('AddShowtime');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
    const handleHalls = (e) => {
        let ValueAdd = JSON.parse(localStorage.getItem('ValueAdd'));
        ValueAdd.HallNumber = e.target.value;
        console.log(ValueAdd);
        localStorage.setItem('ValueAdd', JSON.stringify(ValueAdd));
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            axiosClient
                .post(
                    '/halls/showtime/' + e.target.value,
                    { a: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    setListSeat(response.result);
                    const List = [];
                    response.result.map((value, index) => {
                        if (value.CheckSeat !== 0) {
                            List.push(value);
                        }
                    });
                    setListSeatNew(List);
                })
                .catch((error) => {
                    // Xử lý lỗi nếu yêu cầu thất bại
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
    };
    if (ListMovie && ListHall && ListMovie) {
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
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Lịch Chiếu</Form.Label>
                                        <Form.Control
                                            id="ShowtimeDateTime"
                                            size="lg"
                                            type="datetime-local"
                                            name="ShowtimeDateTime"
                                            onChange={(e) => {
                                                let ValueAdd = JSON.parse(localStorage.getItem('ValueAdd'));
                                                ValueAdd.ShowtimeDateTime = e.target.value + ':00.000Z';
                                                console.log(ValueAdd);
                                                localStorage.setItem('ValueAdd', JSON.stringify(ValueAdd));
                                            }}
                                            isInvalid={!!errors.ReleaseYear}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.ReleaseYear}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Tên Phim</Form.Label>
                                        <Form.Select
                                            id="MovieName"
                                            size="lg"
                                            name="MovieName"
                                            onChange={(e) => {
                                                let ValueAdd = JSON.parse(localStorage.getItem('ValueAdd'));
                                                ValueAdd.MovieID = e.target.value;
                                                console.log(ValueAdd);
                                                localStorage.setItem('ValueAdd', JSON.stringify(ValueAdd));
                                            }}
                                        >
                                            <option>Tên phim</option>
                                            {ListMovie.map((value, index) => (
                                                <option value={value.ID} key={index}>
                                                    {value.MovieName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3">
                                        <Form.Label>Chọn phòng chiếu</Form.Label>
                                        <Form.Select
                                            id="HallID"
                                            size="lg"
                                            name="HallID"
                                            onChange={(e) => handleHalls(e)}
                                        >
                                            <option>Số phòng</option>
                                            {ListHall.map((value, index) => (
                                                <option value={value.HallNumber} key={value.HallID}>
                                                    {value.HallNumber}
                                                </option>
                                            ))}
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
                                <Button className={cx('Submit')} type="submit" size="lg" onClick={() => handleClick()}>
                                    Thêm Lịch
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        );
    }
}

export default AddShowtime;
