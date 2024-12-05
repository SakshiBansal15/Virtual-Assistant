import React, { useState, useEffect } from "react";

const VirtualAssistant = () => {
  const [selectedLang, setSelectedLang] = useState("en-GB");

  // Array of voice options
  const voices = [
    { name: "English - UK", lang: "en-GB" },
    { name: "English - India", lang: "en-IN" },
    { name: "Hindi - India", lang: "hi-IN" },
  ];

  // Function to speak the given input
  const speak = (input) => {
    const speakInput = new SpeechSynthesisUtterance(input);
    speakInput.lang = selectedLang;
    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;
    window.speechSynthesis.speak(speakInput);
  };

  // Greeting function based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning, how can I help you?";
    if (hour < 16) return "Good afternoon, how can I help you?";
    return "Good evening, how can I help you?";
  };

  // Handle voice input
  const startVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = selectedLang;

      recognition.onresult = (e) => {
        const spokenText = e.results[0][0].transcript;
        handleCommands(spokenText);
      };

      recognition.start();
    } else {
      alert("Your browser does not support voice input!");
    }
  };

  // Handle recognized voice commands
  const handleCommands = (command) => {
    const normalizedCommand = command.toLowerCase().trim();

    if (selectedLang.startsWith("en")) {
      if (
        normalizedCommand.includes("hello") ||
        normalizedCommand.includes("hi") ||
        normalizedCommand.includes("hey")
      ) {
        speak("Hello, how can I help you?");
        return;
      } else if (normalizedCommand.includes("good morning")) {
        speak("Good morning! How can I assist you?");
        return;
      } else if (normalizedCommand.includes("how are you")) {
        speak("I'm doing great, thank you! How can I help you?");
        return;
      } else if (normalizedCommand.includes("what is your name")) {
        speak("I am your virtual assistant!");
        return;
      }
    } 
    else if (selectedLang.startsWith("hi")) {
      if (
        normalizedCommand.includes("क्या हाल है") ||
        normalizedCommand.includes("कैसे हो") ||
        normalizedCommand.includes("क्या हाल चाल")
      ) {
        speak("मैं बढ़िया हूँ, आप बताइए!");
        return;
      } else if (normalizedCommand.includes("नमस्ते") || normalizedCommand.includes("हैलो")) {
        speak("नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?");
        return;
      } else if (normalizedCommand.includes("आपका नाम क्या है")) {
        speak("मेरा नाम आपका वर्चुअल असिस्टेंट है।");
        return;
      } else {
        speak("मुझे खेद है, मैं आपको समझ नहीं पाया।");
        return;
      }
    }
    if (
      normalizedCommand.includes("youtube") ||
      normalizedCommand.includes("यूट्यूब")
    ) {
      speak("Opening YouTube...");
      window.open("https://www.youtube.com", "_blank");
      return;
    } else if (
      normalizedCommand.includes("google") ||
      normalizedCommand.includes("गूगल")
    ) {
      speak("Opening Google...");
      window.open("https://www.google.com", "_blank");
      return;
    } else {
      speak("This is what I found on the internet regarding your request...");
      window.open(`https://www.google.com/search?q=${normalizedCommand}`, "_blank");
      return;
    }
    
  };

  // Speak greeting on component load
  useEffect(() => {
    const greeting = getGreeting();
    speak(greeting);
  }, [selectedLang]);

  return (
    <div>
      <div className="flex items-center justify-center h-screen w-screen flex-col gap-5 bg-cyan-100 ">
        <div>
          <h1 className="text-6xl font-bold font-serif text-sky-700  animate-expand-center">
            VIRTUAL ASSISTANT
          </h1>
        </div>
        <div>
          <img
            className="h-96 w-96 mix-blend-multiply "
            src="./image/robot.gif"
          ></img>
        </div>
        <div className="flex justify-center items-center gap-5 ">
          <label className=" text-xl font-semibold font-serif text-black">
            Select Language
          </label>
          <select
            className="appearance-none w-full p-4 bg-blue-500 text-white border border-gray-600 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 hover:bg-gray-600 transition duration-300 ease-in-out"
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.target.value);
              console.log(selectedLang);
            }}
          >
            {voices.map((voice) => (
              <option key={voice.lang} value={voice.lang}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg transform transition duration-300 hover:bg-blue-600 hover:scale-105 hover:animate-bounce"
            onClick={startVoiceInput}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualAssistant;
