import {useRef, useState} from "react";

function HomePage() {
    const ref = useRef({email: '', feedback: ''});

    const aa = (name) => (el) =>
        ref.current[name] = el

    const bb = (ba) => Object.entries(ba).reduce((pre, [k, v]) =>
            ({...pre, [k]: v.value})
        , {});


    const [feedback, setFeedback] = useState([]);
    function submitHandler(event) {
        event.preventDefault();

        const res = bb(ref.current);

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(res),
            headers: {'Content-type': 'application/json'}
        }).then(d => (d.json())).then(d => (setFeedback([...feedback, d.feedback])))
    }


    function loadFeedback() {
        fetch('/api/feedback').then(d => (d.json())).then(d => (setFeedback(d.feedback)))
    }

    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">'Your Email Address'</label>
                    <input type="email" ref={aa('email')}/>
                </div>
                <div>
                    <label htmlFor="feedback">'Your Feedback'</label><textarea id="feedback" row='5'
                                                                               ref={aa('feedback')}/>
                </div>
                <button>Send Feedback</button>
            </form>
            <hr/>
            <button onClick={loadFeedback}>Load Feedback</button>
            <ul>
                {Object.entries(feedback).map(([i,d]) => <li key={i}>{d.feedback}</li>)}
            </ul>
        </div>
    );
}

export default HomePage;
