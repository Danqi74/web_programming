import axios from 'axios';

export const fetchItems = async (searchTerm = '', sortOrder = '', filter = '') => {
    const response = await axios.get('http://localhost:9000/api/meat', {
        params: {
        search: searchTerm,
        sort: sortOrder,
        filter: filter
        },
    });
    return response;
};

export const fetchItemById = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/meat/${id}`);
    return response;
};