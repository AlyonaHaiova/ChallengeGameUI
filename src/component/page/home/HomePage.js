import React, { useState } from 'react';
import './HomePage.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Header from "../../Header/Header";

const AdvantageCard = ({ title, description, color }) => {

    const style = {
        backgroundColor: color ? color : undefined,
        backgroundImage: color ? 'none' : undefined
    };

    return (
        <div className="card one-third-width">
            <div className="card__side card__side--back">
                <div className="card__cover" style={style}>
                    <h4 className="card__heading">
                        <span className="card__heading-span">{title}</span>
                    </h4>
                </div>
                <div className="card__details">
                    <p>{description}</p>
                </div>
            </div>
            <div className="card__side card__side--front" style={style}>
                <div className="card__theme">
                    <div className="card__theme-box">
                        <p className="card__title home-page-card-heading">{title}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    const advantages = [
        {
            title: "Щира зацікавленість учня гарантована",
            description: "Дайте учням поринути у цікаву гру і дайте їм подивитись на ваш предмет іншими очима."
        },
        {
            title: "Підвищує ефективність навчання",
            description: "Важко змусити дитину читати правила у підручнику? Подайте їх у новому вигляді!"
        },
        {
            title: "Проведіть опитування весело і без стресу",
            description: 'Набридло бачити страх в очах на фразі "Дійстаємо подвійні листочки"? Проведи оцінювання якості знань весело і з користю.'
        },
        {
            title: "Заохочуйте до своєї маленької особистої перемоги",
            description: "Ви завжди можете пообіцяти тому хто набере найбільше балів амністію на домашню роботу на завтра."
        },
        {
            title: "Справедливість",
            description: "Завдання для учня обирається випадково, що дає всім рівні можливості."
        }
    ];

    const cards = [
        {
            title: "Географія",
            description: "Назви три країни у Європі",
            color: "#17A589"
        },
        {
            title: "Математика",
            description: "Про який трикутник іде мові у теоремі Піфагора? Наведи приклад її викорисатання",
            color: "#F1C40F"
        },
        {
            title: "Руханка",
            description: "Зроби 5 стрибків",
            color: "#E74C3C"
        },
        {
            title: "Історія",
            description: "Хто такі Січові Стрільці?",
            color: "#D35400"
        },
        {
            title: "Українська мова",
            description: "На жаль чи нажаль? Обгрунтуй свою відповідь правилом.",
            color: "#2ECC71"
        },
        {
            title: "Англійська мова",
            description: "Tell me about your pet more. Describe them.",
            color: "#85C1E9"
        }
    ];

    const [currentCard, setCurrentCard] = useState(0);
    const [currentTaskCard, setCurrentTaskCard] = useState(0);

    return (
        <div className="home-page">
            <Header />

<div className={"carousel-wrapper centered"}>
            <Carousel
                renderArrowPrev={(onClickHandler, hasPrev) =>
                    hasPrev && (
                        <button className="carousel__button carousel__button--prev" onClick={onClickHandler}>
                            &lt;
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext) =>
                    hasNext && (
                        <button className="carousel__button carousel__button--next" onClick={onClickHandler}>
                            &gt;
                        </button>
                    )
                }
                selectedItem={currentCard}
                onChange={setCurrentCard}
                showIndicators={false}
                showStatus={false}
                infiniteLoop={true}
                showArrows={advantages.length > 1}
                swipeable={true}
                showThumbs={false}
                centerMode={true}
                centerSlidePercentage={33.33}
                emulateTouch={true}
                autoPlay={true}
                interval={5000}
            >
                {advantages.map((advantage, index) => (
                    <AdvantageCard key={index} title={advantage.title} description={advantage.description} />
                ))}
            </Carousel>
        </div>
        <h1 className={"carousel-title"}>Хочеш побачити які ідеї можна втілити за допомогою Challenger?</h1>
        <div className={"carousel-wrapper centered"}>
          <Carousel
            renderArrowPrev={(onClickHandler, hasPrev) =>
                hasPrev && (
                <button className="carousel__button carousel__button--prev" onClick={onClickHandler}>
                &lt;
                </button>
                )
            }
                renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                <button className="carousel__button carousel__button--next" onClick={onClickHandler}>
                &gt;
                </button>
                )
            }
                selectedItem={currentTaskCard}
                onChange={setCurrentTaskCard}
                showIndicators={false}
                showStatus={false}
                infiniteLoop={true}
                showArrows={advantages.length > 1}
                swipeable={true}
                showThumbs={false}
                centerMode={true}
                centerSlidePercentage={33.33}
                emulateTouch={true}
                autoPlay={true}
                interval={5000}
                >
            {cards.map((card, index) => (
                <AdvantageCard key={index} title={card.title} description={card.description} color={card.color}/>
                ))}
                </Carousel>
                </div>
        </div>
    );
};

export default HomePage;
