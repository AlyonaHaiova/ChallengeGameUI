import React, {useState} from 'react';
import axios from 'axios';

export const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [checked, setChecked] = React.useState(false);

    const handleTermsChange = () => {
        setChecked(!checked);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (formData.firstName.length < 3 || formData.firstName.length > 100) {
            validationErrors.firstName = "Ім'я має бути в межах від 3 до 100 символів";
        }

        if (formData.lastName.length < 3 || formData.lastName.length > 100) {
            validationErrors.lastName = 'Прізвище має бути в межах від 3 до 100 символів';
        }

        if (formData.nickname.length < 3 || formData.nickname.length > 100) {
            validationErrors.username = "Ім'я користувача має бути в межах від 3 до 100 символів";
        }

        if (formData.email.length < 3 || formData.email.length > 50) {
            validationErrors.email = 'Адреса електронної пошти має бути від 3 до 50 символів';
        } else if (!isValidEmail(formData.email)) {
            validationErrors.email = 'Неправильна адреса електронної пошти';
        }

        if (!isValidPassword(formData.password)) {
            validationErrors.password =
                'Пароль має містити щонайменше 8 символів, включаючи маленькі та великі літери, цифри та спеціальні символи';
        }

        if (!checked) {
            validationErrors.terms =
                'Ми не можемо створити акаунт без вашої згоди на oбробку персональних даних';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        axios
            .post('http://13.51.85.16:8080/api/auth/register', formData)
            .then((res) => {
                if (res) {
                    alert('Акаунт успішно зареєстровано. Вітаю у Challenger!');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h1 className={"no-margin"}>Створити акаунт</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Ім'я"
                    onChange={handleChange}
                    className={errors.firstName ? 'invalid-input' : ''}
                />
                {errors.firstName && <p className="error-msg">{errors.firstName}</p>}

                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Прізвище"
                    onChange={handleChange}
                    className={errors.lastName ? 'invalid-input' : ''}
                />
                {errors.lastName && <p className="error-msg">{errors.lastName}</p>}

                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    placeholder="Юзернейм"
                    onChange={handleChange}
                    className={errors.username ? 'invalid-input' : ''}
                />
                {errors.username && <p className="error-msg">{errors.username}</p>}

                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    placeholder="Електронна пошта"
                    onChange={handleChange}
                    className={errors.email ? 'invalid-input' : ''}
                />
                {errors.email && <p className="error-msg">{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Пароль"
                    onChange={handleChange}
                    className={errors.password ? 'invalid-input' : ''}
                />

                {errors.password && <p className="error-msg">{errors.password}</p>}

                <label className={"terms"}>
                    <input type="checkbox"
                           name="terms"
                           checked={checked}
                           onChange={handleTermsChange}
                           className={"terms-checkbox"}/>

                    <p className={"terms-label"}>Я погоджуюсь на обробку своїх персональних даних для свторення акаунту</p>
                </label>

                {errors.terms && <p className="error-msg">{errors.terms}</p>}

                <button type="submit">Створити</button>
            </form>
        </div>
    );
};
