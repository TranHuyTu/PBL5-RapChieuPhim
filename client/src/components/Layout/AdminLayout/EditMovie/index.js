import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EditMovie.module.scss';
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

function EditMovie(props) {
    const [Movie, setMovie] = useState(props.movie);
    const [Director, setDerector] = useState([]);
    const [NSX, setNSX] = useState([]);
    const [ListActor, setListActor] = useState([]);
    const [ListActorDefault, setListActorDefault] = useState([]);
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
        const IDMovie = props.movie.ID;
        fetchData('http://localhost:8080/directors', setDerector);
        fetchData('http://localhost:8080/nsx', setNSX);
        fetchData('http://localhost:8080/actors/Movie/' + IDMovie, setListActor);
        fetchData('http://localhost:8080/actors/Movie/' + IDMovie, setListActorDefault);
        fetchData('http://localhost:8080/actors', setActor);
        if (Movie === props.movie) {
            setMovie((Movie['terms'] = false));
        }
        setPreviewImage(props.movie.AvatarMovie);
    }, []);

    const { Formik } = formik;

    const schema = yup.object().shape({
        ID: yup.string().required(),
        MovieName: yup.string().required(),
        TimeMovie: yup.string().required(),
        TypeMovie: yup.string().required(),
        AvatarMovie: yup.string().required(),
        ReleaseYear: yup.date().required(),
        Language: yup.string().required(),
        TomTat: yup.string().required(),
        LinkReview: yup.string().required(),
        GioiThieu: yup.string().required(),
        IDDirector: yup.string().required(),
        IDRevew: yup.string().required(),
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
        console.log(formattedDate);
        values.ReleaseYear = formattedDate;
        console.log('B1');
        // Xử lý dữ liệu form
        if (selectedFile != null) {
            console.log('Begi-movie');
            try {
                if (Movie.AvatarMovie != null) {
                    let Url = values.AvatarMovie.split('learn_nodejs/')[1];
                    const UrlDelete = { imageUrl: 'learn_nodejs/' + Url.split('.')[0] };
                    console.log('B2', UrlDelete);
                    await axios
                        .post('http://localhost:8080/pathImg', UrlDelete, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        })
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
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
                } else {
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
                }
            } catch (error) {
                console.log(error);
            }
        }
        console.log(values);
        try {
            await axios
                .put('http://localhost:8080/movie/update', values, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then((response) => {
                    console.log(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                });
            let newReview = {
                ID: values.IDRevew,
                TomTat: values.TomTat,
                LinkReview: values.LinkReview,
                GioiThieu: values.GioiThieu,
            };
            await axios
                .put('http://localhost:8080/review/update', newReview, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then((response) => {
                    console.log(response.data.result);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.log(error);
        }
        // Gửi dữ liệu đến server
        // ...
        // Reset form sau khi submit
        actions.resetForm();
        localStorage.removeItem('movie');
        navigate('/');
    };
    const onChangeFile = function (e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };
    const onClickSubmit = function () {
        const fetchRemove = async (data) => {
            try {
                axios
                    .delete('http://localhost:8080/listactor/remove', {
                        data: data,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    })
                    .then((response) => {
                        console.log('Remove:', response.data.result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
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
        if (ListActorDefault) {
            const ListActorAdd = ListActor.filter(
                (actor1) => !ListActorDefault.some((actor2) => actor2.ID === actor1.ID),
            );
            const ListActorRemove = ListActorDefault.filter(
                (actor1) => !ListActor.some((actor2) => actor2.ID === actor1.ID),
            );
            ListActorAdd.map((value) => {
                const NewActor = {
                    IDMovie: IDMovie,
                    IDActor: value.ID,
                };
                console.log('Add', NewActor);
                fetchAdd(NewActor);
            });
            ListActorRemove.map((value) => {
                const RemoveActor = {
                    IDMovie: IDMovie,
                    IDActor: value.ID,
                };
                console.log('Remove', RemoveActor);
                fetchRemove(RemoveActor);
            });
        } else {
            ListActor.map((value) => {
                const NewActor = {
                    IDMovie: IDMovie,
                    IDActor: value.ID,
                };
                console.log('Add', NewActor);
                fetchAdd(NewActor);
            });
        }
    };
    if (NSX !== [] && Director !== [] && ListActor !== [] && Actor !== []) {
        let nsx = '';
        NSX.map((value) => {
            if (value.ID === 1) {
                nsx = value.Name;
            }
            return nsx;
        });
        let daodien = '';
        Director.map((value) => {
            if (value.ID === 1) {
                daodien = value.Name;
            }
            return daodien;
        });
        return (
            <div className={cx('wrapper')}>
                <Container className={cx('container')}>
                    <h1 className={cx('title')}>Sửa thông tin phim</h1>
                    <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={Movie}>
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
                                            <Form.Control.Feedback type="invalid">
                                                {errors.TypeMovie}
                                            </Form.Control.Feedback>
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
                                        <img
                                            className={cx('AvatarMovie')}
                                            src={previewImage}
                                            alt={props.movie.AvatarMovie}
                                        />
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
                                            value={ConverTimeData(values.ReleaseYear)[2]}
                                            onChange={handleChange}
                                            isInvalid={!!errors.ReleaseYear}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.ReleaseYear}
                                        </Form.Control.Feedback>
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

                                        <Form.Control.Feedback type="invalid">
                                            {errors.LinkReview}
                                        </Form.Control.Feedback>
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
                                            <option>{nsx}</option>
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
                                            <option>{daodien}</option>
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
                                                if (ListActor) {
                                                    ListActor.map((actor) => {
                                                        if (actor.ID == e.target.value) {
                                                            checkExist = true;
                                                        }
                                                    });
                                                }
                                                if (checkExist === false) {
                                                    Actor.map((value) => {
                                                        if (value.ID == e.target.value) {
                                                            if (ListActor) {
                                                                setListActor([value, ...ListActor]);
                                                            } else {
                                                                setListActor([value]);
                                                            }
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
                                            {ListActor ? (
                                                ListActor.map((value, index) => (
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
                                                ))
                                            ) : (
                                                <p>Ko co dien vien</p>
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
                                <Button
                                    className={cx('Submit')}
                                    type="submit"
                                    onClick={() => onClickSubmit()}
                                    size="lg"
                                >
                                    Sửa Phim
                                </Button>
                                <Button
                                    type="reset"
                                    onClick={() => {
                                        localStorage.removeItem('movie');
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
    } else {
        localStorage.removeItem('movie');
        navigate('/');
    }
}

export default EditMovie;
