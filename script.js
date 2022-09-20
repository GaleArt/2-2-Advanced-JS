const goods = [
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
  { title: 'Sweatshirt', price: 350 }
];

const renderGoodsItem = (title = 'Товар', price = 0) => {
  return `<div class="goods-item">
    <div class="test"></div>
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="add-btn">Добавить
  </div>`;
};

const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);
