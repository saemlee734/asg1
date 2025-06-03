
# Assignment 1: Interactive WebGL Paint App 🎨

## Website
https://saemlee734.github.io/asg1/asg1.html

## Overview

This project is part of **CSE-160: Introduction to Computer Graphics**, and implements a simple paint program using **WebGL**. Users can interact with a canvas to draw shapes like **points**, **triangles**, and **circles** by clicking or dragging the mouse. Sliders and buttons are provided for choosing colors, shape types, size, and more.

A second feature of the assignment includes recreating a hand-drawn sketch using only colored triangles rendered via WebGL. See `asg1.html` for the complete experience.

## Features

✅ Click or drag to draw on the canvas  
✅ Choose between **Point**, **Triangle**, and **Circle** brushes  
✅ Control color using **RGB sliders**  
✅ Adjust shape size using a **size slider**  
✅ Adjust circle smoothness via **segment slider**  
✅ Clear the canvas  
✅ Draw a **custom image using triangles** (see below)  
✅ Modular and organized JavaScript (OOP and WebGL best practices)

---

## File Structure

```
ASG1_PROJECT/
├── lib/
│   ├── circle.js               # Circle shape class
│   ├── cuon-matrix-cse160.js   # Matrix math utilities
│   ├── cuon-utils.js           # WebGL initialization helpers
│   ├── point.js                # Point shape class
│   ├── triangle.js             # Triangle shape class
│   ├── webgl-debug.js          # WebGL debugging utilities
│   └── webgl-utils.js          # Additional WebGL helper utilities
│
├── misc/
│   ├── HelloPoint1.html/.js    # Intro to drawing points
│   └── HelloTriangle.html/.js  # Intro to drawing triangles
│
├── asg1.html                   # Main assignment webpage
├── asg1.js                     # Paint application logic
├── cse160_boat.jpg            # Scanned triangle sketch (used in bonus drawing)
```

---

## Usage Instructions

1. **Open `asg1.html` in a web browser.**
2. Use the UI elements to:
   - Select shape type (Point, Triangle, Circle)
   - Adjust brush size
   - Choose color (R, G, B sliders)
   - Select number of segments for circles
   - Clear canvas
   - Render a triangle-based illustration with a button
3. For bonus awesomeness, check the rendered image based on the provided sketch.

---

## Custom Triangle Drawing

A sketch (e.g., `cse160_boat.jpg`) was drawn by hand and then recreated in WebGL using individual triangle shapes. Press the **"Draw Boat"** (or similar) button on the page to view the recreated version.

---

## Getting Started

No build tools or server required.

1. Just open `asg1.html` in a browser with WebGL support (e.g., Chrome or Firefox).
2. Ensure all `lib/` files are accessible in the same directory structure.
3. Interact with the canvas to paint or render the sketch!

---

## Resources Used

- [WebGL Programming Guide by Matsuda & Lea](https://www.webglfundamentals.org)
- [MDN Web Docs: HTML & JavaScript](https://developer.mozilla.org/)
- CSE-160 Course Videos and Labs

---

## Credits

Developed for **Assignment 1: Painting (Easy)**  
**CSE-160: Intro to Computer Graphics – Spring 2025**
- Used Chatgpt and Deepseek

---

## License

For educational purposes only.
