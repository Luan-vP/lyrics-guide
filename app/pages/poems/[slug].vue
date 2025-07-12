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
  <div v-if="page" class="poem-container">
    <header class="poem-header">
      <h1 class="poem-title">{{ page.title }}</h1>
    </header>
    
    <article class="poem-content">
      <ContentRenderer :value="page" />
    </article>
    
    <nav class="poem-navigation">
      <NuxtLink to="/" class="nav-link home-link">
        ← Back to Home
      </NuxtLink>
      <div class="nav-spacer"></div>
    </nav>
  </div>
</template>
