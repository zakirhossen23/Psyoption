

export async function tokengetbyeventid(eventid) {
    const fetch = require('node-fetch');

    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/tokensbyevent';

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
        body: `{"id": ${eventid}}`
    };
    var allTokens;
    var booltrue = true;
    while (booltrue) {
        try {
            await fetch(url, options).then(res => res.json())
                .then(json => allTokens = json)
        } catch (er) {
            continue;
        }
        break;
    }

    return allTokens;
}



export async function createBid(Tokenid, UserName, Bidprice) {
    const fetch = require('node-fetch');

    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/createbid';
    let currentDate = new Date();
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
        body: `{"Tokenid":${Tokenid},"Date":"${currentDate}","UserName":"${UserName._address}","Bidprice": ${Bidprice}}`
    };
    var booltrue = true;

    while (booltrue) {
        try {
            await fetch(url, options)
                .then(res => res.json())
        } catch (er) { setTimeout(function() {}, 2000); continue; }
        break;
    }
}

export async function ReduceCategory(categoryId) {
    const fetch = require('node-fetch');

    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/updatecategory';
    
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
        body: `{"id":${categoryId}}`
    };
    var booltrue = true;

    while (booltrue) {
        try {
            await fetch(url, options)
                .then(res => res.json())
        } catch (er) { setTimeout(function() {}, 2000); continue; }
        break;
    }
}


export async function bidsgetbytokenid(Tokenid) {
    const fetch = require('node-fetch');

    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/bidbytoken';

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
        body: `{"id": ${Tokenid}}`
    };
    var allBids;
    var booltrue = true;


    while (booltrue) {
        try {
            await fetch(url, options)
                .then(res => res.json())
                .then(json => allBids = json)
        } catch (er) { continue; }


        break;
    }

    return allBids;
}
