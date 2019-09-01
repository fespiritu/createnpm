import Moment from 'moment';

export const defaultRoundNum = 4;
export const roundNumOnPoints = 5;

// Pip Stufs
// Total candle size = high - low
export function calcTotalCandleSizeHighLow(candleMid) {
    let totalSize = 0;
    if (candleMid) {
        totalSize = candleMid.h - candleMid.l;
    }
    return totalSize;
}

/* 
    Calculate top wick size
    - Bullish
    size = high - close
         = 0.0250

    - Bearish
    size = high - open
*/

export function calcWickSize(candleMid, isTop) {
    let totalSize = 0;
    if (candleMid) {
        const isBullish = isCandleBullish(candleMid);
        if (isBullish) {
            if (isTop) {
                totalSize = candleMid.h - candleMid.c;
            } else {
                totalSize = candleMid.o - candleMid.l;
            }
        } else {
            if (isTop) {
                totalSize = candleMid.h - candleMid.o;
            } else {
                totalSize = candleMid.c - candleMid.l;
            }
        }
    }
    return totalSize;
}

/*
    Calculate top or bottom wick pct (and decimal for further calculations; )
    Top wick in decimal = Top Wick Size / Total candle size
    = 0.0008 / 0.0012
    = 0.6212 (decimal)
    (pct = 62%)

    Then convert it somewhere when ready to display as pct (62%)
*/
export function calcWickPct(candleMid, isTop) {
    let wickPctAndDecimal = {
        pct: '',
        decimal: 0
    };

    const wickSize = calcWickSize(candleMid, isTop);
    const totalCandleSize = calcTotalCandleSizeHighLow(candleMid);
    if (totalCandleSize > 0) {
        wickPctAndDecimal.decimal = wickSize / totalCandleSize;
        wickPctAndDecimal.pct = wickPctAndDecimal.decimal.toLocaleString("en", {style: "percent"})
        // with decimal
        // fraction.toLocaleString("en", { style: "percent", minimumFractionDigits: 2 })
    }

    return wickPctAndDecimal;
}

// Determine if candle is bullish (green) or not (bearish-red)
// if data is missing, don't call this function
export function isCandleBullish(candleMid) {
    const isUp = candleMid.c - candleMid.o >= 0 ? true : false;
    return isUp;
}

// Oanda stuffs
export function getOandaInstruments() {
    return [
        'AUD_NZD','AUD_USD','AUD_JPY','AUD_CHF','AUD_CAD',
        'CAD_CHF','CAD_JPY','CHF_JPY',
        'EUR_GBP','EUR_AUD','EUR_USD','EUR_JPY','EUR_CHF','EUR_NZD',
        'GBP_CAD','GBP_JPY','GBP_USD','GBP_AUD','GBP_NZD','GBP_CHF',
        'NZD_USD','NZD_CHF','NZD_CAD',
        'USD_CHF','USD_JPY','USD_CAD'
    ];
}

// Time stuffs

/*
Params:
    - time = '2019-06-07T13:00:00.000000000Z'
    -      = Sat Jun 08 2019 08:12:43 GMT-0700 (Pacific Daylight Time) also works (from new Date())

Output: 06/07/2019 10:00 AM Fri
*/
export function convertTime_MMDDYYYhhmmTimeDay(utcString) {
    const dateTime = Moment(utcString).format('MM/DD/YYYY hh:mm A ddd');
    return dateTime;
}

/*
Params:
	- time = '2019-06-07T13:00:00.000000000Z'
    -      = Sat Jun 08 2019 08:12:43 GMT-0700 (Pacific Daylight Time) also works (from new Date())

Output: 06/07/2019 10:00:00 AM Fri
*/
export function convertTime_MMDDYYYhhmmssTimeDay(utcString) {
    // console.log('convertTime_MMDDYYYhhmmssTimeDay utcString input: ', utcString);
    const dateTime = Moment(utcString).format('MM/DD/YYYY hh:mm:ss A ddd');
    // console.log('convertTime_MMDDYYYhhmmssTimeDay output: ', dateTime);
    return dateTime;
}

/*
Params:
	- time = '2019-06-07T13:00:00.000000000Z'
    -      = Sat Jun 08 2019 08:12:43 GMT-0700 (Pacific Daylight Time) also works (from new Date())

Output: 2019-07-06_10-00-00-AM-Fri
*/
export function convertTime_MMDDYYYhhmmssTimeDayForFilename(utcString) {
    const dateTime = Moment(utcString).format('YYYY-MM-DD_hh-mm-ss-A-ddd');
    return dateTime;
}

// doesn't matter where
export function storeObjectToStorage(key, obj) {
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch(err) {
        console.log('storeObjectToStorage err: ', err);
    }
    
}

export function getObjectFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        if (item) {
            console.log('JSON.parse(item): ', JSON.parse(item));
            return JSON.parse(item);
        }
    } catch(err) {
        console.log('getObjectFromStorage err: ', err);
    }
}

export function deleteObjectInStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch(err) {
        console.log('deleteObjectInStorage err: ', err);
    }
    
}


export function clearStorage() {
    try {
        localStorage.clear();
    } catch(err) {
        console.log('clearStorage err: ', err);
    }
    
}

export function getOandaGranularities() {
    return [
        'M1','M5','M15','M30','H1','H4','D','W','M'
    ]
}

export function mySimpleSort(dataObjList, isAsc) {
    
    if (dataObjList && dataObjList.length > 0) {
        if (isAsc) {
            return dataObjList.sort((x,y) => x > y ? 1 : -1)
        } else {
            return dataObjList.sort((x,y) => x < y ? 1 : -1)
        }
    }
    return dataObjList;
}

/*
model = {
    factor: 12,
    xl: 5,
    lg: 5,
    md: 4,
    sm: 3,
    xs: 1
}
*/
export function getCssBreakpoints(model) {
    let css = 'col';
    if (model) {
        let factorToUse = !model.factor ? 12 : model.factor;
        const xl = parseInt(factorToUse / model.xl);
        const lg = parseInt(factorToUse / model.lg);
        const md = parseInt(factorToUse / model.md);
        const sm = parseInt(factorToUse / model.sm);
        const xs = parseInt(factorToUse / model.xs);
        css = `col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl}`
    }
    return css;
}

export function mySort(dataObjList, key, isAsc) {
    
    if (dataObjList && dataObjList.length > 0) {
        if (isAsc) {
            return dataObjList.sort((x,y) => x[key] > y[key] ? 1 : -1)
        } else {
            return dataObjList.sort((x,y) => x[key] < y[key] ? 1 : -1)
        }
    }
    return dataObjList;
}
export function convertToTvSymbol(symbol) {
    const newSymbol = symbol;
    if(newSymbol) {
        return newSymbol.replace('_', '');
    }
    return newSymbol;
}


export function roundMyNumber(numToRound, numPlaces) {
    // let num = Math.round(numToRound, numPlaces);
    try {
        if(!isNaN(numToRound)) {
            const newNum = parseFloat(numToRound).toFixed(numPlaces);
            return newNum;
        }
    } catch(err) {
        console.log('roundMyNumber err: ', err);
        console.log('roundMyNumber err numToRound: ', numToRound);
    }
    return numToRound;
}

export function isANum(val) {
    const isItNumber = !isNaN(parseFloat(val));
    return isItNumber;
}
export function isValidNumber(x, a) {
    return (isANum(x) && isANum(a));
}