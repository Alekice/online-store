const SIDEBAR = document.querySelector(".aside .content-container");

class Range {
    constructor(params) {
        this.min = params.min;
        this.max = params.max;
        this.title = params.title;
        this.name = params.name;
        this.step = params.step || 1;
        this.minDifference = params.minDifference || 1;
    }

    createRangeElement() {
        const range = document.createElement("div");
        range.classList.add("range");

        // create and append title
        const rangeTitle = document.createElement("p");
        rangeTitle.classList.add("range__title");
        rangeTitle.textContent = this.title;
        range.appendChild(rangeTitle);

        // create wrapper for range-inputs
        const rangeInputWrapper = document.createElement("div");
        rangeInputWrapper.classList.add("range__input-wrapper");

        // create range input Min
        const rangeInputMin = document.createElement("input");
        rangeInputMin.classList.add("range__input");
        rangeInputMin.setAttribute("type", "range");
        rangeInputMin.setAttribute("min", this.min);
        rangeInputMin.setAttribute("max", this.max);
        rangeInputMin.setAttribute("step", this.step);
        rangeInputMin.setAttribute("value", this.min);
        rangeInputMin.setAttribute("id", `${this.name}Min`);
        rangeInputMin.dataset.name = "min";
        rangeInputMin.addEventListener("input", this.handleRange.bind(this));

        // create range input Max
        const rangeInputMax = document.createElement("input");
        rangeInputMax.classList.add("range__input");
        rangeInputMax.setAttribute("type", "range");
        rangeInputMax.setAttribute("min", this.min);
        rangeInputMax.setAttribute("max", this.max);
        rangeInputMax.setAttribute("step", this.step);
        rangeInputMax.setAttribute("value", this.max);
        rangeInputMax.setAttribute("id", `${this.name}Max`);
        rangeInputMax.dataset.name = "max";
        rangeInputMax.addEventListener("input", this.handleRange.bind(this));

        // append range inputs Min and Max
        rangeInputWrapper.appendChild(rangeInputMin);
        rangeInputWrapper.appendChild(rangeInputMax);

        // append wrapper for range-inputs
        range.appendChild(rangeInputWrapper);

        // create wrapper for text-inputs
        const textInputWrapper = document.createElement("div");
        textInputWrapper.classList.add("range__text-input-wrapper");

        // create label for text input Min
        const labelTextInputMin = document.createElement("label");
        labelTextInputMin.classList.add("range__label");
        labelTextInputMin.setAttribute("for", `${this.name}MinText`);
        labelTextInputMin.textContent = "from";

        // create text input Min
        const textInputMin = document.createElement("input");
        textInputMin.classList.add("text__input");
        textInputMin.setAttribute("type", "text");
        // textInputMin.setAttribute("placeholder", "from");
        textInputMin.setAttribute("value", this.min);
        textInputMin.setAttribute("name", `${this.name}Min`);
        textInputMin.setAttribute("id", `${this.name}MinText`);
        textInputMin.dataset.name = "min";
        textInputMin.addEventListener("keydown", this.handleTextRange.bind(this));

        labelTextInputMin.appendChild(textInputMin);

        // create label for text input Min
        const labelTextInputMax = document.createElement("label");
        labelTextInputMax.classList.add("range__label");
        labelTextInputMax.setAttribute("for", `${this.name}MaxText`);
        labelTextInputMax.textContent = "to";

        // create text input Max
        const textInputMax = document.createElement("input");
        textInputMax.classList.add("text__input");
        textInputMax.setAttribute("type", "text");
        // textInputMax.setAttribute("placeholder", "to");
        textInputMax.setAttribute("value", this.max);
        textInputMax.setAttribute("name", `${this.name}Max`);
        textInputMax.setAttribute("id", `${this.name}MaxText`);
        textInputMax.dataset.name = "max";
        textInputMax.addEventListener("keydown", this.handleTextRange.bind(this));

        labelTextInputMax.appendChild(textInputMax);

        // append text inputs Min and Max
        textInputWrapper.appendChild(labelTextInputMin);
        textInputWrapper.appendChild(labelTextInputMax);

        // append wrapper for text-inputs
        range.appendChild(textInputWrapper);

        return range;
    }

