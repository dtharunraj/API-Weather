
import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setcity] = useState("")

  const [weather, setweather] = useState("")
  const [temp, settemp] = useState("")
  const [decrp, setdecrp] = useState("")
  const [error, setError] = useState("")

  function handleCity(evt) {
    setcity(evt.target.value)
  }

  function getWeather() {
    const trimmedCity = city.trim()

    if (!trimmedCity) {
      setError("Please enter a city name")
      return
    }

    setError("")
    var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedCity)}&appid=542e904b6caca33a38a692e4504dde86`)

    weatherData.then(function (success) {
      console.log(success.data)
      setweather(success.data.weather[0].main)
      settemp(success.data.main.temp)
      setdecrp(success.data.weather[0].description)
    }).catch(function () {
      setError("City not found. Please try another city")
    })
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-hidden">

      {/* Background Animation */}

      <div className="absolute top-10 left-5 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-10 right-5 sm:right-20 w-40 h-40 sm:w-60 sm:h-60 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>


      {/* Main Card */}

      <div className="relative w-full max-w-6xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl sm:rounded-[35px] shadow-2xl p-5 sm:p-8 lg:p-12">

        {/* Header */}

        <div className="text-center">

          <div className="text-5xl sm:text-6xl lg:text-7xl animate-bounce">
            🌤️
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
            Weather
          </h1>

          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mt-3 max-w-2xl mx-auto">
            Hi, I’m Tom! Here’s your weather report with the current
            weather, temperature, and description of your city 🌎
          </p>

        </div>


        {/* Search Area */}

        <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto mt-8">

          <input
            onChange={handleCity}
            type="text"
            value={city}
            placeholder="Enter your city..."
            className="w-full flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 px-5 py-4 rounded-2xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition duration-300"
          />

          <button
            onClick={getWeather}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-7 py-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Get Report 💫
          </button>

        </div>

        {error && (
          <p className="text-center text-red-300 mt-3" role="alert">
            {error}
          </p>
        )}


        {/* Weather Result */}

        <div className="mt-8 sm:mt-10">

          <div className="bg-white/10 border border-white/20 rounded-3xl p-5 sm:p-8 lg:p-10 hover:bg-white/[0.13] transition duration-500">

            {/* Weather Heading */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <p className="text-purple-300 text-sm uppercase tracking-widest">
                  Current Weather
                </p>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
                  {weather || "Waiting..."}
                </h2>

              </div>

              <div className="text-6xl sm:text-7xl lg:text-8xl animate-pulse">
                {weather === "Clear"
                  ? "☀️"
                  : weather === "Rain"
                    ? "🌧️"
                    : weather === "Clouds"
                      ? "☁️"
                      : "🌤️"}
              </div>

            </div>


            {/* Information Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

              {/* Weather */}

              <div className="bg-black/20 border border-white/10 rounded-2xl p-5 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">

                <p className="text-gray-400 text-sm">
                  Weather 🌙
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
                  {weather || "--"}
                </h3>

              </div>


              {/* Temperature */}

              <div className="bg-black/20 border border-white/10 rounded-2xl p-5 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">

                <p className="text-gray-400 text-sm">
                  Temperature 🌡️
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
                  {temp || "--"} K
                </h3>

              </div>


              {/* Description */}

              <div className="bg-black/20 border border-white/10 rounded-2xl p-5 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">

                <p className="text-gray-400 text-sm">
                  Description 💫
                </p>

                <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 capitalize break-words">
                  {decrp || "--"}
                </h3>

              </div>

            </div>


            {/* Temperature Highlight */}

            <div className="mt-5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-5 sm:p-6 text-center">

              <p className="text-gray-400 text-sm">
                Current Temperature
              </p>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mt-2">

                {temp || "--"}

                <span className="text-2xl sm:text-3xl text-purple-300 ml-2">
                  K
                </span>

              </h2>

            </div>

          </div>

        </div>


        {/* Footer */}

        <p className="text-center text-gray-500 text-xs sm:text-sm mt-6">
          🌎 Live Weather Report • Powered by Heisenberg
        </p>

      </div>

    </div>
  )
}

export default Weather