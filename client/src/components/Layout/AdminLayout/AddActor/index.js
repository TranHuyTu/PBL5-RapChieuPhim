import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './AddActor.module.scss';
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

function AddActor(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [Actor, setActor] = useState('');

    const navigate = useNavigate();
    useEffect(() => {}, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        ID: yup.string().required(),
        Name: yup.string().required(),
        Country: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const onChangeFile = function (e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmitClick = async (values) => {
        if (selectedFile != null) {
            try {
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
            } catch (error) {
                console.log(error);
            }
        }
        console.log(values);
        let actor = {
            Name: values.Name,
            Country: values.Country,
            AvatarLink: values.AvatarLink,
        };
        await axiosClient
            .post('/actors/add', actor, {
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
            })
            .then((response) => {
                console.log('Update Success');
            })
            .catch((error) => {
                // Xử lý lỗi nếu yêu cầu thất bại
                console.error(error);
            });

        if (localStorage.getItem('Actor')) {
            localStorage.removeItem('Actor');
        }
        localStorage.removeItem('Actor');
        localStorage.removeItem('AddActor');
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <h1 className={cx('title')}>Thêm diễn viên</h1>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        ID: '',
                        Name: '',
                        Country: '',
                        terms: false,
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ten"
                                        name="Name"
                                        value={values.Name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.Name}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>Quốc tịch</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Quoc tich"
                                        name="Country"
                                        value={values.Country}
                                        onChange={handleChange}
                                        isInvalid={!!errors.Country}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.Country}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className={cx('position-relative')}>
                                    <Form.Label>Upload Avatar</Form.Label>
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
                            <Button
                                className={cx('Submit')}
                                type="submit"
                                size="lg"
                                onClick={() => handleSubmitClick(values)}
                            >
                                Thêm diễn viên
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}

export default AddActor;
