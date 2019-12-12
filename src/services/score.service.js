import { openDB, deleteDB, wrap, unwrap } from 'idb';

export const scoreService = {
    getList,
    postScore
};

const URL = 
'https://dotnetconf-pwa-serverless.azurewebsites.net/api/Score';


const scoreDb = openDB('ScoreHistory', 10,
    {
        upgrade(db, oldVersion, newVersion, transaction) {
            db.createObjectStore('scoreFiles', 
            { keyPath: 'createdAt' });
        }
    });


function getList() {
    return fetch(URL, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => {
            return response.json();
        });
}

function postScore(score) {
    //return StoreInDB(score);
    return SendToAzure(score);
}

function SendToAzure(score) {
    return fetch(URL, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(score)
    }).then(response=>{return `Done sending to azure 🌥. ${response}`})
}

function StoreInDB(score) {
    score.createdAt = `${new Date()}`;
    return scoreDb.then(db => {
        const transaction = db.transaction('scoreFiles', 'readwrite');
        transaction.objectStore('scoreFiles').put(score);
        return transaction.complete;
    }).then(() => {
        let event = new Event('saveData');
        document.body.dispatchEvent(event);
        return 'Stored in IndexDb. ✔'
    });
}
