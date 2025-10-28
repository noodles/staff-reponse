<template>
  <div class="response-form">
    <div class="header">
      <div class="branding">
        <span class="noodle-emoji">🍜</span>
        <h1>Noodle Palace</h1>
      </div>
      <p class="subtitle">Please let us know your availability for today</p>
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
      <p>This response link is invalid or has expired.</p>
    </div>

    <div v-else class="form-container">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'

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
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://registered-enjoy-suffered-vic.trycloudflare.com'

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

// Load staff info on mount
onMounted(async () => {
  if (!props.shortcode) return
  
  console.log('Loading staff info for shortcode:', props.shortcode)
  console.log('API base URL:', baseUrl)
  
  try {
    const apiUrl = `${baseUrl}/api/response/${props.shortcode}`
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
})
</script>

<style scoped>
.response-form {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.branding {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.noodle-emoji {
  font-size: 2rem;
  animation: wiggle 2s ease-in-out infinite;
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.subtitle {
  color: #7f8c8d;
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
}

.staff-info {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ecf0f1;
}

.staff-info h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.phone {
  color: #7f8c8d;
  font-size: 1rem;
}

.response-options h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 25px;
  text-align: center;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.option-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.option-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.option-btn.on-time {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.option-btn.late {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
}

.option-btn.not-coming {
  background: linear-gradient(135deg, #F44336, #D32F2F);
  color: white;
}

.icon {
  font-size: 1.5rem;
}

.text {
  flex: 1;
}

.loading, .success, .error {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ecf0f1;
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
  font-size: 2rem;
  margin-bottom: 15px;
}

.error h2 {
  color: #e74c3c;
  font-size: 2rem;
  margin-bottom: 15px;
}

.response-summary {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 1.1rem;
  color: #2c3e50;
}

.retry-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s ease;
}

.retry-btn:hover {
  background: #2980b9;
}

@media (max-width: 480px) {
  .form-container, .loading, .success, .error {
    padding: 30px 20px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .option-btn {
    padding: 15px;
    font-size: 1rem;
  }
}
</style>