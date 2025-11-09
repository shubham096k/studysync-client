import axios from '../../utils/axiosConfig';
export const getSessions = (groupId, status) =>
  axios
    .get(`/sessions/`, { params: { group: groupId, status } })
    .then((r) => r.data);
export const createSession = (data) =>
  axios.post('/sessions/', data).then((r) => r.data);
export const deleteSession = (id) =>
  axios.delete(`/sessions/${id}/`).then((r) => r.data);
export default { getSessions, createSession, deleteSession };