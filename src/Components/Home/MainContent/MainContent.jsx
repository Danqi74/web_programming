import './MainContent.css';
import React, { useContext, useState } from 'react';
import { allMeat } from '../../../allMeat/allMeat';
import CatalogItem from '../../Catalog/CatalogItem/CatalogItem';
import ViewMoreButton from '../ViewMoreButton/ViewMoreButton';

const MainContent = () => {
    const { items } = useContext(allMeat);
    const [visibleItems, setVisibleItems] = useState(6);

    const handleViewMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 6); 
    };

    return (
        <section className="new_arrivals">
            <h2 className="new_arrivals_title">Виживші</h2>
            <div className="pony_grid">
                {items.slice(0, visibleItems).map((item) => ( 
                    <CatalogItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        age={item.age}
                        power={item.power}
                        image={item.image}
                    />
                ))}
            </div>
            <div className='view_more_btn_container'>
                {visibleItems < items.length && ( 
                    <ViewMoreButton onClick={handleViewMore} /> 
                )}
            </div>
        </section>
    );
};

export default MainContent