import axios from '../../utils/axiosConfig';

const getDocuments = (groupId) => { // groupId parameter
  const url = groupId ? `/documents/?group=${groupId}` : '/documents/'; // Filter by group
  return axios.get(url).then((r) => r.data);
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