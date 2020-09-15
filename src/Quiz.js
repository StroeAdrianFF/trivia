import React, { useState, useEffect } from 'react'
import './Quiz.css';
import { Button } from '@material-ui/core';

function Quiz(props) {

    const [question, setQuestion] = useState('')
    const [category, setCategory] = useState('')
    const [correctAns, setCorrectAns] = useState('')
    const [ans, setAns] = useState('')
    const [options, setOptions] = useState([])
    const [value, setValue] = useState('')



    let url = 'https://opentdb.com/api.php?amount=1&type=multiple'
    useEffect(() => {
        try {
            async function fetcher() {
                const quiz = await fetch(url)
                const res = await quiz.json();
                setCategory(res.results[0].category.replace(":", " ->"));
                setQuestion(res.results[0].question.replace(/&quot;/g, "''").replace(/&#039;/g, "'"));
                setCorrectAns(res.results[0].correct_answer);
                props.setCounter(props.counter)

                const incorrect = res.results[0].incorrect_answers
                const correct = res.results[0].correct_answer
                const concat = incorrect.concat(correct)

                const shuffle = (a) => {
                    for (let i = a.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [a[i], a[j]] = [a[j], a[i]];
                    }
                    setOptions(a)
                    return a;
                }
                shuffle(concat);
            }
            fetcher(url);
        }
        catch (e) {
            console.log(e)
        }
    }, [url, props])


    const input = (e) => {
        setAns(e.target.value)
        setValue(e.target.value)
    }

    const verify = () => {
        let randomizer = Math.floor(Math.random() * 49)
        if (ans === correctAns) {
            props.setCounter(props.counter + 1)
            url = `https://opentdb.com/api.php?amount=${randomizer}&type=multiple`
        } else {
            props.setCounter(props.counter * 0);
            alert('You lost! All your points are now gone')
            window.location.reload(false)
        }
        setValue('')
    }

    return (
        <div className="mainCard">
            <div className="card">
                Category -> {category}<br /><br />
                Question -> {question} <br /><br />
                <ul className="answers">
                    <li>I. {options[0]}</li>
                    <li>II. {options[1]}</li>
                    <li>III. {options[2]}</li>
                    <li>IV. {options[3]}</li>
                </ul>
            Your answer: <input type="text" value={value} onChange={input} /> <br /> <br />
                <Button variant="contained" color="secondary" onClick={verify} className="btn">
                    Answer!
            </Button>
            </div >
        </div>

    )
}

export default Quiz
