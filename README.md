# 🏥 MedReach — Healthcare Mobile Application

> Bridging the gap between patients and healthcare providers through technology.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 📌 Overview

**MedReach** is a cross-platform mobile application designed to modernise how patients access healthcare services. The app connects patients with doctors, provides instant emergency assistance, and maintains digital health records — all in one place.

Built with **React Native + Expo Go** for the mobile client and a **Node.js/Express** backend, MedReach delivers a seamless, real-world healthcare experience on both iOS and Android.

---

## ✨ Features

### 👤 Patient Side
- **Doctor Discovery** — Browse and filter doctors by specialty, location, and availability
- **Doctor Profiles & Reviews** — View detailed profiles and submit verified reviews for medical professionals
- **Appointment Booking** — Book, manage, and track consultations
- **Digital Medical Records** — Securely store and access personal health history at any time
- **Health Guides** — Access curated, categorised health information and guides

### 🚑 Emergency
- **Real-Time Ambulance Hailing** — Request emergency services instantly with live tracking
- **Offline Emergency Guide** — Critical first-aid and emergency information available without internet

### 🔐 Security
- **Secure User Authentication** — JWT-based auth with encrypted user sessions
- **Private Medical Data** — User records are protected with access-controlled endpoints

---

## 🏗️ Architecture

```
MedReach/
├── medreach mobile/        # React Native + Expo Go (Mobile Client)
│   ├── screens/            # App screens (Home, Doctors, Profile, Emergency...)
│   ├── components/         # Reusable UI components
│   ├── navigation/         # Stack & tab navigation
│   ├── services/           # API service layer
│   └── assets/             # Images, icons, fonts
│
├── web/                    # Web admin/dashboard (React)
│
└── index.js                # Backend entry point (Node.js/Express)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile Client | React Native, Expo Go |
| Language | TypeScript, JavaScript (ES6+) |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Auth | JWT (JSON Web Tokens) |
| State Management | React Hooks / Context API |
| Navigation | React Navigation |
| Version Control | Git, GitHub |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- MongoDB instance (local or Atlas)
- iOS Simulator / Android Emulator or Expo Go app on your phone

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ThuhinaNimnadira/medreach.git
cd medreach

# 2. Install backend dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your MongoDB URI, JWT secret, etc.

# 4. Start the backend server
node index.js

# 5. Install mobile app dependencies
cd "medreach  mobile"
npm install

# 6. Start the Expo development server
npx expo start
```

---

## 📱 Screenshots

> _Coming soon — demo screenshots and walkthrough video_

<!-- Add screenshots here once available:
![Home Screen](./assets/screenshots/home.png)
![Doctor Profile](./assets/screenshots/doctor-profile.png)
![Emergency Feature](./assets/screenshots/emergency.png)
-->

---

## 🔑 Key Technical Highlights

- **Cross-platform**: Single codebase runs on both iOS and Android via Expo Go
- **RESTful API**: Clean, versioned API endpoints connecting mobile client to backend
- **Secure by design**: JWT authentication with protected routes on all sensitive endpoints
- **Offline capability**: Emergency guide works without internet connectivity
- **Component-driven UI**: Modular, reusable components for consistent UX across screens
- **TypeScript**: Type-safe codebase reducing runtime errors and improving maintainability

---

## 🌱 Roadmap

- [ ] Push notifications for appointment reminders
- [ ] Telemedicine / video consultation integration
- [ ] AI-powered symptom checker
- [ ] Multi-language support (Sinhala / Tamil)
- [ ] Pharmacy locator and prescription management

---

## 👨‍💻 Author

**Thuhina Nimnadira**  
ICT Undergraduate — General Sir John Kotelawala Defence University  
📧 nimnadirathuhina@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/thuhina-nimnadira) · [GitHub](https://github.com/ThuhinaNimnadira)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
