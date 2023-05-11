
const dayValue = 24 * 60 * 60 * 1000;
const weekValue = 7 * 24 * 60 * 60 * 1000;



const daysDistance = (startDay, endDay) => {
    return Math.round((endDay - startDay) / dayValue) +1;
}

const weekDistance = (startDay, endDay) => {
    return Math.round((endDay - startDay) / weekValue);
}

const weekIsEmpty = (week) => {
    let empty = true;
    week.forEach((day) => {
        if (day > 0) {
            empty = false;
        }
    });
    return empty;
}

const getOptionalsDays = (startDay, distance) => {
    const week = [-1, -1, -1, -1, -1, -1, -1];
    for(let i=0;i<distance; i++){
        week[startDay % 7] = 0;
        startDay++;
    }
    return week;
}


export {
    daysDistance,
    weekDistance,
    weekIsEmpty,
    getOptionalsDays,
}
