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
		let className = ['violet', 'green', 'carmazin', 'yellow', 'lightbrown'];
		newLi.className = `fruit__item fruit_${className[i]}`;
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
		let randomIndex = getRandomInt(0, fruits.length);
		let randomElement = fruits.splice(randomIndex - 1, 1);
		result.push(randomElement[0]);
		// вырезаем его из fruits и вставляем в result.
		// ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
		// (массив fruits будет уменьшатся, а result заполняться)
	};
	fruits = result;
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
	fruits.filter((item) => {
		// TODO: допишите функцию
	});
};

filterButton.addEventListener('click', () => {
	filterFruits();
	display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
	// TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
	bubbleSort(arr, comparation) {
		// TODO: допишите функцию сортировки пузырьком
	},

	quickSort(arr, comparation) {
		// TODO: допишите функцию быстрой сортировки
	},

	// выполняет сортировку и производит замер времени
	startSort(sort, arr, comparation) {
		const start = new Date().getTime();
		sort(arr, comparation);
		const end = new Date().getTime();
		sortTime = `${end - start} ms`;
	},
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
	// TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
	// TODO: вывести в sortTimeLabel значение 'sorting...'
	const sort = sortAPI[sortKind];
	sortAPI.startSort(sort, fruits, comparationColor);
	display();
	// TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
	// TODO: создание и добавление нового фрукта в массив fruits
	// необходимые значения берем из kindInput, colorInput, weightInput
	display();
});
