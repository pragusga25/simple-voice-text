// app.js
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Capture speech input continuously
  recognition.interimResults = true; // Get interim results in real-time

  const output = document.getElementById('output');
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');

  recognition.onstart = function () {
    console.log('Speech recognition started');
    startButton.textContent = 'Listening...';
    startButton.disabled = true;
    stopButton.style.display = 'inline';
  };

  recognition.onresult = function (event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    // Display the speech-to-text result in real-time
    output.textContent = transcript;
  };

  recognition.onend = function () {
    console.log('Speech recognition ended');
    startButton.textContent = 'Start Listening';
    startButton.disabled = false;
    stopButton.style.display = 'none';
  };

  recognition.onerror = function (event) {
    console.log('Error occurred in recognition:', event.error);
  };

  startButton.addEventListener('click', () => {
    recognition.start();
  });

  stopButton.addEventListener('click', () => {
    recognition.stop();
  });
} else {
  console.log('Browser does not support Web Speech API');
}
