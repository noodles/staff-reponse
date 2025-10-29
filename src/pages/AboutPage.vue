<template>
  <div class="about-page">
    <div class="about-container">
      <div class="header">
        <div class="branding">
          <span class="noodle-emoji">🍜</span>
          <h1>Noodle Palace</h1>
        </div>
        <p class="subtitle">Staff Response System</p>
      </div>

      <div class="content">
        <div class="section">
          <h2>How It Works</h2>
          <p class="description">
            Our staff response system combines a Shopify POS UI Extension with a web app to streamline staff availability management.
          </p>
        </div>

        <div class="workflow">
          <div class="step">
            <div class="step-icon">🏪</div>
            <div class="step-content">
              <h3>1. POS Extension</h3>
              <p>Managers use the Shopify POS UI Extension to send SMS messages to staff members asking about their availability.</p>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="step">
            <div class="step-icon">📱</div>
            <div class="step-content">
              <h3>2. SMS Message</h3>
              <p>Staff receive SMS messages with quick response links (Yes, Late, or No) for easy one-tap responses.</p>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="step">
            <div class="step-icon">🌐</div>
            <div class="step-content">
              <h3>3. Web App</h3>
              <p>Staff click the links to open this web app where they can confirm their response and see their status.</p>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="step">
            <div class="step-icon">📊</div>
            <div class="step-content">
              <h3>4. Management Dashboard</h3>
              <p>Managers can view all staff responses in real-time through the POS extension dashboard.</p>
            </div>
          </div>
        </div>

        <div class="features">
          <h2>Key Features</h2>
          <div class="feature-grid">
            <div class="feature">
              <div class="feature-icon">⚡</div>
              <h4>Quick Responses</h4>
              <p>One-tap SMS responses for instant availability updates</p>
            </div>
            <div class="feature">
              <div class="feature-icon">📱</div>
              <h4>Mobile Friendly</h4>
              <p>Works seamlessly on all mobile devices</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🔄</div>
              <h4>Real-time Updates</h4>
              <p>Instant status updates across all systems</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🛡️</div>
              <h4>Secure</h4>
              <p>Protected with authentication and secure links</p>
            </div>
          </div>
        </div>

        <div class="back-link">
          <router-link to="/" class="back-btn">← Back to Response Form</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// AboutPage component - no additional logic needed
</script>

<style scoped>
.about-page {
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

.about-container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
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

.content {
  color: #2c3e50;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.workflow {
  margin: 40px 0;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
}

.step-icon {
  font-size: 2rem;
  min-width: 60px;
  text-align: center;
}

.step-content h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.step-content p {
  margin: 0;
  line-height: 1.5;
  color: #555;
}

.arrow {
  text-align: center;
  font-size: 2rem;
  color: #1C735E;
  margin: 10px 0;
  font-weight: bold;
}

.features {
  margin: 40px 0;
}

.features h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 1.8rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.feature {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.feature h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.feature p {
  margin: 0;
  color: #555;
  line-height: 1.4;
}

.back-link {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.back-btn {
  color: #1C735E;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.back-btn:hover {
  color: #155a4a;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .about-page {
    padding: 20px;
  }
  
  .about-container {
    padding: 30px 20px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .noodle-emoji {
    font-size: 2.2rem;
  }
  
  .step {
    flex-direction: column;
    text-align: center;
  }
  
  .step-icon {
    min-width: auto;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-page {
    padding: 40px 40px;
  }
  
  .about-container {
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
  
  .step {
    padding: 15px;
  }
  
  .step-icon {
    font-size: 1.5rem;
  }
}
</style>
