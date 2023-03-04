import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '32401247-d831a8438a21bb86fb66fd7b1',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});
export default async function fetch(q, page) {
    const data = await instance.get('/', { params: { q, page } });
    return data;
}

