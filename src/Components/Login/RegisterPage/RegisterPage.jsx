import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../redux/authOperations';
import './RegisterPage.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.length < 8) {
            setPasswordError('Нє ну пароль треба мінімум 8 символів');
        } else {
            setPasswordError('');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (emailError || passwordError) {
            setError('Поправ помилки перед тим як спробувати ще раз, не витрачай нашого часу');
            return;
        }

        if (password !== confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }

        try {
            const result = await dispatch(register({ username, email, password })).unwrap();
            if (result.token) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.message || 'Не вдалось зареєструватись, мпробуй ще раз)');
        }
    };

    return (
        <div className="auth-container-wrapper">
            <div className="auth-container">
                <h2>Якийсь дивний сайт, здається час реєструватись!</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Користувацьке імʼя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                    <input
                        type="password"
                        placeholder="Повтори пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Створити акаунт!</button>
                </form>
                <p>
                    Я вже пізнав всю красу магічного мʼяса{' '}
                    <span onClick={() => navigate('/login')} className="switch-link">
                        Увійти
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;