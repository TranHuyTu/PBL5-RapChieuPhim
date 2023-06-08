import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditNSX.module.scss';
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

function EditNSX(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [NSX, setNSX] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        setPreviewImage(JSON.parse(localStorage.getItem('NSX')).Logo);
        setNSX(JSON.parse(localStorage.getItem('NSX')));
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        ID: yup.string().required(),
        Name: yup.string().required(),
        QuocGia: yup.string().required(),
        Logo: yup.string().required(),
        GioiThieu: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const handleSubmit = async (values, actions) => {
        if (selectedFile != null) {
            try {
                if (NSX.Logo != '') {
                    let Url = NSX.Logo.split('learn_nodejs/')[1];
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
                            values['Logo'] = response;
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
                            values['Logo'] = response;
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            values['Logo'] = NSX.Logo;
        }
        values['Logo'] = NSX.Logo;
        console.log(values);
        await axiosClient
            .put('/nsx/update', values, {
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
            })
            .then((response) => {
                console.log('Update Success');
            })
            .catch((error) => {
                // Xử lý lỗi nếu yêu cầu thất bại
                console.error(error);
            });
        // Xử lý dữ liệu form
        // Gửi dữ liệu đến server
        // ...
        // Reset form sau khi submit
        actions.resetForm();
        localStorage.removeItem('NSX');
        localStorage.removeItem('EditNSX');
        navigate('/');
    };
    const onChangeFile = function (e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    if (NSX) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            ID: NSX.ID,
                            Name: NSX.Name,
                            QuocGia: NSX.QuocGia,
                            Logo: NSX.Logo,
                            GioiThieu: NSX.GioiThieu,
                            terms: false,
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormik0">
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
                                        <Form.Label>Quốc gia</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder="Quoc Gia"
                                            name="QuocGia"
                                            value={values.QuocGia}
                                            onChange={handleChange}
                                            isInvalid={!!errors.QuocGia}
                                        />

                                        <Form.Control.Feedback type="invalid">{errors.QuocGia}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group className={cx('position-relative')}>
                                        <Form.Label>Upload Logo</Form.Label>
                                        <Form.Control
                                            className={cx('custom-file-input')}
                                            size="lg"
                                            type="file"
                                            required
                                            name="Logo"
                                            onChange={(e) => onChangeFile(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group className={cx('position-relative')}>
                                        <img className={cx('Avatar')} src={previewImage} alt={values.Name} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} md="12" controlId="validationFormik03">
                                        <Form.Label>Giới thiệu</Form.Label>
                                        <Form.Control
                                            className={cx('GioiThieu')}
                                            size="lg"
                                            as="textarea"
                                            type="text"
                                            placeholder="Giới Thiệu"
                                            name="GioiThieu"
                                            value={values.GioiThieu}
                                            onChange={handleChange}
                                            isInvalid={!!errors.GioiThieu}
                                            rows={4}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.GioiThieu}</Form.Control.Feedback>
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

export default EditNSX;
