import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditPromotion.module.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '~/api/axiosClient';

const cx = classNames.bind(styles);

function EditPromotion(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [Promotion, setPromotion] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        setPreviewImage(JSON.parse(localStorage.getItem('Promotion')).AvatarLink);
        setPromotion(JSON.parse(localStorage.getItem('Promotion')));
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        ID: yup.string().required(),
        Title: yup.string().required(),
        Content: yup.string().required(),
        Start_time: yup.date().required(),
        End_time: yup.date().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const onChangeFile = function (e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };
    const convertTime = function (inputDateString) {
        const inputDate = new Date(inputDateString);

        const year = inputDate.getUTCFullYear();
        const month = inputDate.getUTCMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cộng thêm 1
        const day = inputDate.getUTCDate();
        const hours = inputDate.getUTCHours();
        const minutes = inputDate.getUTCMinutes();
        const seconds = inputDate.getUTCSeconds();

        const outputDateString = `${year}-${month.toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.000Z`;

        return outputDateString;
    };
    const convertTimeZone = function (inputDateString) {
        const inputDate = new Date(inputDateString);

        const year = inputDate.getFullYear();
        const month = inputDate.getMonth() + 1; // Tháng trong JavaScript đếm từ 0, nên cộng thêm 1
        const day = inputDate.getDate();
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const seconds = inputDate.getSeconds();

        const outputDateString = `${year}-${month.toString().padStart(2, '0')}-${day
            .toString()
            .padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.000Z`;

        return outputDateString;
    };
    const handleSubmit = async (values, actions) => {
        if (selectedFile != null) {
            try {
                if (Promotion.AvatarLink != '') {
                    let Url = Promotion.AvatarLink.split('learn_nodejs/')[1];
                    const UrlDelete = { imageUrl: 'learn_nodejs/' + Url.split('.')[0] };
                    await axiosClient
                        .post('/pathImg', UrlDelete, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        })
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    await axiosClient
                        .post(
                            '/upload',
                            { image: selectedFile },
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            },
                        )
                        .then((response) => {
                            setPreviewImage(response);
                            values['AvatarLink'] = response;
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    await axiosClient
                        .post(
                            '/upload',
                            { image: selectedFile },
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            },
                        )
                        .then((response) => {
                            setPreviewImage(response);
                            values['AvatarLink'] = response;
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            values['AvatarLink'] = Promotion.AvatarLink;
        }
        console.log(values);
        values.Start_time = convertTimeZone(values.Start_time);
        values.End_time = convertTimeZone(values.End_time);
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        await axiosClient
            .put('/promotion/update', values, {
                headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
            })
            .then((response) => {
                console.log('Update Success');
            })
            .catch((error) => {
                // Xử lý lỗi nếu yêu cầu thất bại
                console.error(error);
            });
        actions.resetForm();
        localStorage.removeItem('Promotion');
        localStorage.removeItem('EditPromotion');
        navigate('/');
    };
    if (Promotion) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            ID: Promotion.ID,
                            Title: Promotion.Title,
                            Content: Promotion.Content,
                            Start_time: Promotion.Start_time,
                            End_time: Promotion.End_time,
                            terms: false,
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder="Title"
                                            name="Title"
                                            value={values.Title}
                                            onChange={handleChange}
                                            isInvalid={!!errors.Title}
                                            as="textarea"
                                            rows={4}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Title}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                        <Form.Label>Content</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder="Content"
                                            name="Content"
                                            value={values.Content}
                                            onChange={handleChange}
                                            isInvalid={!!errors.Content}
                                            as="textarea"
                                            rows={4}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Content}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group className={cx('position-relative')}>
                                        <Form.Label>Upload Image</Form.Label>
                                        <Form.Control
                                            className={cx('custom-file-input')}
                                            size="lg"
                                            type="file"
                                            required
                                            name="AvatarLink"
                                            onChange={(e) => onChangeFile(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx('position-relative')}>
                                        <img className={cx('Avatar')} src={previewImage} alt={values.Name} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                        <Form.Label>Start_time</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="datetime-local"
                                            placeholder="Start_time"
                                            name="Start_time"
                                            // value={values.Start_time}
                                            onChange={(e) => {
                                                values.Start_time = convertTime(e.target.value);
                                            }}
                                            isInvalid={!!errors.Start_time}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.Start_time}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                        <Form.Label>End_time</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="datetime-local"
                                            placeholder="End_time"
                                            name="End_time"
                                            // value={values.End_time}
                                            onChange={(e) => {
                                                values.End_time = convertTime(e.target.value);
                                            }}
                                            isInvalid={!!errors.End_time}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.End_time}</Form.Control.Feedback>
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
    }
}

export default EditPromotion;
