<script setup>
import ResponseForm from './components/ResponseForm.vue'
import { ref, onMounted } from 'vue'

// Extract shortcode from URL path and response from query params
const shortcode = ref('')
const responseParam = ref('')

onMounted(() => {
  // Get shortcode from URL path (e.g., /abc123)
  const pathParts = window.location.pathname.split('/').filter(part => part)
  shortcode.value = pathParts[0] || ''
  
  // Get response parameter from query string (e.g., ?y, ?l, ?n)
  const urlParams = new URLSearchParams(window.location.search)
  responseParam.value = urlParams.get('response') || ''
})
</script>

<template>
  <div id="app">
    <ResponseForm 
      :shortcode="shortcode"
      :response-param="responseParam"
    />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
