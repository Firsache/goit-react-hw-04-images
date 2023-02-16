import axios from 'axios';

const API_KEY = '32927001-bdf8cd2697946056c57f9b5f5';
axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
  key: API_KEY,
};

export const fetchImages = async (query, page) => {
  const params = {
    q: query,
    page,
  };
  const { data } = await axios.get('/', { params });
  const hits = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    tags,
    webformatURL,
    largeImageURL,
  }));
  return { hits, total: data.totalHits };
};
