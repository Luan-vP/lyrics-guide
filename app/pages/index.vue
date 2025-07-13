<script setup lang="ts">
// Get the index page content
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('content').path('/').first()
})

// Get all poems dynamically
const { data: poems } = await useAsyncData('poems', async () => {
  try {
    // Get poem slugs from our API
    const poemSlugs = await $fetch('/api/poems-list') as Array<{slug: string, _path: string}>
    console.log('Found poem slugs:', poemSlugs)
    
    // Query each poem's content
    const poemPromises = poemSlugs.map(async ({ slug, _path }: {slug: string, _path: string}) => {
      try {
        const poem = await queryCollection('content').path(_path).first()
        if (poem) {
          return { ...poem, _path }
        }
        return null
      } catch (error) {
        console.error(`Error loading poem ${slug}:`, error)
        return null
      }
    })
    
    const resolvedPoems = await Promise.all(poemPromises)
    return resolvedPoems.filter((poem: any) => poem !== null)
  } catch (error) {
    console.error('Auto-discovery failed, falling back to manual list:', error)
    
    // Fallback to manual approach
    const poemSlugs = ['spherical-karens-in-a-vacuum', 'a-new-republic', 'n-rijsers-wet']
    
    const poemPromises = poemSlugs.map(async (slug: string) => {
      try {
        const poem = await queryCollection('content').path(`/poems/${slug}`).first()
        if (poem) {
          return { ...poem, _path: `/poems/${slug}` }
        }
        return null
      } catch (error) {
        console.error(`Error loading poem ${slug}:`, error)
        return null
      }
    })
    
    const resolvedPoems = await Promise.all(poemPromises)
    return resolvedPoems.filter((poem: any) => poem !== null)
  }
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
