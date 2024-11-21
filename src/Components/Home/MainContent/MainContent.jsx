import './MainContent.css';
import React, { useState, useEffect} from 'react';
import { fetchItems } from '../../../server/api';
import Loader from '../../Loader/Loader.jsx';
// import { allMeat } from '../../../allMeat/allMeat';
import CatalogItem from '../../Catalog/CatalogItem/CatalogItem';
import ViewMoreButton from '../ViewMoreButton/ViewMoreButton';

const MainContent = () => {
    // const { items } = useContext(allMeat);
    const [items, setItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState(6);

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true); // Indicate loading starts
        try {
            const response = await fetchItems();
            setItems(response.data); // Update the items state with fetched data
        } catch (error) {
            console.error("Error fetching items:", error); // Handle errors gracefully
        } finally {
            setLoading(false); // Ensure loading stops, regardless of success or failure
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []); 

    const handleViewMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 6); 
    };
    if (loading) return <Loader></Loader>;
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