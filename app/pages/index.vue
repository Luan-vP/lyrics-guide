<script setup lang="ts">
// Get the index page content
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('content').path('/').first()
})

// Get all poems dynamically
const { data: poems } = await useAsyncData('poems', async () => {
  // Create poems with explicit paths since the query isn't returning _path
  const poemData = [
    {
      path: '/poems/spherical-karens-in-a-vacuum',
      query: () => queryCollection('content').path('/poems/spherical-karens-in-a-vacuum').first()
    },
    {
      path: '/poems/a-new-republic',
      query: () => queryCollection('content').path('/poems/a-new-republic').first()
    },
    {
      path: '/poems/n-rijsers-wet',
      query: () => queryCollection('content').path('/poems/n-rijsers-wet').first()
    }
  ]
  
  const poemPromises = poemData.map(async ({ path, query }) => {
    const poem = await query()
    if (poem) {
      // Ensure the path is set correctly
      return { ...poem, _path: path }
    }
    return null
  })
  
  const resolvedPoems = await Promise.all(poemPromises)
  return resolvedPoems.filter(poem => poem !== null)
})

// SEO
useSeoMeta({
  title: 'Poetry by Luan - A Collection of Poems',
  description: 'Explore a curated collection of contemporary poems exploring themes of identity, emotion, and human connection.',
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <p class="hero-subtitle">
          A collection of thoughts, verses, and reflections
        </p>
      </div>
    </section>

    <!-- Poems List -->
    <section class="poem-list">
      <div class="container">
        
        <div class="poems-grid">
          <article 
            v-for="poem in poems" 
            :key="poem._path" 
            class="poem-card"
          >
            <h3 class="poem-card-title">
              <NuxtLink :to="poem._path" @click="console.log('Clicking:', poem._path)">
                {{ poem.title }}
              </NuxtLink>
              <!-- Debug info -->
              <small style="display: block; color: #999; font-size: 0.8em;">
                Path: {{ poem._path }} | Title: {{ poem.title }}
              </small>
            </h3>
            
            <p v-if="poem.description" class="poem-card-description">
              {{ poem.description }}
            </p>

          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  
  .hero-title {
    font-size: 4rem;
    font-weight: 300;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    
    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.poems-grid {
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

.no-poems {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-style: italic;
}
</style>
