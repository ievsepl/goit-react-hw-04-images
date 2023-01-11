import axios from 'axios';

const MY_KEY = '31447881-15e5026ae3260bf72b1d03ba5';
const WEB = 'https://pixabay.com/api/';

const fetchData = async (queryName, pageNumber) => {
  const {
    data: { hits },
  } = await axios.get(
    `${WEB}?key=${MY_KEY}&q=${queryName}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=12`
  );
  // console.log(hits);
  return hits;
};
export default fetchData;
