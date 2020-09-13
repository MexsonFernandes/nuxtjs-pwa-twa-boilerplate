<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Nuxt PWA + TWA</h1>
      <h2 v-if="update_time" class="title is-2">
        Last Update: {{ update_time }}
      </h2>
      <h2 v-if="version" class="title is-4">{{ version }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    update_time: null,
    version: null,
  }),
  created: function () {},
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
