import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Movie.module.scss';
import HistoryIcon from '@mui/icons-material/History';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

import ReactPlayer from 'react-player';
import { render } from '@testing-library/react';

const cx = classNames.bind(styles);

function Movie(props) {
    const items = props;
    const [activeClass, setActiveClass] = useState('bgr');
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        setMovie(JSON.parse(localStorage.getItem('movie')));
    }, []);

    const handleClick = (className) => {
        if (className === activeClass) {
            setActiveClass('bgr');
        } else {
            setActiveClass(className);
        }
    };
    if (items.director[0] && items.actor) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('row')}>
                    <div className={cx('img-movie')}>
                        <img src={movie.AvatarMovie} />
                        <div className={cx('icon-Play')} onClick={() => handleClick('bgr-active')}>
                            <PlayArrowIcon sx={{ width: '50px', height: '50px', color: 'white', opacity: '1' }} />
                        </div>
                        <div className={cx(activeClass)}>
                            <div className={cx('modal-dialog')}>
                                <div className={cx('title')}>
                                    <h4 className={cx('title-dialog')}>{movie.MovieName}</h4>
                                    <div className={cx('close-dialog')} onClick={() => handleClick('bgr-active')}>
                                        <CloseIcon width="20px" height="20px" />
                                    </div>
                                </div>

                                <div className={cx('trailer')}>
                                    <ReactPlayer url={movie.LinkReview} width="100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail-movie')}>
                        <h2>{movie.MovieName}</h2>
                        <h2 className={cx('sub-title')}>{movie.GioiThieu}</h2>
                        <div className={cx('detail-ratting')}>
                            <div className={cx('icon-C')}>
                                <p>C13</p>
                            </div>
                            <div className={cx('time-movie')}>
                                <HistoryIcon sx={{ width: '20px', height: '20px' }} />
                                <p>{movie.TimeMovie}</p>
                            </div>
                            <div className={cx('like-share')}>
                                <a href="" className={cx('like')}>
                                    Thích
                                </a>
                                <a href="" className={cx('share')}>
                                    Chia sẻ
                                </a>
                            </div>
                        </div>
                        <div className={cx('detail-info')}>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Đạo diễn : </p>
                                <a href="" className={cx('desc')}>
                                    {items.director[0].Name}
                                </a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Diễn viên : </p>
                                <a>
                                    {items.actor.map((value, index) => (
                                        <>
                                            <a href="" key={index} className={cx('desc')}>
                                                {value.Name}
                                            </a>
                                            <spam>&ensp;,&ensp;</spam>
                                        </>
                                    ))}
                                </a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Quốc gia : </p>
                                <a href="" className={cx('desc')}>
                                    Mỹ
                                </a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Nhà sản xuất : </p>
                                <a href="" className={cx('desc')}>
                                    Warner Bros
                                </a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Thể loại : </p>
                                <a href="" className={cx('desc')}>
                                    {movie.TypeMovie}
                                </a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Ngày khởi chiếu : </p>
                                <a href="" className={cx('desc')}>
                                    {movie.ReleaseYear}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('movie-content')}>
                    <h2 className={cx('movie-title')}>NỘI DUNG PHIM</h2>
                    <p className={cx('desc')}>{movie.TomTat}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('row')}>
                    <div className={cx('img-movie')}>
                        <img src={movie.AvatarMovie} />
                        <div className={cx('icon-Play')} onClick={() => handleClick('bgr-active')}>
                            <PlayArrowIcon sx={{ width: '50px', height: '50px', color: 'white', opacity: '1' }} />
                        </div>
                        <div className={cx(activeClass)}>
                            <div className={cx('modal-dialog')}>
                                <div className={cx('title')}>
                                    <h4 className={cx('title-dialog')}>{movie.MovieName}</h4>
                                    <div className={cx('close-dialog')} onClick={() => handleClick('bgr-active')}>
                                        <CloseIcon width="20px" height="20px" />
                                    </div>
                                </div>

                                <div className={cx('trailer')}>
                                    <ReactPlayer url={movie.LinkReview} width="100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail-movie')}>
                        <h2>{movie.MovieName}</h2>
                        <h2 className={cx('sub-title')}>{movie.GioiThieu}</h2>
                        <div className={cx('detail-ratting')}>
                            <div className={cx('icon-C')}>
                                <p>C13</p>
                            </div>
                            <div className={cx('time-movie')}>
                                <HistoryIcon sx={{ width: '20px', height: '20px' }} />
                                <p>{movie.TimeMovie}</p>
                            </div>
                            <div className={cx('like-share')}>
                                <a href="" className={cx('like')}>
                                    Thích
                                </a>
                                <a href="" className={cx('share')}>
                                    Chia sẻ
                                </a>
                            </div>
                        </div>
                        <div className={cx('detail-info')}>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Đạo diễn : </p>
                                <a href="" className={cx('desc')}></a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Diễn viên : </p>
                                <a></a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Quốc gia : </p>
                                <a href="" className={cx('desc')}>
                                    Mỹ
                                </a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Nhà sản xuất : </p>
                                <a href="" className={cx('desc')}>
                                    Warner Bros
                                </a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Thể loại : </p>
                                <a href="" className={cx('desc')}>
                                    {movie.TypeMovie}
                                </a>
                            </div>
                            <div className={cx('info')}>
                                <p className={cx('sub-info')}>Ngày khởi chiếu : </p>
                                <a href="" className={cx('desc')}>
                                    {movie.ReleaseYear}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('movie-content')}>
                    <h2 className={cx('movie-title')}>NỘI DUNG PHIM</h2>
                    <p className={cx('desc')}>{movie.TomTat}</p>
                </div>
            </div>
        );
    }
}

export default Movie;
