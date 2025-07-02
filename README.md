# 🩺 MedVax Frontend

Frontend for **MedVax**, a telemedicine platform supporting virtual healthcare services in Nigeria. Built with **Vue 3**, **Vite**, **Tailwind CSS v4**, **Pinia**, and **Vue Router**, and integrates with a powerful backend API for medical services, user management, and payments.

---

## 🚀 Features

- Secure login and registration with JWT
- Browse and manage medication catalog
- Schedule appointments with doctors via Cal.com
- Integrated payment flow with Flutterwave or Paystack
- AI-powered chatbot with Dialogflow
- Multilingual support (i18n)
- Blog with commenting system
- Feedback, CRM, and notifications
- Responsive design and accessible UI

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Vue 3 | JavaScript Framework |
| Vite | Lightning-fast build tool |
| Pinia | State management |
| Vue Router | SPA routing |
| Tailwind CSS v4 | Utility-first styling |
| Axios | API communication |
| Dialogflow | Chatbot |
| i18n | Localization |

---

## 🧩 Folder Structure

```text

src/
├── assets/css/tailwind.css
├── components/
│   ├── AppHeader.vue
│   └── AppFooter.vue
├── views/
│   ├── Home.vue
│   ├── Blog.vue
│   └── Dashboard.vue
├── router/
│   └── index.js
├── store/
├── App.vue
└── main.js

```text

---

## 🔐 Backend Integration Examples

All API requests are made using `axios`. Base URL is stored in `.env`:

### 📄 `.env`
```

VITE\_API\_URL=[https://api.medvax.com/api](https://api.medvax.com/api)

````text

---

### ✅ Login Example (`store/auth.js`)
```js
import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  actions: {
    async login(credentials) {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
      this.token = res.data.token
      this.user = res.data.user
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    }
  }
})
````

---

### 💊 Fetch Medications (`views/Medication.vue`)

```js
const fetchMedications = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/medications`)
  medications.value = res.data
}
```

---

### 📅 Book Appointment

```js
const bookAppointment = async (payload) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/appointments`, payload)
}
```

---

### 💳 Make Payment

```js
const initiatePayment = async () => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/payments/create-link`, {
    amount: 5000,
    purpose: 'consultation'
  })
  window.location.href = response.data.paymentLink
}
```

---

### 🧠 Send Chatbot Query

```js
const askBot = async (query) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/chatbot/chat`, { message: query })
  botResponse.value = res.data.reply
}
```

---

### 📝 Submit Feedback

```js
const sendFeedback = async (feedback) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/feedback`, feedback)
}
```

---

## 📦 Installation

```bash
git clone https://github.com/Jaytru1997/medvax-frontend.git
cd medvax-frontend
npm install
```

---

## ▶️ Development

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## 🔧 Production Build

```bash
npm run build
```

---

## 📝 License

Licensed under the [MIT License](LICENSE).

---

## 📞 Contact

Developed by **[Lesous Technology LTD](https://lesous.ng)**
📧 Email: `contact@lesous.ng`
