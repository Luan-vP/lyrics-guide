<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// SEO
useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <div v-if="page" class="container">
    <div class="content-page">
      <MDCRenderer :value="page" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0;
}
</style>
