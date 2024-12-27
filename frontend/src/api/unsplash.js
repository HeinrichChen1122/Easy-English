import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 1;

export const fetchImageUrl = async (searchValue, callback) => {
    try {
        
        const { data } = await axios.get(
            `${API_URL}?query=${searchValue}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`
        );
        callback(data.results[0].urls.small)
    } catch (error) {
        console.log(error);
    }
};