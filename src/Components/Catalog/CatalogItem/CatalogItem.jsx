import React from 'react';
import { Link } from 'react-router-dom';
import './CatalogItem.css'

const CatalogItem = ({ id, name, price, age, power, image }) => {
return (
    <div key={id} className="catalog_item">
        <img src={image} alt={name} className="catalog_image" />
        <p className="catalog_name"><strong>{name}</strong></p>
        <p className="catalog_age"><strong>Вік:</strong> {age}</p>
        <p className="catalog_power"><strong>Особливість:</strong> {power}</p>
        <p className="catalog_price"><strong>Ціна:</strong> ${price}</p>
        <Link to={`/item/${id}`} className="catalog_view_more">Натисни мене повністю</Link>
    </div>
);
};

export default CatalogItem;