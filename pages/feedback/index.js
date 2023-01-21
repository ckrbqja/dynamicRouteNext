import {getData} from '../api/feedback'
import {Fragment, useState} from "react";

export default function FeedbackPage(props) {

    const [feedbackDate, setFeedbackDate] = useState();

    function loadedHandler(id) {
        fetch(`/api/${id}`)
            .then(d => d.json())
            .then(d => (
                setFeedbackDate(d.feedback)
            ))

    }

    return <Fragment>
        {feedbackDate && <p>{feedbackDate.feedback}</p>}
        <ul>
            {
                Object.entries(props.feedbackItems).map(([i, d]) => (
                    <li key={i}>{d.feedback}
                        <button onClick={loadedHandler.bind(null, i)}>show Detail</button>
                    </li>
                ))
            }
        </ul>
    </Fragment>
};


export async function getStaticProps() {
    return {
        props: {
            feedbackItems: getData(),
        }
    }
}