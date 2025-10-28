# Noodle Palace Staff Response Web App

A Vue.js web application that allows staff members to respond to SMS messages about their work availability for Noodle Palace.

## Features

- **Mobile-First Design**: Optimized for mobile devices (primary use case)
- **Three Response Options**:
  - ✅ Yes, I'll be there on time
  - ⚠️ Yes but I am running late  
  - ❌ Sorry, can't make it
- **Real-time Submission**: Submits responses to backend API
- **Success Feedback**: Confirms successful submission
- **Error Handling**: Graceful error handling with retry option
- **URL Parameters**: Accepts staff info via URL parameters

## Usage

### URL Format

The web app accepts staff information via URL parameters:

```
https://staff-response.netlify.app/?id=staff123&name=John%20Smith&phone=%2B61400123456
```

**Parameters:**
- `id`: Unique staff identifier
- `name`: Staff member's name
- `phone`: Staff member's phone number

### Example URLs

```bash
# John Smith responding
https://staff-response.netlify.app/?id=abc123&name=John%20Smith&phone=%2B61400123456

# Sarah Johnson responding  
https://staff-response.netlify.app/?id=def456&name=Sarah%20Johnson&phone=%2B61400123457

# Mike Davis responding
https://staff-response.netlify.app/?id=ghi789&name=Mike%20Davis&phone=%2B61400123458
```

## Development

### Prerequisites

- Node.js 20.19.0 or higher
- pnpm (preferred) or npm

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# API Configuration
VITE_API_BASE_URL=https://your-backend-url.trycloudflare.com
```

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be accessible in the frontend code.

You can copy `.env.example` to `.env` and update the values as needed.

### Setup

1. **Install dependencies**:
   ```bash
   cd staff-response
   pnpm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and update VITE_API_BASE_URL with your backend URL
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   ```

5. **Preview production build**:
   ```bash
   pnpm preview
   ```

### Testing Locally

1. **Start the dev server**:
   ```bash
   pnpm dev
   ```

2. **Test with URL parameters**:
   ```
   http://localhost:5173/?id=test123&name=Test%20User&phone=%2B61400123456
   ```

## API Integration

### Backend Endpoint

The web app submits responses to:
```
POST /api/responses
```

**Request Body:**
```json
{
  "staffId": "abc123",
  "status": "on_time",
  "message": "On Time", 
  "phone": "+61400123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Response recorded successfully"
}
```

### Configuration

Update the `baseUrl` in `ResponseForm.vue` to match your backend:

```javascript
const baseUrl = 'https://your-backend-url.com'
```

## Deployment

### Netlify (Recommended)

1. **Connect repository** to Netlify
2. **Build settings**:
   - Build command: `pnpm build`
   - Publish directory: `dist`
3. **Deploy**

### Manual Deployment

1. **Build the app**:
   ```bash
   pnpm build
   ```

2. **Upload `dist` folder** to your hosting provider

## Integration with SMS System

### SMS Message Format

When sending SMS messages, include the response URL:

```javascript
const message = `Are you coming to work today? Please respond: https://staff-response.netlify.app/?id=${staffId}&name=${encodeURIComponent(staffName)}&phone=${encodeURIComponent(phoneNumber)}`
```

### Backend SMS Route Example

```javascript
// In your backend SMS route
app.post('/api/sms', async (req, res) => {
  const { phoneNumber, message, staffId, staffName } = req.body
  
  // Generate unique response URL
  const responseUrl = `https://staff-response.netlify.app/?id=${staffId}&name=${encodeURIComponent(staffName)}&phone=${encodeURIComponent(phoneNumber)}`
  
  const fullMessage = `${message}\n\nRespond here: ${responseUrl}`
  
  // Send SMS with Twilio
  await twilio.messages.create({
    body: fullMessage,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  })
  
  res.json({ success: true, responseUrl })
})
```

## Testing

### Manual Testing

1. **Start the app**: `pnpm dev`
2. **Open with parameters**: 
   ```
   http://localhost:5173/?id=test123&name=Test%20User&phone=%2B61400123456
   ```
3. **Test each response option**
4. **Verify API calls** in browser dev tools

### Automated Testing

```bash
# Run tests (if implemented)
pnpm test
```

## Troubleshooting

### Common Issues

1. **API calls failing**:
   - Check `baseUrl` in `ResponseForm.vue`
   - Verify backend is running and accessible
   - Check CORS settings

2. **URL parameters not working**:
   - Ensure proper URL encoding
   - Check parameter names match exactly

3. **Styling issues**:
   - Clear browser cache
   - Check CSS specificity
   - Verify responsive breakpoints

### Debug Mode

Enable debug logging by adding to `ResponseForm.vue`:

```javascript
const DEBUG = true

if (DEBUG) {
  console.log('Staff info:', { staffId, staffName, phoneNumber })
}
```

## File Structure

```
staff-reponse/
├── src/
│   ├── components/
│   │   └── ResponseForm.vue      # Main response form component
│   ├── pages/
│   │   └── Respond.vue           # Response page wrapper
│   ├── App.vue                   # Main app component
│   └── main.js                   # App entry point
├── public/
│   └── favicon.ico
├── package.json
├── vite.config.js
└── README.md
```

## Next Steps

1. **Add analytics** to track response rates
2. **Implement push notifications** for status updates
3. **Add staff management** interface
4. **Create admin dashboard** for viewing responses
5. **Add response history** and reporting features