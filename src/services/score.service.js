import { openDB, deleteDB, wrap, unwrap } from 'idb';

export const scoreService = {
    getList,
    postScore
};

const URL = 'https://fa-d-progressive-01.azurewebsites.net/api/SaveNoSQLFunction_HttpStart?code=SYMEa4nAOnjS6wfQBu9Zj74YJwQyn5b5g1auhHMEgfXFfMbZ9RRdgQ==';
//'https://pwaserverless.azurewebsites.net/api/GetScores';

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
        body: JSON.stringify([score])
    })
        .then(response => {
            return response.json();
        });
}

function StoreInDB(score) {
    score.matchId = '264';
    score.date = '05-20-2019';
    score.partitionKey = `demo`;
    score.createdAt = `${new Date()}`;
    return scoreDb.then(db => {
        const transaction = db.transaction('scoreFiles', 'readwrite');
        transaction.objectStore('scoreFiles').put(score);
        return transaction.complete;
    }).then(() => {
        let event = new Event('saveData');
        document.body.dispatchEvent(event);
    });
}
