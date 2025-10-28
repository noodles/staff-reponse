<script setup>
import ResponseForm from './components/ResponseForm.vue'
import { ref, onMounted } from 'vue'

// Extract shortcode from URL path and response from query params
const shortcode = ref('')
const responseParam = ref('')

onMounted(() => {
  console.log('App.vue mounted')
  console.log('Current URL:', window.location.href)
  console.log('Pathname:', window.location.pathname)
  
  // Get shortcode from URL path (e.g., /abc123)
  const pathParts = window.location.pathname.split('/').filter(part => part)
  console.log('Path parts:', pathParts)
  
  shortcode.value = pathParts[0] || ''
  console.log('Extracted shortcode:', shortcode.value)
  
  // For testing purposes, if no shortcode, use a test one
  if (!shortcode.value) {
    shortcode.value = 'test123'
    console.log('Using fallback shortcode:', shortcode.value)
  }
  
  // Get response parameter from query string (e.g., ?y, ?l, ?n)
  const urlParams = new URLSearchParams(window.location.search)
  responseParam.value = urlParams.get('response') || ''
  
  console.log('Final shortcode:', shortcode.value)
  console.log('Response param:', responseParam.value)
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

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
