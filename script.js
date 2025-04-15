document.addEventListener("DOMContentLoaded", () => {
    let search = document.getElementById('search');

    search.addEventListener('click', function () {
        const apiKey = 'f66be96c87871f21d7847b1b1bec197b';
        let cityElement = document.getElementById('city');

        if (!cityElement || cityElement.value.trim() === '') {
            alert("Enter a city");
            return;
        }

        let cityU = cityElement.value.trim().toLowerCase();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityU}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.cod !== 200) {
                    alert("City not found!");
                    return;
                }

                const {
                    name: city,
                    main: { temp, humidity },
                    weather: [{ description, id }],
                    wind: { speed }
                } = data;
                function getEmoji(weatherID) {
                    switch (true) {
                        case (weatherID >= 200 && id < 300):
                            return "🌧";
                        case (weatherID >= 300 && id < 400):
                            return "🌧";
                        case (weatherID >= 500 && id < 600):
                            return "🌧";
                        case (weatherID >= 600 && id < 700):
                            return "❄";
                        case (weatherID >= 700 && id < 800):
                            return "🌪";
                        case (weatherID === 800):
                            return "☀";
                        case (weatherID >= 801 && id < 810):
                            return "☁";
                        default:
                            return "❓"
                    } 
                }
                

                document.getElementById("humidity").textContent = `${humidity}%`;
                document.getElementById("des").textContent =description;
                document.getElementById("wind-speed").textContent = `${speed} m/s`;
                document.getElementById("temp").textContent = `${temp.toFixed(2)}°C`;
                document.getElementById('city-').textContent = city;
                document.getElementById('emoji').textContent = getEmoji(id);
            })
            .catch(error => {
                console.error("ERROR:", error);
                alert("An error occurred while fetching weather data.");
            });
    });
});
