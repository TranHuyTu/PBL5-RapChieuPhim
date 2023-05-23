import axios from 'axios';

const [movies1, setMovies1] = useState([]);
useEffect(() => {
    axios
        .post('http://localhost:8080/TrangChu')
        .then((response) => {
            setMovies1(response.data);
            console.log(movies1);
        })
        .catch((error) => {
            console.error(error);
        });
}, [movies1]);
