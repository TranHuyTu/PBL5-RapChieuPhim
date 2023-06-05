import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditFood.module.scss';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import * as formik from 'formik';
import * as yup from 'yup';
import InputGroup from 'react-bootstrap/InputGroup';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

function EditFood(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

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
        setPreviewImage(JSON.parse(localStorage.getItem('Food')).AvatarLink);
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        ID: yup.string().required(),
        AvatarLink: yup.string().required(),
        Description: yup.string().required(),
        ItemName: yup.string().required(),
        Price: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const handleSubmit = async (values, actions) => {
        console.log(values);
        // Xử lý dữ liệu form
        // Gửi dữ liệu đến server
        // ...
        // Reset form sau khi submit
        actions.resetForm();
    };
    const onChangeFile = function (e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };
    let Food = JSON.parse(localStorage.getItem('Food'));
    if (Food) {
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin</h1>
                    <Formik
                        validationSchema={schema}
                        onSubmit={console.log}
                        initialValues={{
                            AvatarLink: Food.ItemName,
                            Description: Food.Description,
                            ID: Food.ID,
                            ItemName: Food.ItemName,
                            Price: Food.Price,
                            terms: false,
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="3" controlId="validationFormik03">
                                        <Form.Label>Tên Combo</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder="Ten"
                                            name="ItemName"
                                            value={values.ItemName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.ItemName}
                                        />

                                        <Form.Control.Feedback type="invalid">{errors.ItemName}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="validationFormik03">
                                        <Form.Label>Giá</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                size="lg"
                                                type="text"
                                                placeholder="Gia"
                                                name="Price"
                                                value={values.Price}
                                                onChange={handleChange}
                                                isInvalid={!!errors.Price}
                                            />
                                            <InputGroup.Text id="inputGroupPrepend">Đ</InputGroup.Text>
                                            <Form.Control.Feedback type="invalid">
                                                Please choose a username.
                                            </Form.Control.Feedback>
                                        </InputGroup>

                                        <Form.Control.Feedback type="invalid">{errors.Price}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                                        <Form.Label>Chi Tiết</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder="Chi Tiết"
                                            name="Description"
                                            value={values.Description}
                                            onChange={handleChange}
                                            isInvalid={!!errors.Description}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.Description}
                                        </Form.Control.Feedback>
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
                                            isInvalid={!!errors.AvatarLink}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.AvatarLink}
                                        </Form.Control.Feedback>
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
                                <Button className={cx('Submit')} type="submit" size="lg">
                                    Sửa Thông Tin
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        );
    } else {
        localStorage.removeItem('Food');
        localStorage.removeItem('EditFood');
        navigate('/');
    }
}

export default EditFood;
