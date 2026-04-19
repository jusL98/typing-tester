<a id="readme-top"></a>

# Typing Test

This app is a modern, minimalist web-based typing speed and accuracy tester. It provides a clean interface to measure your typing speed, accuracy, and character statistics with configurable test modes and dynamic feedback.

<p align="left">

</p>

## Description

Typing Test creates a user-friendly platform that individuals can use for:

- Speed Measurement: accurately tracking your Words Per Minute (WPM) and Raw WPM
- Accuracy Improvement: monitoring correct, incorrect, extra, and missed keystrokes
- Consistent Practice: using a built-in library of popular quotes and sentences for realistic typing practice

The web application allows users to customize their testing experience by choosing between a "Time" mode (ex. 15, 30, 60 seconds) or a "Words" mode (ex. 10, 25, 50 words). As the user types, the application provides real-time audio feedback for correct and incorrect keystrokes, tracks the live caret position, and handles backspacing flawlessly. Once the test concludes, a comprehensive results screen displays your WPM, accuracy percentage, and a detailed character breakdown using clean SVG icons. The responsive design features a highly polished UI that works across different screen sizes, complete with a seamless Dark/Light mode toggle.

## Built With

- [HTML 5](https://html.spec.whatwg.org/): Semantic structure for the web interface
- [CSS 3](https://www.w3.org/Style/CSS/): Styling, flexbox/grid layouts, smooth animations, and theming using CSS variables
- [JavaScript](https://www.javascript.com/): Client-side logic, event handling, real-time stat calculation, and Web Audio API integration

## Quick Start

### Prerequisites

- Web Browser
- Internet Connection
- Node.js/npm

### Installation

To install Typing Tester, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jusL98/typing-tester.git
   cd typing-tester
   ```

### Run

**Option 1: Direct File Access**

1. Simply double-click the `index.html` file to open it in your default web browser.

**Option 2: Local Server**

1. Open your terminal in the project directory.
2. Run a quick local server using npx:
   ```bash
   npx serve .
   ```
3. Access the web interface:
   - Open your web browser and navigate to: `http://localhost:3000`

## Usage

1. **Access the web interface** via your browser
2. **Toggle your theme** by clicking the sun/moon icon in the top left
3. **Select your mode** by choosing between "time" or "words"
4. **Select your limit** (15/30/60 seconds or 10/25/50 words)
5. **Start typing** to automatically begin the test (the timer starts on your first keystroke)
6. **Review your stats** once the test automatically concludes
7. **Restart** by clicking the restart button or pressing `Tab` + `Enter`

## Contributing

1. Fork & branch off main.
2. Make your changes.
3. PRs welcome!

## Project Structure

```
├── typing-test/
│   ├── index.html                     # the main structural HTML file
│   ├── style.css                      # contains all styling, animations, and theme variables
│   └── script.js                      # core application logic, event listeners, and math
```

## Acknowledgements

This project was created to learn and practice creating simple static websites and a highly polished, responsive user interface.

## License

This project is licensed under the [MIT](LICENSE.txt) License. See LICENSE.txt for more information.

<br>

---

Thank you!

<p align="left">
  <a href="mailto:justin.matthew.lee.18@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/justin-matthew-lee/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
    <a href="https://github.com/jusl98">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</p>

<p align="right">(<a href="#readme-top">BACK TO TOP</a>)</p>
