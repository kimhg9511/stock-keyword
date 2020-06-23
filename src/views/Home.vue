<template>
  <div class="home">
    <Carousel />
    <CardList />
    <D3Test />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import CardList from '@/components/CardList.vue'
import D3Test from '@/components/D3Test.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    CardList,
    D3Test
  }
}
</script>