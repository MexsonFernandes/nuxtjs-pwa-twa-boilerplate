<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title is-1">{{ $store.state.app_name }}</h1>
      <h1 v-if="$store.state.update_time" class="title is-2">
        Last Update: {{ $store.state.update_time }}
      </h1>
      <h1 v-if="$store.state.app_version" class="title is-4">
        <span class="has-text-weight-medium">App Version:</span>
        {{ $store.state.app_version }}
      </h1>
      <h1 v-if="$store.state.update_available != null" class="title is-6">
        <span class="has-text-weight-medium">Update Available:</span>
        {{ $store.state.update_available ? 'Yes' : 'No' }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {}
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
