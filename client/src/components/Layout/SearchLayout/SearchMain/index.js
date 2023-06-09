import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SearchMain.module.scss';
import { useState, useEffect } from 'react';
import Main from '~/components/Layout/DefaultLayout/Main';
import axios from '~/api/axiosClient';

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function ActorSearch(props) {
    const [ListActor, setListActor] = useState([]);
    useEffect(() => {
        console.log(props.ListSearch);
    }, []);
    const LoadListActor = function (List) {
        const ListNew = [];
        props.ListSearch.map((value, index) => {
            if (ListNew === []) {
                ListNew.push(value);
            } else {
                let check = true;
                ListNew.map((val, ind) => {
                    if (value.IDActor === val.IDActor) {
                        check = false;
                    }
                });
                if (check) {
                    ListNew.push(value);
                }
            }
        });
        return ListNew;
    };
    const LoadListMovie = function (List) {
        const ListNew = [];
        props.ListSearch.map((value, index) => {
            if (ListNew === []) {
                ListNew.push(value);
            } else {
                let check = true;
                ListNew.map((val, ind) => {
                    if (value.ID === val.ID) {
                        check = false;
                    }
                });
                if (check) {
                    ListNew.push(value);
                }
            }
        });
        return ListNew;
    };
    if (props.ListSearch && ListActor) {
        return (
            <Container fluid="xxl">
                {LoadListActor(props.ListSearch).map((value, index) => (
                    <div className={cx('wrapper-detail')} key={index}>
                        <div className={cx('detail')}>
                            <p>Tên: {value.Name}</p>
                            <p>Name: {value.Country}</p>
                            <img src={value.AvatarLink} className={cx('avatar')} />
                        </div>
                        <div className={cx('Derc')}>
                            <h3 className={cx('title')}>Thông Tin cá nhân</h3>
                            <p className={cx('derc')}>{value.Derc}</p>
                        </div>
                    </div>
                ))}
                <Main movies={LoadListMovie(props.ListSearch)} w={'100%'} />
            </Container>
        );
    }
}
function DirectorSearch(props) {
    const [ListDirector, setListDirector] = useState([]);
    useEffect(() => {
        console.log(props.ListSearch);
    }, []);
    const LoadListDirector = function (List) {
        const ListNew = [];
        props.ListSearch.map((value, index) => {
            if (ListNew === []) {
                ListNew.push(value);
            } else {
                let check = true;
                ListNew.map((val, ind) => {
                    if (value.IDDirector === val.IDDirector) {
                        check = false;
                    }
                });
                if (check) {
                    ListNew.push(value);
                }
            }
        });
        return ListNew;
    };
    const LoadListMovie = function (List) {
        const ListNew = [];
        props.ListSearch.map((value, index) => {
            if (ListNew === []) {
                ListNew.push(value);
            } else {
                let check = true;
                ListNew.map((val, ind) => {
                    if (value.ID === val.ID) {
                        check = false;
                    }
                });
                if (check) {
                    ListNew.push(value);
                }
            }
        });
        return ListNew;
    };
    if (props.ListSearch && ListDirector) {
        return (
            <Container fluid="xxl">
                {LoadListDirector(props.ListSearch).map((value, index) => (
                    <div className={cx('wrapper-detail')} key={index}>
                        <div className={cx('detail')}>
                            <p>Tên: {value.Name}</p>
                            <p>Name: {value.Country}</p>
                            <img src={value.AvatarLink} className={cx('avatar')} />
                        </div>
                        <div className={cx('Derc')}>
                            <h3 className={cx('title')}>Thông Tin cá nhân</h3>
                            <p className={cx('derc')}>{value.Derc}</p>
                        </div>
                    </div>
                ))}
                <Main movies={LoadListMovie(props.ListSearch)} w={'100%'} />
            </Container>
        );
    }
}

function SearchMain({ chilren }) {
    const [valueSearch, setValueSearch] = useState('');
    const [ListSearch, setListSearch] = useState('');
    const [ListDirector, setListDirector] = useState('');
    const [ListMovie, setListMovie] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        let key = localStorage.getItem('valueSearch');
        setValueSearch(localStorage.getItem('valueSearch'));
        localStorage.removeItem('valueSearch');
        const fetchData = async () => {
            try {
                await axios.post('/search/actor/' + key).then((response) => {
                    setListSearch(response.result);
                });
                await axios.post('/search/director/' + key).then((response) => {
                    setListDirector(response.result);
                });
                await axios.post('/search/movie/' + key).then((response) => {
                    setListMovie(response.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            let key = document.querySelector('.SearchMain_input-value__t2jm1').value;
            const fetchData = async () => {
                try {
                    await axios.post('/search/actor/' + key).then((response) => {
                        setListSearch(response.result);
                    });
                    await axios.post('/search/director/' + key).then((response) => {
                        setListDirector(response.result);
                    });
                    await axios.post('/search/movie/' + key).then((response) => {
                        setListMovie(response.result);
                    });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
            navigator('/');
        }
    };
    if (ListSearch && ListDirector && ListMovie) {
        return (
            <div className={cx('wrapper')}>
                <Container fluid="xxl">
                    <h1 className={cx('title')}>Nội dung tìm kiếm :</h1>
                    <div className={cx('value')}>
                        <input
                            className={cx('input-value')}
                            type="text"
                            placeholder="Tìm Kiếm"
                            value={valueSearch}
                            onChange={(e) => {
                                setValueSearch(e.target.value);
                                // if (
                                //     document.querySelector('.number-result').textContent != '0 Kết quả tìm kiếm từ khóa :'
                                // ) {
                                //     document.querySelector('.number-result').textContent =
                                //         '0 Kết quả tìm kiếm từ khóa : ' + valueSearch;
                                // }
                            }}
                            onKeyPress={handleKeyPress}
                        ></input>
                        <button
                            className={cx('btn-cancel')}
                            onClick={() => {
                                document.querySelector('.SearchMain_input-value__t2jm1').value = '';
                                // document.querySelector('.number-result').textContent =
                                //     '0 Kết quả tìm kiếm từ khóa' + { valueSearch };
                            }}
                        >
                            X
                        </button>
                    </div>
                    <p className={cx('number-result')}>
                        {ListSearch.length + ListDirector.length + ListMovie.length} Kết quả tìm kiếm từ khóa :{' '}
                        {valueSearch}
                    </p>
                    <h1>Tìm kiếm theo diễn viên :</h1>
                    <ActorSearch ListSearch={ListSearch} />
                    <h1>Tìm kiếm theo đạo diễn :</h1>
                    <ActorSearch ListSearch={ListDirector} />
                    <h1>Tìm kiếm theo tên phim :</h1>
                    <Main movies={ListMovie} w={'100%'} />
                </Container>
            </div>
        );
    }
}

export default SearchMain;
