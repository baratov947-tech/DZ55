import { useState, useEffect } from 'react';
import styles from './RandomQuote.module.css';

const QUOTES = [
    { text: "Жизнь — это то, что происходит с тобой, пока ты оживлённо строишь другие планы.", author: "Джон Леннон" },
    { text: "Логика может привести вас от пункта А к пункту Б, а воображение — куда угодно.", author: "Альберт Эйнштейн" },
    { text: "Единственный способ делать великие дела — любить то, что вы делаете.", author: "Стив Джобс" },
    { text: "Успех — это способность шагать от одной неудачи к другой, не теряя энтузиазма.", author: "Уинстон Черчилль" },
    { text: "Наш большой недостаток в том, что мы слишком быстро опускаем руки.", author: "Томас Эдисон" },
    { text: "Если вы думаете, что на что-то способны, вы правы. Если думаете, что у вас ничего не выйдет - вы тоже правы.", author: "Генри Форд" }
];

export default function RandomQuote() {

    const [quote, setQuote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        return QUOTES[randomIndex];
    };
    useEffect(() => {

        const timer = setTimeout(() => {
            setQuote(getRandomQuote()); // Устанавливаем цитату
            setIsLoading(false); // Выключаем загрузку
        }, 1500);

        return () => clearTimeout(timer);
    }, []);
    const handleNewQuote = () => {
        let newQuote = getRandomQuote();

        while (quote && newQuote.text === quote.text) {
            newQuote = getRandomQuote();
        }

        setQuote(newQuote);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Случайная цитата</h2>

            {isLoading ? (
                <p className={styles.loading}>Загрузка...</p>
            ) : (
                <div className={styles.quoteBox}>
                    <p className={styles.text}>«{quote.text}»</p>
                    <p className={styles.author}>— {quote.author}</p>
                    <button className={styles.button} onClick={handleNewQuote}>
                        Показать другую цитату
                    </button>
                </div>
            )}
        </div>
    );
}