import axios from 'axios';

export const getImages = (value, page) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '30777665-7c77f225ca344d7989ea6f444',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: 12,
    },
  })
};