    handleRange(e) {
        const target = e.target;
        const dataName = target.dataset.name;

        let lowerValue, upperValue;

        if (dataName === "min") {
            lowerValue = parseInt(target.value);
            upperValue = parseInt(target.closest(".range").querySelector(`.range__input[data-name="max"]`).value);

            if (lowerValue > upperValue - this.minDifference) {
                target.value = upperValue - this.minDifference;
                return;
            }

        } else if (dataName === "max") {
            lowerValue = parseInt(target.closest(".range").querySelector(`.range__input[data-name="min"]`).value);
            upperValue = parseInt(target.value);

            if (upperValue < lowerValue + this.minDifference) {
                target.value = lowerValue + this.minDifference;
                return;
            }

        }

        const textInput = target.closest(".range").querySelector(`.text__input[data-name="${dataName}"]`);
        textInput.value = `${textInput.placeholder} ${target.value}`;

    }

    handleTextRange(e) {

        const keyCode = e.keyCode;

        if (keyCode === 13) {

            const target = e.target;
            const dataName = target.dataset.name;

            const rangeInputMin = target.closest(".range").querySelector(`.range__input[data-name="min"]`);
            const rangeInputMax = target.closest(".range").querySelector(`.range__input[data-name="max"]`);

            const textInputMin = target.closest(".range").querySelector(`.text__input[data-name="min"]`);
            const textInputMax = target.closest(".range").querySelector(`.text__input[data-name="max"]`);

            let lowerValue = parseInt(textInputMin.value);
            let upperValue = parseInt(textInputMax.value);

            if (!lowerValue || lowerValue < parseInt(rangeInputMin.min)) {
                lowerValue = parseInt(rangeInputMin.min);
            }

            if (!upperValue || upperValue > parseInt(rangeInputMin.max)) {
                upperValue = parseInt(rangeInputMax.max);
            }

            if (dataName === "min") {
                if (lowerValue > upperValue - this.minDifference) {
                    lowerValue = upperValue - this.minDifference;
                }
            }

            if (dataName === "max") {
                if (upperValue < lowerValue + this.minDifference) {
                    upperValue = lowerValue + this.minDifference;
                }
            }

            textInputMin.value = rangeInputMin.value = lowerValue;
            textInputMax.value = rangeInputMax.value = upperValue;

        }

    }
}

// document.addEventListener("keydown", () => console.log(document.querySelector("input:focus")));

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



// var lowerSlider = document.querySelector("#lower"),
//   upperSlider = document.querySelector("#upper"),
//   lowerVal = parseInt(lowerSlider.value);
// upperVal = parseInt(upperSlider.value);

// var min = document.getElementById("min");
// min.value += lowerVal;

// var max = document.getElementById("max");
// max.value += upperVal;

// upperSlider.oninput = function () {
//   lowerVal = parseInt(lowerSlider.value);
//   upperVal = parseInt(upperSlider.value);

//   if (upperVal < lowerVal + 6000) {
//     lowerSlider.value = upperVal - 6000;

//     if (lowerVal == lowerSlider.min) {
//       upperSlider.value = 6000;
//     }
//   }
//   max.value = "до " + this.value;
// };

// lowerSlider.oninput = function () {
//   lowerVal = parseInt(lowerSlider.value);
//   upperVal = parseInt(upperSlider.value);

//   if (lowerVal > upperVal - 6000) {
//     upperSlider.value = lowerVal + 6000;

//     if (upperVal == upperSlider.max) {
//       lowerSlider.value = parseInt(upperSlider.max) - 6000;
//     }
//   }
//   min.value = "от " + this.value;
// };