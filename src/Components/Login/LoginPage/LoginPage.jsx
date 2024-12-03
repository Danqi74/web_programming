import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../redux/authOperations';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!validateEmail(value)) {
            setEmailError('Неправильно написана електронна пошта.');
        } else {
            setEmailError('');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (emailError) {
            setError('Поправ помилки перед тим як спробувати ще раз, не витрачай нашого часу');
            return;
        }
        try {
            const result = await dispatch(login({ email, password })).unwrap();
            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('email', email);
                navigate('/');
            }
        } catch (err) {
            setError(err || 'Не вдалось увійти( Спробуй ще разок.');
        }
    };

    return (
        <div className="auth-container-wrapper">
            <div className="auth-container">
                <h2>Час увійти і купити ще трохи магії, чи мʼяса?</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Пароліус"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Час робити покупки!</button>
                </form>
                <p>
                    Я ніколи не куштував магічне мʼясо( {' '}
                    <span onClick={() => navigate('/register')} className="switch-link">
                        Зареєструватись
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;