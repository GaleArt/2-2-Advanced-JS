// Lesson #3

const API_URL =
	'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
function makeGETRequest(url, callback) {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
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
	}
	fetchGoods(callback) {
		makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
			this.goods = JSON.parse(goods);
			callback();
		});
	}
	render() {
		let listHtml = '';
		this.goods.forEach((good) => {
			const goodItem = new GoodsItem(good.product_name, good.price);
			listHtml += goodItem.render();
		});
		document.querySelector('.goods-list').innerHTML = listHtml;
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
	// Добавление в корзину:
	addBasket() {
		makeGETRequest(`${API_URL}/addToBasket.json`, (result) => {
			result = JSON.parse(result);
			console.log(`Добавлено ${result.result} элементов`);
		});
	}

	// Удаление из корзины:
	delBasket() {
		makeGETRequest(`${API_URL}/deleteFromBasket.json`, (result) => {
			result = JSON.parse(result);
			console.log(`Удалено ${result.result} элементов`);
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
	}
	// Считалка корзины. Можно сделать глобально, чтобы до того как заходишь в корзину была видна сумма
	calculatePrice() {
		const priceList = this.carts.contents.reduce((total, cart) => {
			return total + cart.price;
		}, 0);
		document.querySelector(
			'.price-total'
		).innerHTML = `<div class='price-title'>В корзине: </div>${priceList} руб `;
	}
}

const list = new GoodsList();
list.fetchGoods(() => {
	list.render();
});

const basket = new Basket();
