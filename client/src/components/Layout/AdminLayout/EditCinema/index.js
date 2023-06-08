import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditCinema.module.scss';
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

function EditCinema(props) {
    const [Cinema, setCinema] = useState([]);
    const [Halls, setHalls] = useState([]);
    const navigate = useNavigate();
    const fetchData = async (API, setAPI) => {
        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            await axiosClient
                .post(
                    API,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    setAPI(response.result);
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        setCinema(JSON.parse(localStorage.getItem('Cinema')));
        fetchData('/halls/cinema/' + JSON.parse(localStorage.getItem('Cinema')).ID, setHalls);
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        CinemaName: yup.string().required(),
        Address: yup.string().required(),
        Phone: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const ListHalls = [];
    const handleSubmit = async (values, actions) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        values['ID'] = JSON.parse(localStorage.getItem('Cinema')).ID;
        axiosClient.put(
            axiosClient
                .put('/cinema/update', values, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log('Update Success');
                })
                .catch((error) => {
                    // Xử lý lỗi nếu yêu cầu thất bại
                    console.error(error);
                }),
        );
        console.log(ListHalls);
        ListHalls.map((values, index) => {
            axiosClient
                .put('/halls/update', values, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {})
                .catch((error) => {
                    // Xử lý lỗi nếu yêu cầu thất bại
                    console.error(error);
                });
        });
        // Xử lý dữ liệu form
        // Gửi dữ liệu đến server
        // ...
        // Reset form sau khi submit
        actions.resetForm();
        localStorage.removeItem('Cinema');
        localStorage.removeItem('EditCinema');
        navigate('/');
    };
    if (Halls) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin lịch chiếu</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            CinemaName: JSON.parse(localStorage.getItem('Cinema')).CinemaName,
                            Address: JSON.parse(localStorage.getItem('Cinema')).Address,
                            Phone: JSON.parse(localStorage.getItem('Cinema')).Phone,
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
                                    {Halls ? (
                                        Halls.map((value, index) => {
                                            if (ListHalls.length <= index) {
                                                ListHalls.push(value);
                                            }
                                            return (
                                                <Tab eventKey={index} title={'Phòng số' + value.HallNumber} key={index}>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} md="3" controlId="validationFormik03">
                                                            <Form.Label>Tên Phòng</Form.Label>
                                                            <Form.Control
                                                                size="lg"
                                                                type="text"
                                                                placeholder={value.HallNumber}
                                                                name="HallNumber"
                                                                onChange={(e) => {
                                                                    ListHalls[index].HallNumber = e.target.value;
                                                                }}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="3" controlId="validationFormik03">
                                                            <Form.Label>Loại Phòng</Form.Label>
                                                            <Form.Control
                                                                size="lg"
                                                                type="text"
                                                                placeholder={value.Class}
                                                                name="Class"
                                                                onChange={(e) => {
                                                                    ListHalls[index].Class = e.target.value;
                                                                }}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="3" controlId="validationFormik03">
                                                            <Form.Label>Số ghế</Form.Label>
                                                            <Form.Control
                                                                size="lg"
                                                                type="text"
                                                                placeholder={value.NumSeats}
                                                                name="NumSeats"
                                                                onChange={(e) => {
                                                                    ListHalls[index].NumSeats = e.target.value;
                                                                }}
                                                            />
                                                        </Form.Group>
                                                    </Row>
                                                    <TableSeats data={value} />
                                                </Tab>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
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
    }
}

export default EditCinema;
