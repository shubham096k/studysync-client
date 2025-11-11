import axios from '../../utils/axiosConfig';

const getAllGroups = () => axios.get('/groups/explore-groups/').then(r => r.data);
const getMyGroups = () => axios.get('/groups/my-groups/').then(r => r.data);
const getAdminGroups = () => axios.get('/groups/my-admin-groups/').then(r => r.data);
const createGroup = (data) => axios.post('/groups/', data).then(r => r.data);
const joinGroup = (id) => axios.post(`/groups/${id}/join/`).then(r => r.data);
const leaveGroup = (id) => axios.post(`/groups/${id}/leave/`).then(r => r.data);

// function to fetch individual group details by ID
const getGroupById = (id) => axios.get(`/groups/${id}/`).then(r => r.data);

export default {
    getAllGroups,
    getMyGroups,
    getAdminGroups,
    createGroup,
    joinGroup,
    leaveGroup,
    getGroupById  
};