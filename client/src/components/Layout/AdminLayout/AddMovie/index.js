import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './AddMovie.module.scss';
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
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';

const cx = classNames.bind(styles);

function AddMovie(props) {
    const [Movie, setMovie] = useState({
        AvatarMovie: '',
        GioiThieu: '',
        IDDirector: '',
        IDNSX: '',
        IDRevew: '',
        LinkReview: '',
        MovieName: '',
        Language: '',
        TimeMovie: '',
        TomTat: '',
        TypeMovie: '',
        terms: false,
    });
    const [Director, setDerector] = useState([]);
    const [NSX, setNSX] = useState([]);
    const [ListActor, setListActor] = useState([]);
    const [Actor, setActor] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const navigate = useNavigate();
    const fetchData = async (API, setAPI) => {
        try {
            await axios
                .post(API)
                .then((response) => {
                    setAPI(response.data.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    function ConverTime(DATETIME) {
        let datetime = [];
        if (DATETIME) {
            let DT = DATETIME.split('T');
            let time = DT[1].split(':');
            datetime.push(time[0], time[1], moment(DATETIME).format('DD-MM-YYYY'));
        } else {
            datetime = ['01', '90', '20-11-2023'];
        }
        return datetime;
    }
    function ConverTimeData(DATETIME) {
        let datetime = [];
        if (DATETIME) {
            let DT = DATETIME.split('T');
            let time;
            if (DT[1]) {
                time = DT[1].split(':');
            } else {
                time = ['00', '00'];
            }
            datetime.push(time[0], time[1], moment(DATETIME).format('YYYY-MM-DD'));
        } else {
            datetime = ['01', '90', '20-11-2023'];
        }
        return datetime;
    }
    useEffect(() => {
        fetchData('http://localhost:8080/directors', setDerector);
        fetchData('http://localhost:8080/nsx', setNSX);
        fetchData('http://localhost:8080/actors', setActor);
        setPreviewImage(
            'https://res.cloudinary.com/dbaul3mwo/image/upload/v1684349047/learn_nodejs/Kak%C3%A1_umal15.png',
        );
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        MovieName: yup.string().required(),
        TimeMovie: yup.string().required(),
        TypeMovie: yup.string().required(),
        Language: yup.string().required(),
        TomTat: yup.string().required(),
        LinkReview: yup.string().required(),
        GioiThieu: yup.string().required(),
        ReleaseYear: yup.date().required(),
        IDDirector: yup.string().required(),
        IDNSX: yup.string().required(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
    });
    const handleSubmit = async (values, actions) => {
        const dateString = values.ReleaseYear;
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1
        const day = date.getDate();
        const formattedDate = `${year}-${month}-${day}` + 'T17:00:00.000Z';
        values.ReleaseYear = formattedDate;

        if (selectedFile !== null) {
            try {
                await axios
                    .post(
                        'http://localhost:8080/upload',
                        { image: selectedFile },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        },
                    )
                    .then((response) => {
                        setPreviewImage(response.data);
                        values.AvatarMovie = response.data;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.log(error);
            }
            console.log(values);
            try {
                let IDReview = 0;
                let newReview = {
                    TomTat: values.TomTat,
                    LinkReview: values.LinkReview,
                    GioiThieu: values.GioiThieu,
                };
                await axios
                    .post('http://localhost:8080/review/add', newReview, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                    .then((response) => {
                        IDReview = response.data.result.insertId;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                let IDMovie = 0;
                let movieNew = {
                    AvatarMovie: values.AvatarMovie,
                    IDRevew: IDReview,
                    IDDirector: values.IDDirector,
                    IDNSX: values.IDNSX,
                    MovieName: values.MovieName,
                    ReleaseYear: values.ReleaseYear,
                    Language: values.Language,
                    TimeMovie: values.TimeMovie,
                    TypeMovie: values.TypeMovie,
                };
                await axios
                    .post('http://localhost:8080/movie/add', movieNew, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                    .then((response) => {
                        IDMovie = response.data.result.insertId;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                const fetchAdd = async (data) => {
                    try {
                        await axios
                            .post('http://localhost:8080/listactor/add', data, {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                            })
                            .then((response) => {
                                console.log('Add', response.data.result);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } catch (error) {
                        console.error(error);
                    }
                };
                ListActor.map((value) => {
                    const NewActor = {
                        IDMovie: IDMovie,
                        IDActor: value.ID,
                    };
                    fetchAdd(NewActor);
                });
            } catch (error) {
                console.log(error);
            }
            localStorage.removeItem('AddMovie');
            navigate('/');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Thêm movie thất bại do bạn chưa chon ảnh nền bộ phim...',
                text: 'Vui lòng nhập lại thông tin để thêm phim vào danh sách nhé!',
                footer: '<a >Vui lòng điền đủ thông tin vào các trường !!!</a>',
            });
            navigate('/');
        }
        // // Xử lý dữ liệu form

        // Reset form sau khi submit
        actions.resetForm();
    };
    const onChangeFile = function (e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };
    const onClickSubmit = function () {
        const fetchAdd = async (data) => {
            try {
                await axios
                    .post('http://localhost:8080/listactor/add', data, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                    .then((response) => {
                        console.log('Add', response.data.result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        const IDMovie = JSON.parse(localStorage.getItem('movie')).ID;
        ListActor.map((value) => {
            const NewActor = {
                IDMovie: IDMovie,
                IDActor: value.ID,
            };
            fetchAdd(NewActor);
        });
    };
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <h1 className={cx('title')}>Thêm phim</h1>
                <Formik
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        GioiThieu: '',
                        IDDirector: '',
                        IDNSX: '',
                        LinkReview: '',
                        MovieName: '',
                        Language: '',
                        ReleaseYear: '',
                        TimeMovie: '',
                        TomTat: '',
                        TypeMovie: '',
                        terms: false,
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>Tên Phim</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Tên Phim"
                                        name="MovieName"
                                        value={values.MovieName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.MovieName}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.MovieName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormik01">
                                    <Form.Label>Thời Lượng</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Thời Lượng"
                                        name="TimeMovie"
                                        value={values.TimeMovie}
                                        onChange={handleChange}
                                        isInvalid={!!errors.TimeMovie}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.TimeMovie}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                                    <Form.Label>Thể Loại</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder="TypeMovie"
                                            aria-describedby="inputGroupPrepend"
                                            name="TypeMovie"
                                            value={values.TypeMovie}
                                            onChange={handleChange}
                                            isInvalid={!!errors.TypeMovie}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.TypeMovie}</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className={cx('position-relative')}>
                                    <Form.Label>Upload Now</Form.Label>
                                    <Form.Control
                                        className={cx('custom-file-input')}
                                        size="lg"
                                        type="file"
                                        required
                                        name="AvatarMovie"
                                        onChange={(e) => onChangeFile(e)}
                                        isInvalid={!!errors.file}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.file}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={cx('position-relative')}>
                                    <img className={cx('AvatarMovie')} src={previewImage} alt={previewImage} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="3" controlId="validationFormik03">
                                    <Form.Label>Ngày ra mắt</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="date"
                                        placeholder="Ngày Ra Mắt"
                                        name="ReleaseYear"
                                        onChange={handleChange}
                                        isInvalid={!!errors.ReleaseYear}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.ReleaseYear}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik03">
                                    <Form.Label>Ngôn ngữ</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="Ngôn Ngữ"
                                        name="Language"
                                        value={values.Language}
                                        onChange={handleChange}
                                        isInvalid={!!errors.Language}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.Language}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik05">
                                    <Form.Label>Link Review</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder="LinkReview"
                                        name="LinkReview"
                                        value={values.LinkReview}
                                        onChange={handleChange}
                                        isInvalid={!!errors.LinkReview}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.LinkReview}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationFormik03">
                                    <Form.Label>Giới Thiệu</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        as="textarea"
                                        type="text"
                                        placeholder="GioiThieu"
                                        name="GioiThieu"
                                        value={values.GioiThieu}
                                        onChange={handleChange}
                                        isInvalid={!!errors.GioiThieu}
                                        rows={4}
                                    />

                                    <Form.Control.Feedback type="invalid">{errors.GioiThieu}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="6" controlId="validationFormik04">
                                    <Form.Label>Tóm Tắt</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        as="textarea"
                                        type="text"
                                        placeholder="TomTat"
                                        name="TomTat"
                                        value={values.TomTat}
                                        onChange={handleChange}
                                        isInvalid={!!errors.TomTat}
                                        rows={4}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.TomTat}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="3" controlId="validationFormik05">
                                    <Form.Label>Nhà Sản Xuất</Form.Label>
                                    <Form.Select size="lg" name="IDNSX" onChange={handleChange}>
                                        <option>Nhà Sản Xuất</option>
                                        {NSX.map((value, index) => (
                                            <option value={value.ID} key={index}>
                                                {value.Name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} md="3" controlId="validationFormik04">
                                    <Form.Label>Đạo Diễn</Form.Label>
                                    <Form.Select size="lg" name="IDDirector" onChange={handleChange}>
                                        <option>Đạo Diễn</option>
                                        {Director.map((value, index) => (
                                            <option value={value.ID} key={index}>
                                                {value.Name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik04">
                                    <Form.Label>Diễn Viên</Form.Label>
                                    <Form.Select
                                        size="lg"
                                        name="Actor"
                                        onChange={(e) => {
                                            let checkExist = false;
                                            ListActor.map((actor) => {
                                                if (actor.ID == e.target.value) {
                                                    checkExist = true;
                                                }
                                            });
                                            if (checkExist === false) {
                                                Actor.map((value) => {
                                                    if (value.ID == e.target.value) {
                                                        setListActor([value, ...ListActor]);
                                                    }
                                                });
                                            }
                                        }}
                                    >
                                        <option>Chọn diễn viên</option>
                                        {Actor.map((value, index) => (
                                            <option value={value.ID} key={index}>
                                                {value.Name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <ul>
                                        {ListActor.map((value, index) => (
                                            <li key={index}>
                                                {value.Name}
                                                <a
                                                    className={cx('btn_delete_actor')}
                                                    onClick={() => {
                                                        const objectIdToRemove = value.ID;
                                                        const newListActor = [];
                                                        ListActor.map((item) => {
                                                            if (item.ID !== objectIdToRemove) {
                                                                newListActor.push(item);
                                                            }
                                                        });
                                                        setListActor(newListActor);
                                                    }}
                                                >
                                                    X
                                                </a>
                                            </li>
                                        ))}
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
                            <Button className={cx('Submit')} type="submit" size="lg">
                                Thêm Phim
                            </Button>
                            <Button
                                type="reset"
                                onClick={() => {
                                    localStorage.removeItem('AddMovie');
                                    navigate('/');
                                }}
                                size="lg"
                            >
                                Thoát
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}

export default AddMovie;
