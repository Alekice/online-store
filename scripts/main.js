import {Range} from './range.js';

const SIDEBAR = document.querySelector(".aside .content-container");

let priceRangeParams = {
    min: 100,
    max: 10000,
    title: "Price, $",
    name: "price",
    minDifference: 500
};

let priceRange = new Range(priceRangeParams);

let stockRangeParams = {
    min: 1,
    max: 20,
    title: "Stock",
    name: "stock"
};

let stockRange = new Range(stockRangeParams);

SIDEBAR.appendChild(priceRange.createRangeElement());
SIDEBAR.appendChild(stockRange.createRangeElement());