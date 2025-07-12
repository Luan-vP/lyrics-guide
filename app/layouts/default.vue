<template>
  <div class="app-layout">
    <header class="site-header">
      <nav class="container">
        <NuxtLink to="/" class="logo">
          <h1>Poetry and Lyrics</h1>
        </NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        </div>
      </nav>
    </header>
    
    <main class="main-content">
      <slot />
    </main>
    
    <footer class="site-footer">
      <div class="container">
        <p>by Luan van Pletsen</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
// Import our SCSS files
@import '~/assets/scss/main.scss';
@import '~/assets/scss/poems.scss';

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  background: $white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-md 0;
    
    .logo {
      text-decoration: none;
      
      h1 {
        margin: 0;
        font-size: 1.8rem;
        background: linear-gradient(135deg, $primary-color, $secondary-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
    
    .nav-links {
      display: flex;
      gap: $spacing-lg;
      
      .nav-link {
        color: $text-color;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
        
        &:hover {
          color: $secondary-color;
        }
        
        &.router-link-active {
          color: $secondary-color;
          font-weight: 600;
        }
      }
    }
  }
}

.main-content {
  flex: 1;
}

.site-footer {
  background: $primary-color;
  color: $white;
  padding: $spacing-xl 0;
  margin-top: $spacing-3xl;
  
  p {
    margin: 0;
    text-align: center;
    opacity: 0.8;
  }
}
</style>
