<template>
  <div class="app-layout">
    <header class="site-header">
      <nav class="container">
        <NuxtLink to="/" class="logo">
          <h1>Poetry and Lyrics</h1>
        </NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <button @click="toggleStrudel" class="nav-link strudel-toggle">
            {{ strudelVisible ? 'Hide Music' : 'Show Music' }}
          </button>
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

    <!-- Persistent Strudel Overlay -->
    <div v-if="strudelVisible" class="strudel-dropdown">
      <div class="strudel-header">
        <span class="strudel-title">Music</span>
        <button @click="toggleStrudel" class="strudel-close">×</button>
      </div>
      <iframe 
        src="https://strudel.cc/#Ly8gImNvYXN0bGluZSIgQGJ5IGVkZHlmbHV4Ci8vIEB2ZXJzaW9uIDEuMApzYW1wbGVzKCdnaXRodWI6ZWRkeWZsdXgvY3JhdGUnKQpzZXRjcHMoLjc1KQpsZXQgY2hvcmRzID0gY2hvcmQoIjxCYm05IEZtNyBDbTk%2BLzQiKS5kaWN0KCdpcmVhbCcpCnN0YWNrKAogIHN0YWNrKCAvLyBEUlVNUwogICAgcygiYmQiKS5zdHJ1Y3QoIjxbeCo8MSAyPiBbfkAzIHhdXSB4PiIpLAogICAgcygifiBbcmltLCBzZDo8MiAzPl0iKS5yb29tKCI8MCAuMj4iKSwKICAgIG4oIlswIDwxIDM%2BXSo8MiEzIDQ%2BIikucygiaGgiKSwKICAgIHMoInJkOjwxITMgMj4qMiIpLm1hc2soIjwwIDAgMSAxPi8xNiIpLmdhaW4oLjUpCiAgKS5iYW5rKCdjcmF0ZScpCiAgLm1hc2soIjxbMCAxXSAxIDEgMT4vMTYiLmVhcmx5KC41KSkKICAsIC8vIENIT1JEUwogIGNob3Jkcy5vZmZzZXQoLTEpLnZvaWNpbmcoKS5zKCJnbV9lcGlhbm8xOjEiKQogIC5waGFzZXIoNCkucm9vbSguNSkKICAsIC8vIE1FTE9EWQogIG4oIjwwITMgMSoyPiIpLnNldChjaG9yZHMpLm1vZGUoInJvb3Q6ZzIiKQogIC52b2ljaW5nKCkucygiZ21fYWNvdXN0aWNfYmFzcyIpLAogIGNob3Jkcy5uKCJbMCA8NCAzIDwyIDU%2BPioyXSg8MyA1Piw4KSIpCiAgLmFuY2hvcigiRDUiKS52b2ljaW5nKCkKICAuc2VnbWVudCg0KS5jbGlwKHJhbmQucmFuZ2UoLjQsLjgpKQogIC5yb29tKC43NSkuc2hhcGUoLjMpLmRlbGF5KC4yNSkKICAuZm0oc2luZS5yYW5nZSgzLDgpLnNsb3coOCkpCiAgLmxwZihzaW5lLnJhbmdlKDUwMCwxMDAwKS5zbG93KDgpKS5scHEoNSkKICAucmFyZWx5KHBseSgiMiIpKS5jaHVuayg0LCBmYXN0KDIpKQogIC5nYWluKHBlcmxpbi5yYW5nZSguNiwgLjkpKQogIC5tYXNrKCI8MCAxIDEgMD4vMTYiKQopCi5sYXRlKCJbMCAuMDFdKjQiKS5sYXRlKCJbMCAuMDFdKjIiKS5zaXplKDQp"
        width="100%"
        height="300"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
const strudelVisible = ref(false)

const toggleStrudel = () => {
  strudelVisible.value = !strudelVisible.value
}
</script>

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

// Strudel dropdown styles
.strudel-dropdown {
  position: fixed;
  top: 70px; // Just below the header
  right: $spacing-lg;
  width: 400px;
  background: $white;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  @media (max-width: $breakpoint-md) {
    width: calc(100vw - #{$spacing-lg * 2});
    right: $spacing-lg;
    left: $spacing-lg;
  }
  
  iframe {
    width: 100%;
    height: 300px;
    border: none;
    display: block;
  }
}

.strudel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm $spacing-md;
  background: lighten($border-color, 2%);
  border-bottom: 1px solid $border-color;
}

.strudel-title {
  font-weight: 600;
  color: $text-color;
  font-size: 0.9rem;
}

.strudel-close {
  background: none;
  border: none;
  color: $text-light;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: $text-color;
  }
}

.strudel-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: $secondary-color;
  }
}
</style>
