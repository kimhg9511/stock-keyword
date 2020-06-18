<template>
  <div class="home">
    <Carousel />
    <CardList />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import CardList from '@/components/CardList.vue'
export default {
  name: 'Home',
  components: {
    Carousel,
    CardList
  }
}
</script>