# 🃏 Memory Card Game

This project is the **Memory Card Game** from **The Odin Project's** React course, designed to test understanding of React fundamentals, particularly state management with hooks and data fetching from external APIs.

## 🔗 Live Demo
https://pokememoryex.vercel.app/

## 📝 Project Description

The Memory Card Game is a simple yet challenging game that tests the user's memory. The goal is to click on every card **exactly once** without clicking the same card twice.

Each time a card is successfully clicked, the score increases, and the cards are randomly shuffled. If the user clicks a card that has already been selected, the current score resets, but the "Best Score" remains to track the highest score achieved in any single round.

## ✨ Features

* **State Management with Hooks:** Utilizes `useState` and `useEffect` for managing game state (current score, best score, and the array of cards).
* **External API Integration:** Fetches card data from [TCGdex](https://tcgdex.dev/), a third-party API .
* **Dynamic Shuffling:** Cards are randomly shuffled and displayed whenever a user clicks a card, and upon initial component mount.
* **Score Tracking with LocalStorage:**
    * **Current Score:** Tracks the score for the current round.
    * **Best Score:** Persists and displays the highest score ever achieved.
* **Responsive Design:** Styled to be visually appealing and playable on different screen sizes.
* **3D card effect:** Beautiful card effect on hover using [react-parallax-tilt](https://www.npmjs.com/package/react-parallax-tilt).

## Screenshots

<img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/c449ea22-69a0-401f-abde-46b63bca9404" />


<img width="1919" height="969" alt="Screenshot_3" src="https://github.com/user-attachments/assets/3df071c5-f740-4165-a183-5839ca177d31" />


## 🛠️ Tech Stack

* **React** 
* **JavaScript (ES6+)**
* **HTML5**
* **CSS3**

---

## 🕹️ How to Play

1.  Start the game by clicking any card.
2.  Your **Current Score** will increase by 1.
3.  The cards will immediately shuffle into a new random order.
4.  Continue clicking cards you haven't clicked before.
5.  If you click the same card twice, the game ends, and your **Current Score** is reset to 0.
6.  The **Best Score** will update to your new high score if you surpassed the previous one.
7.  Try to click all available cards to get the maximum possible score!

---

## 🚀 Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:JohnKelly-T/memory-card.git
    cd memory-card-game
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm run dev
    ```
