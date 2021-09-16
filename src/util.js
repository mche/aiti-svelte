const util = {
    re: {
        nonDigit: /\D+/g,
        name: /^\D{2,}\s+\D{2,}\s+\D{2,}$/,
        email: /[0-9a-z_.]+@[0-9a-z_.]+/i,
    },
    datePickerI18n: {
        monthsShort: [
          "янв.",
          "фев.",
          "мар.",
          "апр.",
          "май",
          "июнь",
          "июль",
          "авг.",
          "сент.",
          "окт.",
          "нояб.",
          "дек.",
        ],
        weekdaysShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    },

};
  
export default util;