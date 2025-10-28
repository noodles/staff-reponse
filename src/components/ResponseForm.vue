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

    <div v-else class="form-container">
      <div class="staff-info">
        <h2>{{ staffName }}</h2>
        <p class="phone">{{ phoneNumber }}</p>
      </div>

      <div class="response-options">
        <h3>Are you coming to work today?</h3>
        
        <div class="options">
          <button 
            @click="submitResponse('on_time')"
            class="option-btn on-time"
            :disabled="loading"
          >
            <span class="icon">✅</span>
            <span class="text">Yes, I'll be there on time</span>
          </button>

          <button 
            @click="submitResponse('late')"
            class="option-btn late"
            :disabled="loading"
          >
            <span class="icon">⚠️</span>
            <span class="text">Yes but I am running late</span>
          </button>

          <button 
            @click="submitResponse('not_coming')"
            class="option-btn not-coming"
            :disabled="loading"
          >
            <span class="icon">❌</span>
            <span class="text">Sorry, can't make it</span>
          </button>
        </div>
      </div>

      <div v-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="retry" class="retry-btn">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
  staffId: {
    type: String,
    required: true
  },
  staffName: {
    type: String,
    default: 'Staff Member'
  },
  phoneNumber: {
    type: String,
    default: ''
  }
})

// Reactive data
const loading = ref(false)
const submitted = ref(false)
const error = ref('')
const responseStatus = ref('')

// API base URL - should match your backend
const baseUrl = 'https://navigation-puerto-respectively-loading.trycloudflare.com'

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

const submitResponse = async (status) => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(`${baseUrl}/api/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        staffId: props.staffId,
        status: status,
        message: getStatusText(status),
        phone: props.phoneNumber
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to submit response: ${response.statusText}`)
    }

    const result = await response.json()
    responseStatus.value = status
    submitted.value = true
    
  } catch (err) {
    console.error('Error submitting response:', err)
    error.value = err.message || 'Failed to submit response. Please try again.'
  } finally {
    loading.value = false
  }
}

const retry = () => {
  error.value = ''
}

// Extract staff info from URL parameters on mount
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const name = urlParams.get('name')
  const phone = urlParams.get('phone')
  
  if (name) {
    props.staffName = name
  }
  if (phone) {
    props.phoneNumber = phone
  }
})
</script>

<style scoped>
.response-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #fff;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.branding {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
}

.noodle-emoji {
  font-size: 3rem;
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
  font-size: 2.5rem;
  font-weight: 700;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 60px 20px;
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

.success {
  text-align: center;
  padding: 60px 20px;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.success h2 {
  color: #27ae60;
  margin-bottom: 15px;
}

.response-summary {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  color: #2c3e50;
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

.error {
  background: #fdf2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
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

/* Mobile responsiveness */
@media (max-width: 480px) {
  .response-form {
    padding: 15px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .noodle-emoji {
    font-size: 2.5rem;
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
