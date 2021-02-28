# Session timer
A web app which let's the user set a session and a break timer from 1 to 60 minutes length each. If the timer reaches zero, an alarm sounds and the timer switches from "session" to "break" and vice versa.

### Getting started
In the project directory, both of the following commands must be run in order:

#### `npm install`

This will download all the projects dependencies listed in the respective package.json files and install them locally. If you're unfamiliar with npm, you might want to visit https://docs.npmjs.com/about-npm/ for further reference.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Usage

The +/- controls change the respective value of the session- or breaklength. The timers value is updated accordingly. The timer can also be paused, changed while being paused and reset to its default value.

### Credits
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It uses the accurate-interval package to handle the timer ticks.
