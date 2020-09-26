// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
//console.log(fruits[0].kind);

/*** ОТОБРАЖЕНИЕ ***/
//console.log(fruitsList);
// отрисовка карточек
const display = () => {
	// TODO: очищаем fruitsList от вложенных элементов,
	fruitsList.innerHTML = '';
	// чтобы заполнить актуальными данными из fruits

	for (let i = 0; i < fruits.length; i++) {
		// TODO: формируем новый элемент <li> при помощи document.createElement,
		// create the li element
		let newLi = document.createElement("li");

		// create the div elements
		let Div_fruitInfo = document.createElement("div");
		let Div_index = document.createElement("div");
		let Div_kind = document.createElement("div");
		let Div_color = document.createElement("div");
		let Div_weight = document.createElement("div");

		// create className

		(fruits[i].color === "фиолетовый") ? newLi.className = `fruit__item fruit_violet` :
			(fruits[i].color === "зеленый") ? newLi.className = `fruit__item fruit_green` :
				(fruits[i].color === "розово-красный") ? newLi.className = `fruit__item fruit_carmazin` :
					(fruits[i].color === "желтый") ? newLi.className = `fruit__item fruit_yellow` :
						(fruits[i].color === "светло-коричневый") ? newLi.className = `fruit__item fruit_lightbrown` :
							newLi.className = `fruit__item fruit_black`;
		Div_fruitInfo.className = "fruit__info";

		// add the values
		Div_index.appendChild(document.createTextNode(`index: ${i}`));
		Div_kind.appendChild(document.createTextNode(`kind: ${fruits[i].kind}`));
		Div_color.appendChild(document.createTextNode(`color: ${fruits[i].color}`));
		Div_weight.appendChild(document.createTextNode(`weight: ${fruits[i].weight}`));

		//finally creating elements tree
		let newList = fruitsList.appendChild(newLi);
		let newDiv = newList.appendChild(Div_fruitInfo);
		newDiv.appendChild(Div_index);
		newDiv.appendChild(Div_kind);
		newDiv.appendChild(Div_color);
		newDiv.appendChild(Div_weight);
	}
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
	let result = [];
	while (fruits.length > 0) {
		// TODO: допишите функцию перемешивания массива
		// находим случайный элемент из fruits, используя getRandomInt
		let randomIndex = getRandomInt(0, fruits.length - 1);
		let randomElement = fruits.splice(randomIndex, 1);
		result.push(randomElement[0]);
		// вырезаем его из fruits и вставляем в result.
		// ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
		// (массив fruits будет уменьшатся, а result заполняться)
	};
	(result === fruits) ? alert('Порядок не изменился') : (fruits = result);
	return fruits;
}

//shuffleFruits();
//console.log(fruits);
//fruits.shuffleFruits();

shuffleButton.addEventListener('click', () => {
	shuffleFruits();
	display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
	// TODO: допишите функцию
	fruits = JSON.parse(fruitsJSON);
	let minWeight = parseInt(document.getElementById("minWeight_input").value);
	let maxWeight = parseInt(document.getElementById("maxWeight_input").value);
	const result = fruits.filter((el) => {
		const weight = el.weight;
		return fruits.some(el => (weight >= minWeight) && (weight <= maxWeight));
	});
	fruits = result;
	return fruits;
};

filterButton.addEventListener('click', () => {
	filterFruits();
	display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

let fruitsHSL = () => {
	fruits.forEach(el =>
		(el.color === "фиолетовый") ? (el.color = "273") :
			(el.color === "зеленый") ? (el.color = "120") :
				(el.color === "розово-красный") ? (el.color = "350") :
					(el.color === "желтый") ? (el.color = "60") :
						(el.color === "светло-коричневый") ? (el.color = "30") :
							el.color = el.color
	);
	return fruits;
};

let fruitsHSLtoColor = () => {
	fruits.forEach(el =>
		(el.color === "273") ? (el.color = "фиолетовый") :
			(el.color === "120") ? (el.color = "зеленый") :
				(el.color === "350") ? (el.color = "розово-красный") :
					(el.color === "60") ? (el.color = "желтый") :
						(el.color === "30") ? (el.color = "светло-коричневый") :
							el.color = el.color
	);
	return fruits;
};

const comparationColor = (fruitColor1, fruitColor2) => {
	// TODO: допишите функцию сравнения двух элементов по цвету
	fruitsHSL();
	return (parseInt(fruitColor1) > parseInt(fruitColor2)) ? true : false;
};

// функция обмена элементов
function swap(items, firstIndex, secondIndex) {
	const temp = items[firstIndex];
	items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
}

// функция разделитель
function partition(items, left, right) {
	let pivot = items[Math.floor((right + left) / 2)],
		i = left,
		j = right;
	while (i <= j) {
		while (items[i] < pivot) {
			i++;
		}
		while (items[j] > pivot) {
			j--;
		}
		if (i <= j) {
			swap(items, i, j);
			i++;
			j--;
		}
	}
	return i;
}

const sortAPI = {
	bubbleSort(fruits, comparationColor) {
		// TODO: допишите функцию сортировки пузырьком
		const n = fruits.length;
		// внешняя итерация по элементам
		for (let i = 0; i < n - 1; i++) {
			// внутренняя итерация для перестановки элемента в конец массива
			for (let j = 0; j < n - 1 - i; j++) {
				// сравниваем элементы
				if (comparationColor(fruits[j].color, fruits[j + 1].color)) {
					// делаем обмен элементов
					let temp = fruits[j + 1];
					fruits[j + 1] = fruits[j];
					fruits[j] = temp;
				}
			}
		}
		fruitsHSLtoColor();
	},

	quickSort(fruits, comparationColor) {
		// TODO: допишите функцию быстрой сортировки

		// алгоритм быстрой сортировки
		function quickSort(items, left, right) {
			let index;
			if (items.length > 1) {
				left = typeof left != "number" ? 0 : left;
				right = typeof right != "number" ? items.length - 1 : right;
				index = partition(items, left, right);
				if (left < index - 1) {
					quickSort(items, left, index - 1);
				}
				if (index < right) {
					quickSort(items, index, right);
				}
			}
			return items;
		}




	},

	// выполняет сортировку и производит замер времени
	startSort(sort, fruits, comparationColor) {
		const start = new Date().getTime();
		sort(fruits, comparationColor);
		const end = new Date().getTime();
		sortTime = `${end - start} ms`;
	},
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
	// TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
	(sortKind === "bubbleSort") ? (sortKind = 'quickSort') : (sortKind = 'bubbleSort');
	sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
	// TODO: вывести в sortTimeLabel значение 'sorting...'
	sortTimeLabel.textContent = 'sorting...';
	const sort = sortAPI[sortKind];
	sortAPI.startSort(sort, fruits, comparationColor);
	display();
	// TODO: вывести в sortTimeLabel значение sortTime
	sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
	// TODO: создание и добавление нового фрукта в массив fruits
	// необходимые значения берем из kindInput, colorInput, weightInput
	display();
});
