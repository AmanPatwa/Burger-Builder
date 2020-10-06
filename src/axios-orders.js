import axios from 'axios';

const instance = axios.create({
    baseURL:"https://react-my-burger-e84bb.firebaseio.com"
});

export default instance;