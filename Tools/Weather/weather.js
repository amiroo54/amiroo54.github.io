const openWeatherApiKey = "";
const googleApuKey = "";

getUserCoords();

async function getUserCoords()
{
  let x, y;
  navigator.geolocation.getCurrentPosition(
  async (position) => 
  {
    x = position.coords.latitude; 
    y = position.coords.longitude; 
    let data = await getWeatherData(x, y);
    console.log(data);
  }, 
  (error) => {console.error(error);});
}



async function getWeatherData(lat, lon) 
{
  const apiKey = '0fce1c0f8bcb76cd0b9805bb7338f73f';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try 
  {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const weatherData = 
    {
      temperature: data?.main?.temp,
      feelsLike: data?.main?.feels_like,
      humidity: data?.main?.humidity,
      pressure: data?.main?.pressure,
      windSpeed: data?.wind?.speed,
      description: data?.weather?.[0]?.description,
    };

    return weatherData;
  } 
  catch (error) 
  {
    console.error(Error `fetching weather data: ${error}`);
    return null;
  }
}




let deferredPrompt;

// Check if the browser supports the beforeinstallprompt event
if ('BeforeInstallPromptEvent' in window) {
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 76 and later from automatically showing the prompt
    event.preventDefault();
    // Save the event to be triggered later
    deferredPrompt = event;
    // Show a button or other UI element to the user to trigger the prompt later if desired
    installButton.style.display = 'block';
  });
}

// Function to handle the button click on the installButton
function installApp() {
  // If the deferredPrompt event has been saved, trigger it
  if (deferredPrompt) {
    deferredPrompt.prompt();
    // Once the user interacts with the prompt, check the user choice
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Reset the deferredPrompt variable to null
      deferredPrompt = null;
    });
  }
}

// Add an event listener to the installButton
document.getElementById("install").addEventListener('click', installApp);