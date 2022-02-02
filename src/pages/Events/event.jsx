
export async function eventgetbyid(id) {
    const fetch = require('node-fetch');

    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/events';

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
    };

    var allEvents;
    var booltrue = true;
    while (booltrue) {
        try {
            console.log("booltrue")
            await fetch(url, options).then(res => res.json())
                .then(json => allEvents = json)
            
        } catch (er) {
            setTimeout(function() {}, 2000);
            continue;
        }
        
        break;
    }


    for (let i = 0; i < allEvents.length; i++) {
        if (Number(allEvents[i].id) == id) {
            return allEvents[i];
        }
    }


}

export async function createEventAPI(EventTitle, EventDescription, EventDate, EventWalletAddressGoal, EventGoal, EventLogo, wallettype) {
    const fetch = require('node-fetch');
    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/create';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
        body: `{"title":"${EventTitle}","description":"${EventDescription}","endDate":"${EventDate}" ,"Goal":${EventGoal},"logolink":"${EventLogo}", "wallet":"${EventWalletAddressGoal}","wallettype":"${wallettype}"}`
    };
    console.log("options:");
    console.log(options);

    var allEvents;
    var booltrue = true;
    while (booltrue) {
        try {
            await fetch(url, options).then(res => res.json())
                .then(json => allEvents = json)
        } catch (er) {
            continue;
        }
        break;
    }
    return allEvents.id;
}

export async function createEventCategoryAPI(eventId, catTitle, catAmount,catPrice,catImg) {
    const fetch = require('node-fetch');
    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/createcategories';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
        body: `{"eventid":${eventId},"title":"${catTitle}","price":${catPrice} ,"amount":${catAmount},"image":"${catImg}"}`
    };
    console.log("options:");
    console.log(options);

    var allCategories;
    var booltrue = true;
    while (booltrue) {
        try {
            await fetch(url, options).then(res => res.json())
                .then(json => allCategories = json)
        } catch (er) {
            continue;
        }
        break;
    }
    return true;
}

export async function getCategoriesbyeventid(eventid) {
    const fetch = require('node-fetch');

    let url = 'https://cors-anyhere.herokuapp.com/https://demetergift-database.vercel.app/api/categoriesbyid';

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json, text/plain, */*'
        },
        body: `{"id": ${eventid}}`
    };
    var allCategories;
    const booltrue = true;
    while (booltrue) {
        try {
            await fetch(url, options).then(res => res.json())
                .then(json => allCategories = json)
        } catch (er) {
            continue;
        }
        break;
    }

    return allCategories;
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}
export async function CreatePlugin(src) {
    const output = `<html><head></head><body><iframe src="${src}" style="width: 100%;height: 100%;" /></body></html>`;
    // Download it
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    downloadURI(fileDownloadUrl, "Generated Plugin.html");
    console.log(output);
}