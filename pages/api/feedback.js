import path from "path";
import fs from "fs";

export function getData() {
    const filePath = getFilePath();
    return JSON.parse(fs.readFileSync(filePath) + '');
}

export function getFilePath() {
    return path.join(process.cwd(),'data','feedback.json');
}

export default function handler(req, res) {

    if (req.method === 'GET') {
        res.status(200).json({message: 'gd', feedback: getData()});
        return;
    }


    const data = getData();
    data.push(req.body);
    fs.writeFileSync(getFilePath(), JSON.stringify(data))

    res.status(201).json({result:'Success', feedback: req.body})
}