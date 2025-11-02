# Smart Farm Planner Pro

![Smart Farm Planner Pro Banner](https://img.freepik.com/free-photo/glowing-lines-human-heart-3d-shape-dark-background-generative-ai_191095-143.jpg?w=1380)

**An AI-powered application for comprehensive soil analysis, intelligent crop recommendations, data-driven insights, and expert chatbot assistance for modern farming.**

Smart Farm Planner Pro is a cutting-edge web application designed to empower farmers with the data and AI-driven tools they need to make informed decisions. By leveraging geolocation, a vast agricultural database, and the power of Google's Gemini API, this tool provides personalized recommendations to maximize yield and profitability.

---

## ✨ Features

-   **📍 Geolocation-Powered Forms:** Automatically fetch farm location details to simplify data entry.
-   **📝 Dynamic & Interactive Form:** An intuitive interface to input farm details, including land area, current crops, water sources, and budget.
-   **🧪 Advanced Soil Analysis:** Generates a detailed (simulated) soil report, including pH, Nitrogen, Phosphorus, Potassium, and Organic Carbon levels.
-   **🗺️ Interactive Map View:** Visualizes the precise farm location using Leaflet.js.
-   **🌱 AI-Powered Crop Recommendations:** Provides a tailored list of recommended crops based on the user's location, soil data, and local climate patterns from our extensive database.
-   **📊 Data-Driven Insights:** Beautiful and responsive charts from Recharts to visualize key agricultural data like top-yielding crops and category distributions.
-   **🤖 AgriBot Assistant:** An integrated chatbot powered by the Gemini API, offering expert advice on a wide range of farming topics.
-   **📄 PDF Report Export:** Users can download a comprehensive PDF summary of their farm details, soil analysis, and crop recommendations using jsPDF.
-   **🌗 Dark Mode:** A sleek, eye-friendly dark theme for comfortable use in low-light conditions.
-   **📱 Fully Responsive:** A mobile-first design that works flawlessly on desktops, tablets, and smartphones.

---

## 🛠️ Tech Stack

-   **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **AI & Chatbot:** [Google Gemini API (`@google/genai`)](https://ai.google.dev/)
-   **Mapping:** [Leaflet](https://leafletjs.com/)
-   **Data Visualization:** [Recharts](https://recharts.org/)
-   **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/smart-farm-planner-pro.git
    cd smart-farm-planner-pro
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Google Gemini API key.
    ```
    VITE_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```
    *You can get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).

---

## 📂 Project Structure

```
smart-farm-planner-pro/
├── public/
│   └── crop_data.json      # Static database of crop information
├── src/
│   ├── components/         # Reusable React components
│   │   ├── AnalysisReport.tsx
│   │   ├── Chatbot.tsx
│   │   ├── CropRecommendations.tsx
│   │   ├── FarmDetailsForm.tsx
│   │   ├── Header.tsx
│   │   ├── Insights.tsx
│   │   └── Welcome.tsx
│   ├── services/
│   │   └── geminiService.ts  # Service for interacting with the Gemini API
│   ├── App.tsx             # Main application component and state management
│   ├── index.css           # Global styles and Tailwind CSS directives
│   ├── index.tsx           # Entry point of the React application
│   └── types.ts            # TypeScript type definitions
├── .env                    # Environment variables (API Key)
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
└── README.md               # You are here!
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
