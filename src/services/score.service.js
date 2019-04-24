export const scoreService = {
    getList,    
  };

function getList(){
    return fetch('https://pwaserverless.azurewebsites.net/api/GetScores',{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
      })
    .then(response=>{
        return response.json();
    });
    
}