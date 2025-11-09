import axios from '../../utils/axiosConfig';
const getDocuments = () => {
  return axios.get('/documents/').then((r) => r.data);
}
const uploadDocument = (formData) =>
  axios.post('/documents/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
const approveDocument = (id) =>
  axios.post(`/documents/${id}/approve/`).then((r) => r.data);
const deleteDocument = (id) =>
  axios.delete(`/documents/${id}/`).then((r) => r.data);
export default { getDocuments, uploadDocument, approveDocument, deleteDocument };