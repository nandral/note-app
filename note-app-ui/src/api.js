import axios from 'axios';

const URL = 'http://localhost:8080/notes';

export async function addNote(input) {
  try {
    const res = await axios.post(`${URL}/new`, {
      data: input
    });

    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

export async function getNotes() {
  try {
    const res = await axios.get(`${URL}`);

    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

export async function deleteNote(id) {
  try {
    const res = await axios.delete(`${URL}/${id}`);

    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

export async function editNote({ id, data }) {
  console.log('API ... ', id, data);
  try {
    const res = await axios.put(`${URL}/${id}`, { data });
    console.log('🚀 ~ update ~ res', res);

    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}
