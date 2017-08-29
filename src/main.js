// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* vue实例化的时候不需要赋值给一个变量，单独设置一行，eslint会跳过这个规则的校验，相当于将某个规则设置为0 */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
router.push('/goods'); // 一进入显示商品组件
