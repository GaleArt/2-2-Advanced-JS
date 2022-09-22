// Lesson #2
class GoodsItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}
	render() {
		return `<div class="goods-item">
    		<div class="picture"></div>
    		<h3>${this.title}</h3>
    		<p>${this.price}</p>
    		<button class="add-btn">Добавить</button>
    		</div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}
	fetchGoods() {
		this.goods = [
			{ title: 'Shirt', price: 150 },
			{ title: 'Socks', price: 50 },
			{ title: 'Jacket', price: 350 },
			{ title: 'Shoes', price: 250 },
			{ title: 'T-shirt', price: 180 },
			{ title: 'Vest', price: 400 },
			{ title: 'Shorts', price: 250 },
			{ title: 'Skirt', price: 320 },
			{ title: 'Coat', price: 600 },
			{ title: 'Raincoat', price: 480 },
			{ title: 'Stockings', price: 240 },
			{ title: 'Sweatshirt', price: 350 },
		];
	}
	render() {
		let listHtml = '';
		this.goods.forEach((good) => {
			const goodItem = new GoodsItem(good.title, good.price);
			listHtml += goodItem.render();
		});
		document.querySelector('.goods-list').innerHTML = listHtml;
	}
}

// 1. Добавление классов для корзины и элемента корзины (по сути идентично общей странице)
class BasketItem {
	constructor(title, price) {
		this.title = title;
		this.price = price;
	}
	render() {
		// Для проверки пока используется тот же рендер
		return `<div class="goods-item">
    		<div class="picture"></div>
    		<h3>${this.title}</h3>
    		<p>${this.price}</p>
    		<button class="add-btn">Удалить</button>
    		</div>`;
	}
}

class Basket {
	constructor() {
		this.chooses = [];
	}
	// Предполагаем, что выбранные элементы тоже будут храниться на сервере
	fetchBasket() {
		this.chooses = [
			{ title: 'Test #1', price: 150 },
			{ title: 'Test #2', price: 50 },
		];
	}
	// Место для добавление и удаление элемента из корзины:
	addBasket() {}
	delBasket() {}
	// Для удаления отображаемых элементов страницы и рендера массива корзины
	render() {
		let basketHtml = '';
		this.chooses.forEach((choose) => {
			const chooseItem = new BasketItem(choose.title, choose.price);
			basketHtml += chooseItem.render();
		});
		document.querySelector('.goods-list').innerHTML = basketHtml; // передается в тот же div
	}
	// 2. Добавление метода суммарной стоимости (но уже для корзины):
	calculatePrice() {
		const priceList = this.chooses.reduce((total, choose) => {
			return total + choose.price;
		}, 0);
		document.querySelector(
			'.price-total'
		).innerHTML = `<div class='price-title'>В корзине: </div>${priceList} $ `;
	}
}

const list = new GoodsList();
list.fetchGoods();
list.render();
const basket = new Basket();
basket.fetchBasket();
basket.calculatePrice(); // обработкой на кнопку не понравилось :)
