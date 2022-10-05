// Lesson #4
// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные
// кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
// 3. * Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
// При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
// и сообщить пользователю об ошибке.

// Lesson #5 Все пункты выполняются с использованием Vue.js.
// 1. Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле
// searchLine и привязать к нему содержимое поля ввода. На кнопку Искать добавить
// обработчик клика, вызывающий метод FilterGoods.
// 2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле
// isVisibleCart, управляющее видимостью корзины.
// 3. * Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.
const API_URL =
	'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
function makeGETRequest(url, callback) {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		// xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			callback(xhr.responseText);
		}
	};
	xhr.open('GET', url, true);
	xhr.send();
}

class GoodsItem {
	constructor(product_name, price) {
		this.product_name = product_name;
		this.price = price;
	}
	render() {
		return `<div class="goods-item">
    		<div class="picture"></div>
    		<h3>${this.product_name}</h3>
    		<p>${this.price} руб.</p>
    		<button onclick="basket.addBasket();" class="add-btn">Добавить</button>
    		</div>`;
	}
}
// 3. * Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в
// обработчике этого промиса.
class GoodsList {
	constructor() {
		this.goods = [];
		this.filteredGoods = [];
	}
	fetchGoods(callback) {
		makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
			this.goods = JSON.parse(goods);
			this.filteredGoods = JSON.parse(goods);
			callback();
		});
	}
	filterGoods(value) {
		const regexp = new RegExp(value, 'i');
		this.filteredGoods = this.goods.filter((good) =>
			regexp.test(good.product_name)
		);
		this.render();
	}
	render() {
		let listHtml = '';
		this.filteredGoods.forEach((good) => {
			const goodItem = new GoodsItem(good.product_name, good.price);
			listHtml += goodItem.render();
		});
		document.querySelector('.goods-list').innerHTML = listHtml;
		// Чтобы рендерилась сумма в корзине сделана отдельная функция
		totalPrice();
	}
}

class BasketItem {
	constructor(product_name, price, quantity) {
		this.product_name = product_name;
		this.price = price;
		this.quantity = quantity;
	}
	render() {
		return `<div class="goods-item">
    		<div class="picture"></div>
    		<h3>${this.product_name}</h3>
    		<p>${this.price} руб.</p>
			<div class="quantity">${this.quantity} шт.
				<button onclick="basket.delBasket();" class="del-btn">Удалить</button></div>
    		</div>`;
	}
}

class Basket {
	constructor() {
		this.carts = [];
	}
	fetchBasket(callback) {
		makeGETRequest(`${API_URL}/getBasket.json`, (carts) => {
			this.carts = JSON.parse(carts);
			callback();
		});
	}
	// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из
	// корзины и получения списка товаров корзины.
	// Добавление в корзину (и связь с сервером):
	addBasket() {
		makeGETRequest(`${API_URL}/addToBasket.json`, (result) => {
			result = JSON.parse(result);
			console.log(`Добавлен ${result.result} элемент`);
		});
		// this.carts.contents.quantity += 1;
		// console.log(this.carts.contents.quantity);
	}

	// Удаление из корзины (и связь с сервером):
	delBasket() {
		makeGETRequest(`${API_URL}/deleteFromBasket.json`, (result) => {
			result = JSON.parse(result);
			console.log(`Удален ${result.result} элемент`);
		});
	}

	// Список товаров корзины + подсчет суммы:
	render() {
		let cartHtml = '';
		this.carts.contents.forEach((cart) => {
			const cartItem = new BasketItem(
				cart.product_name,
				cart.price,
				cart.quantity
			);
			cartHtml += cartItem.render();
		});
		document.querySelector('.goods-list').innerHTML = cartHtml;
		// Чтобы рендерилась сумма в корзине сделана отдельная функция
		totalPrice();
	}
}

function totalPrice() {
	makeGETRequest(`${API_URL}/getBasket.json`, (carts) => {
		this.carts = JSON.parse(carts);
		const priceList = this.carts.contents.reduce((total, cart) => {
			return total + cart.price;
		}, 0);
		document.querySelector(
			'.price-total'
		).innerHTML = `<div class='price-title'>В корзине: </div>${priceList} руб `;
	});
}

const list = new GoodsList();
list.fetchGoods(() => {
	list.render();
});

const basket = new Basket();
const cartBtn = document.querySelector('.cart-button');
cartBtn.addEventListener('click', () => {
	basket.fetchBasket(() => {
		basket.render();
	});
});

const searchBtn = document.querySelector('.srch-btn');
const searchInput = document.querySelector('.goods-search');
searchBtn.addEventListener('click', () => {
	const value = searchInput.value;
	list.filterGoods(value);
});
