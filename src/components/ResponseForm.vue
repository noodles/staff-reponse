<template>
  <div class="response-form">
    <div class="form-container">
      <div class="header">
        <div class="branding">
          <span class="noodle-emoji">🍜</span>
          <h1>Noodle Palace</h1>
        </div>
        <p class="subtitle">Staff availability for today</p>
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Submitting your response...</p>
      </div>

      <div v-else-if="submitted" class="success">
        <div class="success-icon">✅</div>
        <h2>Thank you!</h2>
        <p>Your response has been recorded successfully.</p>
        <p class="response-summary">
          <strong>{{ staffName }}</strong> - {{ getStatusText(responseStatus) }}
        </p>
      </div>

      <div v-else-if="error" class="error">
        <div class="error-icon">❌</div>
        <h2>Error</h2>
        <p>{{ error }}</p>
        <button @click="retry" class="retry-btn">Try Again</button>
      </div>

      <div v-else-if="!shortcode" class="error">
        <div class="error-icon">❌</div>
        <h2>Invalid Link</h2>
        <p class="error-text">This response link is invalid or has expired.</p>
      </div>

      <div v-else class="form-content">
        <div class="staff-info">
          <h2>{{ staffName }}</h2>
          <p class="phone">{{ phoneNumber }}</p>
        </div>

        <div class="response-options">
          <h3>Are you coming to work today?</h3>
          
          <div class="options">
            <button 
              @click="submitResponse('y')"
              class="option-btn on-time"
              :disabled="loading"
            >
              <span class="icon">✅</span>
              <span class="text">Yes, I'll be there on time</span>
            </button>

            <button 
              @click="submitResponse('l')"
              class="option-btn late"
              :disabled="loading"
            >
              <span class="icon">⚠️</span>
              <span class="text">Yes but I am running late</span>
            </button>

            <button 
              @click="submitResponse('n')"
              class="option-btn not-coming"
              :disabled="loading"
            >
              <span class="icon">❌</span>
              <span class="text">Sorry, can't make it</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

console.log('ResponseForm component loaded')

// Props
const props = defineProps({
  shortcode: {
    type: String,
    required: true
  },
  responseParam: {
    type: String,
    default: ''
  }
})

// Reactive data
const loading = ref(false)
const submitted = ref(false)
const error = ref('')
const responseStatus = ref('')
const staffName = ref('Staff Member')
const phoneNumber = ref('')

// API base URL - loaded from environment variable
const baseUrl = import.meta.env.VITE_API_BASE_URL

// Methods
const getStatusText = (status) => {
  switch (status) {
    case 'on_time':
      return 'On Time'
    case 'late':
      return 'Running Late'
    case 'not_coming':
      return 'Not Coming'
    default:
      return 'Unknown'
  }
}

const submitResponse = async (responseParam) => {
  loading.value = true
  error.value = ''
  
  try {
    const url = `${baseUrl}/api/response/${props.shortcode}?response=${responseParam}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Secret': 'noodle123' // Secret sent in HTTP header instead of URL
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Failed to submit response: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.success) {
      responseStatus.value = data.data.status
      submitted.value = true
    } else {
      throw new Error(data.error || 'Failed to submit response')
    }
  } catch (err) {
    console.error('Error submitting response:', err)
    error.value = err.message || 'Failed to submit response. Please try again.'
  } finally {
    loading.value = false
  }
}

const retry = () => {
  error.value = ''
  submitted.value = false
  responseStatus.value = ''
}

// Load staff info when shortcode becomes available
const loadStaffInfo = async (shortcode) => {
  if (!shortcode) {
    console.log('No shortcode yet, waiting...')
    return
  }
  
  console.log('Loading staff info for shortcode:', shortcode)
  console.log('API base URL:', baseUrl)
  
  try {
    const apiUrl = `${baseUrl}/api/response/${shortcode}`
    console.log('Making API call to:', apiUrl)
    
    const response = await fetch(apiUrl)
    console.log('API response status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('API response data:', data)
      
      if (data.success) {
        staffName.value = data.data.staffName
        phoneNumber.value = data.data.phone
        console.log('Updated staff name to:', staffName.value)
        
        // If there's a response param, auto-submit
        if (props.responseParam) {
          await submitResponse(props.responseParam)
        }
      } else {
        console.error('API returned success: false', data)
        error.value = data.error || 'Failed to load staff information'
      }
    } else {
      console.error('API call failed with status:', response.status)
      const errorText = await response.text()
      console.error('Error response:', errorText)
    }
  } catch (err) {
    console.error('Error loading staff info:', err)
    error.value = 'Failed to load staff information'
  }
}

// Watch for shortcode changes
watch(() => props.shortcode, (newShortcode) => {
  console.log('Shortcode changed to:', newShortcode)
  loadStaffInfo(newShortcode)
}, { immediate: true })
</script>

<style scoped>
.response-form {
  min-height: 100vh;
  width: 100%;
  background: #1C735E;
  background-image: 
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ctext x='100' y='100' font-size='30' text-anchor='middle' dominant-baseline='middle'%3E🐉%3C/text%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ctext x='100' y='100' font-size='30' text-anchor='middle' dominant-baseline='middle'%3E🏮%3C/text%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ctext x='100' y='100' font-size='30' text-anchor='middle' dominant-baseline='middle'%3E🥢%3C/text%3E%3C/svg%3E");
  background-size: 
    180px 180px,
    180px 180px,
    180px 180px;
  background-position: 
    0px 0px,
    120px 60px,
    240px 120px,
    360px 60px;
  background-repeat: repeat;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.branding {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: nowrap;
}

.noodle-emoji {
  font-size: 2.5rem;
  animation: wiggle 2s ease-in-out infinite;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.header h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  white-space: nowrap;
}

.subtitle {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 0;
}

.form-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

.staff-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
}

.staff-info h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.phone {
  color: #7f8c8d;
  margin: 0;
}

.response-options h3 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-btn {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.option-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.option-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.option-btn.on-time {
  border-color: #27ae60;
}

.option-btn.on-time:hover {
  background: #27ae60;
  color: white;
}

.option-btn.late {
  border-color: #f39c12;
}

.option-btn.late:hover {
  background: #f39c12;
  color: white;
}

.option-btn.not-coming {
  border-color: #e74c3c;
}

.option-btn.not-coming:hover {
  background: #e74c3c;
  color: white;
}

.icon {
  font-size: 1.5rem;
  margin-right: 15px;
}

.text {
  font-weight: 500;
}

.loading, .success, .error {
  text-align: center;
  padding: 20px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.success-icon, .error-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.success h2 {
  color: #27ae60;
  margin-bottom: 15px;
}

.error h2 {
  color: #e74c3c;
  margin-bottom: 15px;
}

.error-text {
  color: #2c3e50;
  margin: 0;
}

.response-summary {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  color: #2c3e50;
}

.retry-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.retry-btn:hover {
  background: #b91c1c;
}

@media (max-width: 768px) {
  .response-form {
    padding: 20px;
  }
  
  .form-container, .loading, .success, .error {
    padding: 30px 20px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .noodle-emoji {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .response-form {
    padding: 40px 40px;
  }
  
  .form-container, .loading, .success, .error {
    padding: 20px 15px;
  }
  
  .branding {
    gap: 10px;
  }
  
  .header h1 {
    font-size: 1.8rem;
    white-space: nowrap;
  }
  
  .noodle-emoji {
    font-size: 2rem;
  }
  
  .option-btn {
    padding: 15px;
    font-size: 1rem;
  }
  
  .icon {
    font-size: 1.2rem;
    margin-right: 10px;
  }
}
</style>