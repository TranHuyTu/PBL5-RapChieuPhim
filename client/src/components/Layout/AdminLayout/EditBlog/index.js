import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditBlog.module.scss';
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

function EditBlog(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [Blog, setBlog] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        setPreviewImage(JSON.parse(localStorage.getItem('Blog')).Image);
        setBlog(JSON.parse(localStorage.getItem('Blog')));
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        ID: yup.string().required(),
        Title: yup.string().required(),
        Content: yup.string().required(),
        Type: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const onChangeFile = function (e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };
    const handleSubmit = async (values, actions) => {
        if (selectedFile != null) {
            try {
                if (Blog.Image != '') {
                    let Url = Blog.Image.split('learn_nodejs/')[1];
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
            values['Image'] = Blog.Image;
        }
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        await axiosClient
            .put('/Blog/update', values, {
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
        localStorage.removeItem('Blog');
        localStorage.removeItem('EditBlog');
        navigate('/');
    };
    if (Blog) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            ID: Blog.ID,
                            Title: Blog.Title,
                            Content: Blog.Content,
                            Type: Blog.Type,
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
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                        <Form.Label>Loại</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder="Type"
                                            name="Type"
                                            value={values.Type}
                                            onChange={handleChange}
                                            isInvalid={!!errors.Type}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.Type}</Form.Control.Feedback>
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

export default EditBlog;
