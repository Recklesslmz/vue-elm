import Vue from 'vue'
import Router from 'vue-router'
import food from '../pages/food'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'food',
      component: food,
      children: [
        {
          path: '/',
          name: 'goods',
          component: goods,
        },
        {
          path: '/ratings',
          name: 'ratings',
          component: ratings,
        },
        {
          path: '/seller',
          name: 'seller',
          component: seller,
        },
      ]
    }
  ]
})
