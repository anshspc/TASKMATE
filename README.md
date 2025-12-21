# TaskMate 📝

[![Expo](https://img.shields.io/badge/Expo-00021A?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

TaskMate is a premium, lightweight task manager application built with **React Native** and **Expo**. It is designed to keep your daily schedule organized, clean, and completely localized with offline data persistence.

> [!TIP]
> ### 🌐 Live Web Demo
> Try the application live in your browser:
> **[https://large-files-tan.loca.lt](https://large-files-tan.loca.lt)**

---

## 🌟 Key Features

*   **⏱️ Target Task Timing**: Assign estimated completion limits (e.g., 30m, 1h, 3h, Today) to manage your productivity.
*   **🕒 Creation Timestamps**: Automatic timestamp logging so you know exactly when each task was created.
*   **📅 Live Header Clock**: A real-time header widget displaying today's date and ticking digital clock.
*   **⚡ Priority Toggles**: Quickly set and filter tasks by priority levels: **Low (Blue)**, **Medium (Orange)**, or **High (Red)**.
*   **💾 Local Persistence**: Automatically saves your tasks to your phone/browser using `@react-native-async-storage/async-storage`.
*   **🧹 Smart Swipe/Tap Gestures**: Tap on a task to mark it done (strike-through), and long-press to permanently delete.

---

## 🛠️ Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/) (via [Expo SDK 54](https://expo.dev/))
*   **Language**: JavaScript / ES6+
*   **Platforms**: iOS, Android, and Web
*   **Data Storage**: React Native AsyncStorage

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anshspc/TASKMATE.git
   cd TASKMATE
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   * For **Mobile App (Expo Go)**:
     ```bash
     npm start
     ```
     Scan the QR code printed in the terminal using the **Expo Go** app (iOS/Android).

   * For **Web Version**:
     ```bash
     npm run web
     ```

---

## 📦 Project Structure

```text
├── App.js                 # Main application state and header clock layout
├── components/
│   └── TaskItem.js        # Individual task card component with metadata & badges
├── styles/
│   └── globalStyles.js    # Colors and shared UI styling tokens
└── utils/
    └── storage.js         # AsyncStorage utilities
```

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
