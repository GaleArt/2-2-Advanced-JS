<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  
  <header>
    <div class="menu container">
      <div class="search">
        <input type="textarea" class="goods-search" v-model="filterValue" />
        <button class="srch-btn" @click="filterGoods">Поиск</button>
      </div>
      <div class="price">
        <div class="price-total"></div>
        <button class="cart-button">Корзина</button>
      </div>
    </div>
  </header>

  <main>
    <div class="goods-list">
      <div class="goods-item" v-for="good in goods" :key="good">
        <div class="picture"></div>
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }} руб.</p>
        <button class="add-btn" @click="addLike">Добавить</button>
      </div>
      <div class="goods-item">
        <h3>Проверка:</h3>
        <p>{{ likes }}</p>
        <button class="del-btn" @click="addDislike">Удалить</button>
        <p>Инпут: {{ filterValue }}</p>
      </div>
    </div>
  </main>

</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      likes: 10,
      goods: [
        { product_name: 'Ноутбук', price: 45600, quantity: '1' },
        { product_name: 'Мышка', price: 1000, quantity: '1' },
      ],
      filterValue: ''
    }
  },
  inputValue: "",
  methods: {
    addLike() {
      this.likes += 1;
    },
    addDislike() {
      this.likes -= 1;
    },
    makeGETRequest(url, callback) {
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
      xhr.open('GET', '', true);
      xhr.send();
    },
    //   fetchGoods(callback) {
    // makeGETRequest('', (goods) => {
    //       this.goods = JSON.parse(goods);
    //       this.filteredGoods = JSON.parse(goods);
    //       callback();
    //     });
    //   }
  },
  computed: {
    filterGoods() {
      return this.goods.filter((good) => {
        return good.indexOf(this.filterValue, 0) !== -1
      })
    }
  }
}
</script>
