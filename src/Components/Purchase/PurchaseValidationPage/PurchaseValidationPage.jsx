import React from "react";
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { loadCartFromLocalStorage, clearCart} from '../../../redux/cartAction';
import './PurchaseValidationPage.css'; // Import the CSS file

const PurchaseValidationPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCartFromLocalStorage());
    }, [dispatch]);

    const totalSum = () =>{
        return cartItems.reduce((total, item) => {
            return total + item.price * item.count;
        }, 0);
    };

    const initialValues = {
        name: "",
        blood_type: "",
        height: "",
        VAT: "",
        card_cvv: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
        .required("Дайте мені своє чудове імʼя, те що в паспорті пише")
        .min(2, "Я не вірю що в імʼї може бути менше 2 символів)")
        .max(40000,"Май совість, твоє імʼя займає більше памʼяті ніж якась картинка з голими бабами")
        .matches(/^[А-ЯЁЇЄІҐ][а-яёїєіґ]+$/, "Тільки українські символи, я не продам мʼяско всяким Омериканцям, і не забудь що тільки перша літера має бути великою, ми ж грамотні люди всетаки"),
        blood_type: Yup.string()
        .required("Не знаючи типу крові я не буду впевнений що ти людина і що твоє тіло готове до магії!")
        .matches(/^(?:\d[+-]|[A-B]{2}[+-]|[O][+-])$/, "Введи тип крові в форматі цифра від 1 до 4 та знак + або -, або латинські літери і знак, наприклад 2-, 4+, AB-, O+"),
        height: Yup.number()
        .required("Я хочу знати твій ріст, спитаєш 'для чого?', та просто так.")
        .min(149, "Я не продам магічне мʼясо коли ти навіть не мтер 50 з кепкою")
        .max(250,"Твій ріст більше 2 з половиною метрів? Не бреши тут..."),
        VAT: Yup.string()
        .required("ІПН обовʼязковий, інакше я тобі мʼясо не продам")
        .length(12, "ІПН має 12 символів, давай не цейво")
        .matches(/^[0-9]{12}$/, "В ІПН є тільки цифри, хитра ти дупа"),
        card_cvv: Yup.number()
        .min(100, "Треба 3 циферки!")
        .max(999,"3 циферки, не більше!!!")
        .required("Не будь жлобом, дай 3 циферки, решту я вже й так маю)"),
    });

    const handleSubmit = (values) => {
        console.log(values); // Handle form submission logic, like sending data to an API
        dispatch(clearCart())
        navigate("/success")
    };

    return (
        <div className="form-container">
        <h2 className="form-title">Форма для підтвердження покупки</h2>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
            <Form>
                <div className="form-group">
                    <label htmlFor="name">Імʼя:</label>
                    <Field
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="name"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="blood_type">Тип крові:</label>
                    <Field
                        type="text"
                        id="blood_type"
                        name="blood_type"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="blood_type"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="height">Ріст(в сантиметрах):</label>
                    <Field
                        type="number"
                        id="height"
                        name="height"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="height"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="VAT">Індивідуальний податковий номер платника ПДВ:</label>
                    <Field
                        type="text"
                        id="VAT"
                        name="VAT"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="VAT"
                        component="div"
                        className="error-message"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="card_cvv">3 циферки ззаду  банківської карти:</label>
                    <Field
                        type="number"
                        id="card_cvv"
                        name="card_cvv"
                        className="form-input"
                    />
                    <ErrorMessage
                        name="card_cvv"
                        component="div"
                        className="error-message"
                    />
                </div>

                <div className="purchase-total-sum">
                    Повна сума: ${totalSum()}
                </div>

                <button
                type="submit"
                className="submit-button"
                >
                КУПИИИИТИ!
                </button>
            </Form>
            )}
        </Formik>
        </div>
    );
};

export default PurchaseValidationPage;
