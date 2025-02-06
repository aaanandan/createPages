import readline from "readline";
import chalk from "chalk";
import notifier from "node-notifier";
import { GoogleAI } from "@google/generative-ai";

// Initialize the Google AI client
const client = new GoogleAI({
  apiKey: "AIzaSyBV1Rvj8CXsL_4wd-K0NiSykpLHsingM8E", // Replace with your actual API key
});

// Matrix-themed styling using chalk
const matrixTheme = chalk.greenBright.bold;

// Sound notification
function playSound() {
  notifier.notify({
    title: "Matrix AI",
    message: "New message from the AI",
    sound: true,
  });
}

// Function to send prompt to Generative AI and receive a response
async function callGenerativeAI(prompt) {
  try {
    const response = await client.generateText({
      model: "text-bison-001", // Replace with your specific model name if needed
      prompt,
      temperature: 0.7, // Adjust creativity level (0 = deterministic, 1 = creative)
      maxOutputTokens: 256, // Maximum number of tokens in the response
    });

    if (response && response.candidates && response.candidates.length > 0) {
      return response.candidates[0].output;
    } else {
      return "Sorry, I didn't understand that. Could you clarify?";
    }
  } catch (error) {
    console.error(
      chalk.redBright("Error communicating with Generative AI: "),
      error.message
    );
    return "Oops! Something went wrong. Please try again.";
  }
}

// Initialize readline for user interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: matrixTheme("MatrixAI > "),
});

// Welcome message
console.log(matrixTheme("Welcome to the Matrix AI Chat 🌌"));
console.log(matrixTheme("Type your messages below. Type 'bye' to exit.\n"));

rl.prompt();

rl.on("line", async (input) => {
  // Exit when user types "bye"
  if (input.toLowerCase() === "bye") {
    console.log(matrixTheme("Exiting... Goodbye, traveler of the Matrix!"));
    rl.close();
    return;
  }

  console.log(matrixTheme("\nProcessing your request...\n"));

  // Call Generative AI
  const response = await callGenerativeAI(input);

  // Play sound and display AI response
  playSound();
  console.log(matrixTheme(`GeminiAI: ${response}\n`));

  rl.prompt();
});

rl.on("close", () => {
  console.log(matrixTheme("Matrix connection terminated. See you next time!"));
  process.exit(0);
});
