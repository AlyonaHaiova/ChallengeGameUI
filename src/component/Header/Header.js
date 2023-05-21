import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="inner-header flex">
                <div className={"header-text"}>
                    <p>Ласкаво просимо на сайт Challenger!</p>
                    <p>Цей сайт є відмінним інструментом для інтерактивного навчання у шкільній програмі.</p>
                    <p>Ми пропонуємо захопливі ігри, які не тільки допоможуть учням поглибити свої знання, але й заохочують до навчання.</p>
                    <p>Ми пропонуємо широкий спектр можливостей, включаючи інтерактивні завдання, перевірку знань та повторення пройденого матеріалу.</p>
                    <p>Долучайтесь до нас та відкрийте новий світ навчання!</p>
                </div>
            </div>

            <div>
                <svg
                    className="waves"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                    shapeRendering="auto"
                >
                    <defs>
                        <path
                            id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                        />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default Header;