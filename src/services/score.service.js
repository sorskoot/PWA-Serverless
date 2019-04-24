export const scoreService = {
    getList,    
  };

function getList(){
    return new Promise((res,rej)=>{
        res([
            {date:'04-06-2019 11:45:23',score:8, name:'Team Joe'},
            {date:'04-12-2019 14:15:12',score:23, name:'Team Hanna'},
            {date:'04-12-2019 15:05:45',score:42, name:'Team Green'}]);
    })
}