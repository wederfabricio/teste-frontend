<template>
  <div>
      <Header title='Monte seu prato'></Header>
      <Menu></Menu>
  </div>
</template>

<script>
import Header from './Header.vue';
import Menu from './Menu.vue';

export default {
    name: 'App',
    components: {
        Header,
        Menu
    }
}
</script>