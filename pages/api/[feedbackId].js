import {getData} from "./feedback";

export default function handler(req, res) {
    const feedbackId = req.query.feedbackId;
    console.log(feedbackId)
    const feedback = getData()[feedbackId];
    res.status(200).json({feedback})

};