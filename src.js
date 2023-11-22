

async function getWeather(location) {
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=50af999fddb14dd3a03182431231811&q=${location}&aqi=no`)
    let data = await response.json()
    // console.log(data);
    return data
}

function processData(dataJSON){
    console.log(dataJSON)
        return {
            temp_c: dataJSON.current.temp_c,
            temp_f: dataJSON.current.temp_f,
            humidity: dataJSON.current.humidity,
            wind_kph: dataJSON.current.wind_kph,
            last_updated: dataJSON.current.last_updated
        };
}

// let data = getWeather("New York").then((response) =>{
//     weather = processData(response)
//     console.log(weather);
// });

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Access the form element and the input value
    const form = document.getElementById('location');
    const locationInput = document.getElementById('location');

    const userLocation = locationInput.value;

    // You can now use the 'userLocation' variable as needed (e.g., send it to the server, display it, etc.)
    getWeather(userLocation).then( response =>{

        const weather = processData(response)
        display_data(weather)
    })
}

// Attach the handleSubmit function to the form's submit event
const formElement = document.getElementById('locationForm');
formElement.addEventListener('submit', handleSubmit);


function display_data(weather) {
    const resultContainer = document.getElementById('resultContainer');

    // Create elements to display weather information
    const temperatureCelsius = document.createElement('p');
    temperatureCelsius.textContent = `Temperature (Celsius): ${weather.temp_c}`;

    const temperatureFahrenheit = document.createElement('p');
    temperatureFahrenheit.textContent = `Temperature (Fahrenheit): ${weather.temp_f}`;

    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${weather.humidity}%`;

    const windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind Speed: ${weather.wind_kph} kph`;

    const lastUpdated = document.createElement('p');
    lastUpdated.textContent = `Last Updated: ${weather.last_updated}`;

    // Clear previous results
    resultContainer.innerHTML = '';

    // Append weather information to the result container
    resultContainer.appendChild(temperatureCelsius);
    resultContainer.appendChild(temperatureFahrenheit);
    resultContainer.appendChild(humidity);
    resultContainer.appendChild(windSpeed);
    resultContainer.appendChild(lastUpdated);
}
