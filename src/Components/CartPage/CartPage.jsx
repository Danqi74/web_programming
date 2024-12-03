import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { removeFromCart, clearCart,updateCartItemCount, loadCartFromLocalStorage } from '../../redux/cartAction';
import './CartPage.css';

const CartPage = () => {
    const cartItems = useSelector((state) => {
        const userEmail = localStorage.getItem('email');
        return state.cart.cartItems[userEmail] || [];
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCartFromLocalStorage());
    }, [dispatch]);

    const handleRemove = (id, meatType) => {
        dispatch(removeFromCart({ id, meatType }));
    };

    const handleUpdateCount = (id, meatType, newCount) => {
        console.log('Updating count for:', { id, meatType, newCount });
        if (newCount > 0) {
            dispatch(updateCartItemCount({ id, meatType, newCount }));
        } else {
            handleRemove(id, meatType);
        }
    };
    

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const getTotalPrice = () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
        return total
    };

    const ReadableMeatType = (meatType) => {
        switch (meatType){
            case "alive":
                return "Живе, досі дихає";
            case "dead":
                return "Не живе, дихання відсутнє"
            case "steaks":
                return "Порізане на неймовірні стейки"
            case "organs":
                return "Внутрішні органи для справжніх поціновувачів магії"
            default: return
        };
    };

    return (
        <div className="cart_page">
            <h2 className="cart-title">Твій кошик (ймовірно повний магії та крові)</h2>
            {cartItems.length === 0 ? (
                <>
                <p className="empty-cart-message"> Тут пусто і тихо, може вартує щось добавити?</p>
                <button className="back-button" onClick={() => navigate("/catalog")}>Catalog</button>
                </>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.meatType}`} className="cart-item">
                                <img src={`/images/${item.image}`} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-name">{item.name}</h4>
                                    <p className="cart-item-size">Вид мʼяска: {ReadableMeatType(item.meatType)}</p>
                                    <p className="cart-item-price">Ціна за одиницю: ${item.price}</p>
                                    <div className="cart-item-quantity">
                                        <p>Кількість:</p>
                                        <button
                                            className="quantity-button"
                                            onClick={() =>
                                                handleUpdateCount(item.id, item.meatType, item.count - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.count}</span>
                                        <button
                                            className="quantity-button"
                                            onClick={() =>
                                                handleUpdateCount(item.id, item.meatType, item.count + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cart-item-total">
                                        Загальна вартість: ${(item.price * item.count)}
                                    </p>
                                    <div className='cart-buttons-container'>
                                    <button
                                        className="open-button"
                                        onClick={() => navigate(`/item/${item.id}`)}
                                    >
                                        Відкрити сторіночку поні
                                    </button>
                                    <button
                                        className="remove-button"
                                        onClick={() => handleRemove(item.id,item.meatType)}
                                    >
                                        Видалити поні
                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Підсумок</h3>
                        <p>Ваше замовлення обійдеться всього в ${getTotalPrice()}</p>
                        <div className='cart-summary-button-container'>
                            <button className="buy-button" onClick={() => navigate("/purchase")}>
                                Заберіть мої гроші, я хочу мʼяса!
                            </button>

                            <button className="clear-cart-button" onClick={handleClearCart}>
                                Ну нафіг ту магію, очистити кошик!
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};


export default CartPage;