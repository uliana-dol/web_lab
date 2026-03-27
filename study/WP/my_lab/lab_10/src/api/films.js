import axios from 'axios';

const api = axios.create({
    baseURL: '/', // CRA proxy will forward to backend
    timeout: 5000,
});

export async function getFilms(params = {}) {
    // params will be passed as query string, e.g. ?minRating=8&minTime=60
    const resp = await api.get('/films', { params });
    return resp.data;
}

export default {
    getFilms,
};
