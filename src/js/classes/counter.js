import {
  templater
} from './templater';

export class Counter {

  constructor() {
    let oldgamesElement = document.querySelector('#old-games');
    if (!!oldgamesElement) {
      let oldgamesTemplate = document.querySelector('#oldScoreTemplate');

      this.getOldGames().then(oldgames => {
        oldgames = oldgames.slice(0,10);
        for (let i = 0; i < oldgames.length; i++) {
          const element = templater(oldgamesTemplate.innerHTML, oldgames[i]);
          oldgamesElement.innerHTML += element;
        }
      });
    }
  }

  getOldGames() {
    return new Promise((resolve, reject) => {
      resolve([{
          date: '04-06-2019',
          score: 15
        },
        {
          date: '04-05-2019',
          score: 12
        },
        {
          date: '04-04-2019',
          score: 27
        },
        {
          date: '04-03-2019',
          score: 5
        },
        {
          date: '03-06-2019',
          score: 15
        },
        {
          date: '03-05-2019',
          score: 12
        },
        {
          date: '03-04-2019',
          score: 27
        },
        {
          date: '03-03-2019',
          score: 5
        },
        {
          date: '02-06-2019',
          score: 15
        },
        {
          date: '02-05-2019',
          score: 12
        },
        {
          date: '02-04-2019',
          score: 27
        },
        {
          date: '02-03-2019',
          score: 5
        }
      ])
    });

  }
}