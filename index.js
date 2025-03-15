import { registerRootComponent } from "expo";
import App from "./App";

// Import necessary polyfills
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import installGlobals from "react-native-polyfill-globals"; // Changed import

installGlobals(); // Call the function

// Polyfill setImmediate
if (typeof global.setImmediate === "undefined") {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

// Register the root component
registerRootComponent(App);
