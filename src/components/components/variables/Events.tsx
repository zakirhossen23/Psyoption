
import React from 'react';
var EndDateTime = "2022-01-04T02:34";
var EventTitle;
var EventDescription;

export function setter(date: any) {
    EndDateTime = date;
    console.log("Got - >" + EndDateTime);
}
export const EVENT = {
    EndDateTime: EndDateTime,
    EventTitle: EventTitle,
    EventDescription: EventDescription,
}
var s; let expired;