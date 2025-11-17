import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    Object.keys(indexes)                                                    // Получаем ключи из объекта
        .forEach((elementName) => {                                         // Перебираем по именам
            elements[elementName].append(                                   // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])                      // формируем массив имён, значений опций
                    .map(name => {                                          // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option');    // создать и вернуть тег опции
                        option.value = name;
                        option.textContent = name;

                        return option;
                    })
            )
        })

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            state[action.dataset.field] = '';
            action.parentElement.firstElementChild.value = '';
        }

        return data.filter(row => compare(row, state));
    }
}