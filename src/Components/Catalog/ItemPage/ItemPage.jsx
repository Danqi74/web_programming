import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allMeat } from '../../../allMeat/allMeat';
import './ItemPage.css';

const ItemPage = () => {
const { id } = useParams();
const { items } = useContext(allMeat);
const navigate = useNavigate();

const item = items.find(item => item.id === parseInt(id));
if (!item) return (
    <div className='item_page'>
        <p>Item not found</p>
    </div>
);

return (
    <div className="item_page">
        <div className="item_image_container">
            <img src={item.image} alt={item.name} className="item_image" />
            <p className="price">Ціна: ${item.price}</p>
        </div>
        <div className="item_details">
            <h1>{item.name}</h1>
            <h2>Сепер-пупер сила: {item.power}</h2>
            <p className="description">{item.description}</p>
            <div className="button_container">
            <button className="back_button" onClick={() => navigate(-1)}>Втекти звідси</button>
            </div>
        </div>
    </div>
);
};

export default ItemPage;