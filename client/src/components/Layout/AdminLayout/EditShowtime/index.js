import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditShowtime.module.scss';
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

function EditShowtime(props) {
    const [Showtime, setShowtime] = useState([]);
    const [ListSeat, setListSeat] = useState([]);
    const [ListSeatNew, setListSeatNew] = useState([]);
    const [ListHall, setListHall] = useState([]);
    const [ListMovie, setListMovie] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setShowtime(JSON.parse(localStorage.getItem('showtime')));
        const FetchAPI = async function () {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axiosClient
                    .post(
                        '/halls/showtime/' + JSON.parse(localStorage.getItem('showtime')).HallID,
                        { a: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setListSeat(response.result);
                    })
                    .catch((error) => {
                        // Xử lý lỗi nếu yêu cầu thất bại
                        console.error(error);
                    });
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
                await axiosClient
                    .post(
                        '/halls/showtime/' + JSON.parse(localStorage.getItem('showtime')).HallID,
                        { a: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
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
                console.error(error);
            }
        };
        FetchAPI();
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
    const ValueEdit = {
        ShowtimeID: Showtime.ShowtimeID,
        MovieID: Showtime.MovieID,
        HallID: Showtime.HallID,
        HallNumber: Showtime.HallNumber,
        ShowtimeDateTime: Showtime.ShowtimeDateTime,
    };
    const handleClick = () => {
        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            axiosClient
                .put('/showtime/update', ValueEdit, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log('Update Success');
                })
                .catch((error) => {
                    // Xử lý lỗi nếu yêu cầu thất bại
                    console.error(error);
                });
            let Hall = {
                HallID: '',
                Class: '',
                NumSeats: '',
                CinemaID: '',
                IDShowtime: '',
                HallNumber: ValueEdit.HallNumber,
            };

            if (ListHall) {
                ListHall.map((value, index) => {
                    if (value.HallID === ValueEdit.HallID) {
                        Hall.IDShowtime = value.IDShowtime;
                        Hall.HallID = value.HallID;
                        Hall.Class = value.Class;
                        Hall.NumSeats = value.NumSeats;
                        Hall.CinemaID = value.CinemaID;
                    }
                });
            }

            axiosClient
                .put('/halls/update', Hall, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {})
                .catch((error) => {
                    // Xử lý lỗi nếu yêu cầu thất bại
                    console.error(error);
                });
            ListSeat.map((value, index) => {
                let val = {
                    ID: value.ID,
                    CheckSeat: 0,
                    IDHalls: value.HallID,
                };
                axiosClient
                    .put('/Seat/update', val, {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    })
                    .then((response) => {})
                    .catch((error) => {
                        // Xử lý lỗi nếu yêu cầu thất bại
                        console.error(error);
                    });
            });
            ListSeatNew.map((value, index) => {
                let val = {
                    ID: value.ID,
                    CheckSeat: 1,
                    IDHalls: value.HallID,
                };
                axiosClient
                    .put('/Seat/update', val, {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    })
                    .then((response) => {})
                    .catch((error) => {
                        // Xử lý lỗi nếu yêu cầu thất bại
                        console.error(error);
                    });
            });
            localStorage.removeItem('showtime');
            localStorage.removeItem('EditShowtime');
            navigate('/Admin');
        } catch (error) {
            console.error(error);
        }
    };
    if (ListMovie && ListHall && ListMovie && Showtime) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin lịch chiếu</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            ShowtimeID: Showtime.ShowtimeID,
                            MovieID: Showtime.MovieID,
                            HallID: Showtime.HallID,
                            HallNumber: Showtime.HallNumber,
                            MovieName: Showtime.MovieName,
                            ShowtimeDateTime: Showtime.ShowtimeDateTime,
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
                                                ValueEdit.ShowtimeDateTime = e.target.value + ':00.000Z';
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
                                                ValueEdit.MovieID = e.target.value;
                                            }}
                                        >
                                            <option>{Showtime.MovieName}</option>
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
                                            onChange={(e) => {
                                                ValueEdit.HallNumber = e.target.value.split(',')[0];
                                                console.log(e.target.value.split(',')[0], e.target.value.split(',')[1]);
                                                const token = localStorage.getItem('token-login');
                                                const _token = token.substring(1, token.length - 1);
                                                try {
                                                    axiosClient
                                                        .post(
                                                            '/halls/showtime/' + e.target.value.split(',')[1],
                                                            { a: 1 },
                                                            {
                                                                headers: {
                                                                    'content-type': 'application/x-www-form-urlencoded',
                                                                    authorization: _token,
                                                                },
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
                                            }}
                                        >
                                            <option value={[Showtime.HallNumber, Showtime.HallID]}>
                                                {Showtime.HallNumber}
                                            </option>
                                            {ListHall.map((value, index) => (
                                                <option value={[value.HallNumber, value.HallID]} key={value.HallID}>
                                                    {value.HallNumber}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Ghế được đặt</Form.Label>
                                        <Form.Select
                                            size="lg"
                                            name="ListSeat"
                                            onChange={(e) => {
                                                let checkExist = false;
                                                if (ListSeatNew) {
                                                    ListSeatNew.map((seat) => {
                                                        if (seat.ID == e.target.value) {
                                                            checkExist = true;
                                                        }
                                                    });
                                                }
                                                if (checkExist == false) {
                                                    ListSeat.map((value) => {
                                                        if (value.ID == e.target.value) {
                                                            if (ListSeatNew) {
                                                                setListSeatNew([value, ...ListSeatNew]);
                                                            } else {
                                                                setListSeatNew([value]);
                                                            }
                                                        }
                                                    });
                                                }
                                            }}
                                        >
                                            <option>Chọn Ghế</option>
                                            {ListSeat.map((value, index) => (
                                                <option value={value.ID} key={index}>
                                                    {value.ID}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <ul>
                                            {ListSeatNew ? (
                                                ListSeatNew.map((value, index) => {
                                                    return (
                                                        <li key={index} className={cx('seat')}>
                                                            {value.ID}
                                                            <button
                                                                className={cx('btn_delete_actor')}
                                                                onClick={() => {
                                                                    const objectIdToRemove = value.ID;
                                                                    const newListSeat = [];
                                                                    ListSeatNew.map((item) => {
                                                                        if (item.ID !== objectIdToRemove) {
                                                                            newListSeat.push(item);
                                                                        }
                                                                    });
                                                                    setListSeatNew(newListSeat);
                                                                }}
                                                            >
                                                                X
                                                            </button>
                                                        </li>
                                                    );
                                                })
                                            ) : (
                                                <p>Ko co ghế nào được đặt</p>
                                            )}
                                        </ul>
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
                                    Sửa Phim
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        );
    }
}

export default EditShowtime;
