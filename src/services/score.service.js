export const scoreService = {
    getList,
    postScore
  };

const URL = 'https://pwaserverless.azurewebsites.net/api/GetScores';

function getList(){
    return fetch(URL,{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      })
    .then(response=>{
        return response.json();
    });
}

function postScore(score){
  return fetch(URL,{
      method:"POST",
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(score)
    })
  .then(response=>{
      return response.json();
  });
}
