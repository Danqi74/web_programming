import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { allMeat } from '../../../allMeat/allMeat';
import { fetchItemById } from '../../../server/api';
import Loader from '../../Loader/Loader.jsx';
import SelectComponent from '../SelectComponent/SelectComponent';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../../../redux/cartAction'; 
import './ItemPage.css';


const ItemPage = () => {
    const { id } = useParams();
    // const { items } = useContext(allMeat);
    const navigate = useNavigate();

    const [item, setItem] = useState(null); // State for a single item
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState();
    const [meatType, setMeatType] = useState("alive");
    const dispatch = useDispatch();

    useEffect(() => {
        const loadItem = async () => {
            try {
            const response = await fetchItemById(id);
            setItem(response.data);
            setTotalPrice(response.data.price)
            } catch (error) {
            console.error("Failed to fetch item:", error);
            } finally {
            setLoading(false);
            }
        };
        loadItem();
    }, [id]);

    const handleAddToCart = () => {
    
        if (!meatType) {
        alert('Please select size and type');
        return;
    };
    
        const itemWithCount = { ...item, meatType, count };
        dispatch(addToCart(itemWithCount));
        navigate('/cart');
    };

    if (loading) return <Loader/>;
    if (!item) return <p>Item not found</p>;

    const handleCountChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setCount(value);
        setTotalPrice(item.price * value);
    };
    const handleMeatTypeChange = (e) => { setMeatType(e.target.value)};


    return (
        <div className="item_page">
            <div className="item_image_container">
                <img src={`/images/${item.image}`} alt={item.name} className="item_image" />
                <p className="price">Ціна: ${totalPrice}</p>
            </div>
            <div className="item_details">
                <h1>{item.name}</h1>
                <h2>Сепер-пупер сила: {item.power}</h2>
                <p className="description">{item.description}</p>
                <div className='select_container'>
                    <label htmlFor='count_select' className='count_label'>Скіко хочеш?</label>
                    <input 
                        className='count_select'
                        type="number" 
                        value={count} 
                        onChange={handleCountChange} 
                        min="1" 
                    />
                    <label htmlFor="type_select" className='type_label'>Обери тип мʼяска:</label>
                    <SelectComponent
                        value={meatType}
                        onChange={handleMeatTypeChange}
                        className="type_select"
                        options={[
                            { value: 'alive', label: 'Живе' },
                            { value: 'dead', label: 'Не дуже живе' },
                            { value: 'steaks', label: 'Стейки' },
                            { value: 'organs', label: 'Органи' },
                        ]}
                    />
                </div>
                <div className="button_container">
                    <button className="back_button" onClick={() => navigate(-1)}>Втекти звідси</button>
                    <button className='add_cart_button' onClick={handleAddToCart}>Добавити в кошик!!!</button>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;