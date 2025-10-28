<template>
  <div class="respond-page">
    <ResponseForm 
      :staff-id="staffId"
      :staff-name="staffName"
      :phone-number="phoneNumber"
    />
  </div>
</template>

<script setup>
import ResponseForm from '../components/ResponseForm.vue'
import { ref, onMounted } from 'vue'

// Extract staff information from URL parameters
const staffId = ref('')
const staffName = ref('Staff Member')
const phoneNumber = ref('')

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  staffId.value = urlParams.get('id') || 'default-id'
  staffName.value = urlParams.get('name') || 'Staff Member'
  phoneNumber.value = urlParams.get('phone') || ''
})
</script>

<style scoped>
.respond-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
