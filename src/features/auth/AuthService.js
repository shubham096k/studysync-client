import axios from '../../utils/axiosConfig';

const register = (data) => axios.post('/auth/register/', data).then((res) => res.data);
const login = (data) => axios.post('/auth/login/', data).then((res) => res.data);

export default { register, login };