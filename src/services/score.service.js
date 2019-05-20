import { openDB, deleteDB, wrap, unwrap } from 'idb';

export const scoreService = {
    getList,
    postScore
};

const URL = 'https://pwaserverless.azurewebsites.net/api/GetScores';

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
    score.matchId = 1;
    score.createdAt = new Date();
    score.date = '05-20-2019';
    score.partitionkey = `${score.matchId}-${score.name}-${score.date}`;

    return scoreDb.then(db => {
        const transaction = db.transaction('scoreFiles', 'readwrite');
        transaction.objectStore('scoreFiles').put(score);
        return transaction.complete;
    }).then(()=>{
        let event = new Event('saveData');
        document.body.dispatchEvent(event);
    })
    //   return fetch(URL,{
    //       method:"POST",
    //       mode: 'cors',
    //       headers: {
    //         'Access-Control-Allow-Origin':'*',
    //         'Content-Type':'application/json'
    //       },
    //       body: JSON.stringify(score)
    //     })
    //   .then(response=>{
    //       return response.json();
    //   });
}
