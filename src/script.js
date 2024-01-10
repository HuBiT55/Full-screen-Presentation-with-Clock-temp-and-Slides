document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelectorAll('.slide');
    var currentSlide = 0;

    function showSlides() {
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = 'block';
    }

    setInterval(showSlides, 30000);

    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();

        document.querySelector('.hour-hand').style.transform = `translateX(-50%) rotate(${(hours % 12) * 30 + minutes / 2}deg)`;
        document.querySelector('.minute-hand').style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
        document.querySelector('.second-hand').style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;

        document.getElementById('digital-clock').innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }

    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    function getWeather() {
        // tutaj wklej API key
        var apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.4064&longitude=16.9252&hourly=temperature_2m';

       //zapytanie do API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Pobieranie temperatury z prognozy
                var temperature = data.hourly.temperature_2m[0];

                // Wyświetlanie informacji o pogodzie
                document.getElementById('weather-info').innerText = `Pogoda w Poznaniu: ${temperature}°C`;
            })
            .catch(error => console.error('Błąd pobierania danych pogodowych:', error));
    }

    // funkcja aktualizacji zegara co sekundę
    setInterval(updateClock, 1000);

    // Funkcja pobierania informacji o pogodzie na początku
    getWeather();

    // Funkcja pobierania informacji o pogodzie co 10 minut (600000 ms)
    setInterval(getWeather, 600000);
});
