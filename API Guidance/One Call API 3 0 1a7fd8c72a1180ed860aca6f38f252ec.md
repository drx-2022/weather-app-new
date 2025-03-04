# One Call API 3.0

# **Product concept**

Get essential weather data, short-term and long-term forecasts and aggregated weather data is easy with our OpenWeather **One Call API 3.0**. This product designed to ensure [easy migration from the Dark Sky API](https://openweathermap.org/darksky-openweather-3).

One Call API 3.0 contains 4 endpoints and provides access to various data:

- [**Current weather and forecasts:**](https://openweathermap.org/api/one-call-3#current)and government weather alerts
    - minute forecast for 1 hour
    - hourly forecast for 48 hours
    - daily forecast for 8 days
- [**Weather data for any timestamp**](https://openweathermap.org/api/one-call-3#history) for 46+ years historical archive and 4 days ahead forecast
- [**Daily aggregation**](https://openweathermap.org/api/one-call-3#history_daily_aggregation) of weather data for 46+ years archive and 1.5 years ahead forecast
- [**Weather overview**](https://openweathermap.org/api/one-call-3#weather_overview) with a human-readable weather summary for today and tomorrow's forecast, utilizing OpenWeather AI technologies

One Call API 3.0 is based on the proprietary [OpenWeather Model](https://openweather.co.uk/technology) and is updated every 10 minutes. Thus, in order to receive the most accurate and up-to-date weather data, we recommend you request One Call API 3.0 every 10 minutes.

Please note, that One Call API 3.0 is included in the ["One Call by Call"](https://openweathermap.org/price) subscription **only**. This separate subscription includes 1,000 calls/day for free and allows you to pay only for the number of API calls made to this product. Please note, that you do not need to subscribe to any other OpenWeather subscription plans to get access to the One Call API 3.0. Please find more details on the [pricing page](https://openweathermap.org/price) and [FAQ](https://openweathermap.org/faq#onecall) or ask [Ulla, OpenWeather AI assistant](https://openweathermap.org/chat).

**How to start**
1. [Sign up](https://home.openweathermap.org/users/sign_up) to OpenWeather service in case you haven't got your [OpenWeather API key](https://home.openweathermap.org/api_keys) yet.
2. Follow the [pricing page](https://openweathermap.org/price#onecall) to learn details about the price.
One Call API 3.0 is included in the separate subscription only and allows you to pay only for the number of API calls made to this product. Please find more details on the [pricing page](https://openweathermap.org/price#onecall).
3. Once you subscribe to One call API 3.0, 2000 API calls per day to this product are set up by default. If you want to change this limit, please go to the ["Billing plans" tab](https://home.openweathermap.org/subscriptions) in your Personal account to update standard settings. You can find more information on the [FAQ](https://openweathermap.org/faq#onecall) or ask [Ulla, OpenWeather AI assistant](https://openweathermap.org/chat).
4. Select the desired type of data ([Current and forecasts weather data](https://openweathermap.org/api/one-call-3#current), [Weather data for timestamp](https://openweathermap.org/api/one-call-3#history), [Daily aggregation](https://openweathermap.org/api/one-call-3#history_daily_aggregation), [Weather overview](https://openweathermap.org/api/one-call-3#weather_overview)) and make an API call according to relevant tech documentation section, remembering to add your key to each call.

1. 1. [Sign up](https://home.openweathermap.org/users/sign_up) to OpenWeather service in case you haven't got your [OpenWeather API key](https://home.openweathermap.org/api_keys) yet.
2. 2. Follow the [pricing page](https://openweathermap.org/price#onecall) to learn details about the price.
    
    One Call API 3.0 is included in the separate subscription only and allows you to pay only for the number of API calls made to this product. Please find more details on the [pricing page](https://openweathermap.org/price#onecall).
    
3. 3. Once you subscribe to One call API 3.0, 2000 API calls per day to this product are set up by default. If you want to change this limit, please go to the ["Billing plans" tab](https://home.openweathermap.org/subscriptions) in your Personal account to update standard settings. You can find more information on the [FAQ](https://openweathermap.org/faq#onecall) or ask [Ulla, OpenWeather AI assistant](https://openweathermap.org/chat).
4. 4. Select the desired type of data ([Current and forecasts weather data](https://openweathermap.org/api/one-call-3#current), [Weather data for timestamp](https://openweathermap.org/api/one-call-3#history), [Daily aggregation](https://openweathermap.org/api/one-call-3#history_daily_aggregation), [Weather overview](https://openweathermap.org/api/one-call-3#weather_overview)) and make an API call according to relevant tech documentation section, remembering to add your key to each call.

# **Current and forecasts weather data**

To get access to current weather, minute forecast for 1 hour, hourly forecast for 48 hours, daily forecast for 8 days and government weather alerts, please use this section of the documentation.

If you are interested in other functionality on One Call API 3.0, please check [Product concept](https://openweathermap.org/api/one-call-3#concept) to follow the right section.

# **How to make an API call**

**API call**

```
https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat` | required | Latitude, decimal (-90; 90). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `lon` | required | Longitude, decimal (-180; 180). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `exclude` | optional | By using this parameter you can exclude some parts of the weather data from the API response. It should be a comma-delimited list (without spaces).Available values:
• `current`
• `minutely`
• `hourly`
• `daily`
• `alerts` |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/api/one-call-3#data) |
| `lang` | optional | You can use the `lang` parameter to get the output in your language. [Learn more](https://openweathermap.org/api/one-call-3#multi) |

**Example of API call**

Before making an API call, please note, that One Call 3.0 is included in the "One Call by Call" subscription **only**. [Learn more](https://openweathermap.org/price)

If you you want to exclude some parts of the weather data from the API response please add `exclude` parameter to the API call like in the example below:

```
https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
```

If you do not need to exclude any of the weather data from the API response please use API call like in the example below:

```
https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}
```

**Example of API response**

```
Example of API response
```

```json
                
{
   "lat":33.44,
   "lon":-94.04,
   "timezone":"America/Chicago",
   "timezone_offset":-18000,
   "current":{
      "dt":1684929490,
      "sunrise":1684926645,
      "sunset":1684977332,
      "temp":292.55,
      "feels_like":292.87,
      "pressure":1014,
      "humidity":89,
      "dew_point":290.69,
      "uvi":0.16,
      "clouds":53,
      "visibility":10000,
      "wind_speed":3.13,
      "wind_deg":93,
      "wind_gust":6.71,
      "weather":[
         {
            "id":803,
            "main":"Clouds",
            "description":"broken clouds",
            "icon":"04d"
         }
      ]
   },
   "minutely":[
      {
         "dt":1684929540,
         "precipitation":0
      },
      ...
   ],
   "hourly":[
      {
         "dt":1684926000,
         "temp":292.01,
         "feels_like":292.33,
         "pressure":1014,
         "humidity":91,
         "dew_point":290.51,
         "uvi":0,
         "clouds":54,
         "visibility":10000,
         "wind_speed":2.58,
         "wind_deg":86,
         "wind_gust":5.88,
         "weather":[
            {
               "id":803,
               "main":"Clouds",
               "description":"broken clouds",
               "icon":"04n"
            }
         ],
         "pop":0.15
      },
      ...
   ],
   "daily":[
      {
         "dt":1684951200,
         "sunrise":1684926645,
         "sunset":1684977332,
         "moonrise":1684941060,
         "moonset":1684905480,
         "moon_phase":0.16,
         "summary":"Expect a day of partly cloudy with rain",
         "temp":{
            "day":299.03,
            "min":290.69,
            "max":300.35,
            "night":291.45,
            "eve":297.51,
            "morn":292.55
         },
         "feels_like":{
            "day":299.21,
            "night":291.37,
            "eve":297.86,
            "morn":292.87
         },
         "pressure":1016,
         "humidity":59,
         "dew_point":290.48,
         "wind_speed":3.98,
         "wind_deg":76,
         "wind_gust":8.92,
         "weather":[
            {
               "id":500,
               "main":"Rain",
               "description":"light rain",
               "icon":"10d"
            }
         ],
         "clouds":92,
         "pop":0.47,
         "rain":0.15,
         "uvi":9.23
      },
      ...
   ],
    "alerts": [
    {
      "sender_name": "NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)",
      "event": "Small Craft Advisory",
      "start": 1684952747,
      "end": 1684988747,
      "description": "...SMALL CRAFT ADVISORY REMAINS IN EFFECT FROM 5 PM THIS\nAFTERNOON TO 3 AM EST FRIDAY...\n* WHAT...North winds 15 to 20 kt with gusts up to 25 kt and seas\n3 to 5 ft expected.\n* WHERE...Coastal waters from Little Egg Inlet to Great Egg\nInlet NJ out 20 nm, Coastal waters from Great Egg Inlet to\nCape May NJ out 20 nm and Coastal waters from Manasquan Inlet\nto Little Egg Inlet NJ out 20 nm.\n* WHEN...From 5 PM this afternoon to 3 AM EST Friday.\n* IMPACTS...Conditions will be hazardous to small craft.",
      "tags": [

      ]
    },
    ...
  ]
```

**Fields in API response**

If you do not see some of the parameters in your API response it means that these weather phenomena are just not happened for the time of measurement for the city or location chosen. Only really measured or calculated data is displayed in API response.

- `lat` Latitude of the location, decimal (−90; 90)
- `lon` Longitude of the location, decimal (-180; 180)
- `timezone` Timezone name for the requested location
- `timezone_offset` Shift in seconds from UTC
- `current` **Current weather data API response**
    - `current.dt` Current time, Unix, UTC
    - `current.sunrise` Sunrise time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response
    - `current.sunset` Sunset time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response
    - `current.temp` Temperature. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `current.feels_like` Temperature. This temperature parameter accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
    - `current.pressure` Atmospheric pressure on the sea level, hPa
    - `current.humidity` Humidity, %
    - `current.dew_point` Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit
    - `current.clouds` Cloudiness, %
    - `current.uvi` Current UV index.
    - `current.visibility` Average visibility, metres. The maximum value of the visibility is 10 km
    - `current.wind_speed` Wind speed. Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `current.wind_gust` (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `current.wind_deg` Wind direction, degrees (meteorological)
    - `current.rain`
        - `current.rain.1h` (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
    - `current.snow`
        - `current.snow.1h` (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
    - `current.weather`
        - `current.weather.id` [Weather condition id](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
        - `current.weather.main` Group of weather parameters (Rain, Snow etc.)
        - `current.weather.description` Weather condition within the group ([full list of weather conditions](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)). Get the output in [your language](https://openweathermap.org/api/one-call-3#multi)
        - `current.weather.icon` Weather icon id. [How to get icons](https://openweathermap.org/weather-conditions#How-to-get-icon-URL)
- `minutely` **Minute forecast weather data API response**
    - `minutely.dt` Time of the forecasted data, unix, UTC
    - `minutely.precipitation` Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
- `hourly` **Hourly forecast weather data API response**
    - `hourly.dt` Time of the forecasted data, Unix, UTC
    - `hourly.temp` Temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `hourly.feels_like` Temperature. This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
    - `hourly.pressure` Atmospheric pressure on the sea level, hPa
    - `hourly.humidity` Humidity, %
    - `hourly.dew_point` Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
    - `hourly.uvi` UV index
    - `hourly.clouds` Cloudiness, %
    - `hourly.visibility` Average visibility, metres. The maximum value of the visibility is 10 km
    - `hourly.wind_speed` Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.[How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `hourly.wind_gust` (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `hourly.wind_deg` Wind direction, degrees (meteorological)
    - `hourly.pop` Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
    - `hourly.rain`
        - `hourly.rain.1h` (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
    - `hourly.snow`
        - `hourly.snow.1h` (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
    - `hourly.weather`
        - `hourly.weather.id` [Weather condition id](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
        - `hourly.weather.main` Group of weather parameters (Rain, Snow etc.)
        - `hourly.weather.description` Weather condition within the group ([full list of weather conditions](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)). Get the output in [your language](https://openweathermap.org/api/one-call-3#multi)
        - `hourly.weather.icon` Weather icon id. [How to get icons](https://openweathermap.org/weather-conditions#How-to-get-icon-URL)
- `daily` **Daily forecast weather data API response**
    - `daily.dt` Time of the forecasted data, Unix, UTC
    - `daily.sunrise` Sunrise time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response
    - `daily.sunset` Sunset time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response
    - `daily.moonrise` The time of when the moon rises for this day, Unix, UTC
    - `daily.moonset` The time of when the moon sets for this day, Unix, UTC
    - `daily.moon_phase` Moon phase. `0` and `1` are 'new moon', `0.25` is 'first quarter moon', `0.5` is 'full moon' and `0.75` is 'last quarter moon'. The periods in between are called 'waxing crescent', 'waxing gibbous', 'waning gibbous', and 'waning crescent', respectively. Moon phase calculation algorithm: if the moon phase values between the start of the day and the end of the day have a round value (0, 0.25, 0.5, 0.75, 1.0), then this round value is taken, otherwise the average of moon phases for the start of the day and the end of the day is taken
    - `summary`Human-readable description of the weather conditions for the day
    - `daily.temp` Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
        - `daily.temp.morn` Morning temperature.
        - `daily.temp.day` Day temperature.
        - `daily.temp.eve` Evening temperature.
        - `daily.temp.night` Night temperature.
        - `daily.temp.min` Min daily temperature.
        - `daily.temp.max` Max daily temperature.
    - `daily.feels_like` This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
        - `daily.feels_like.morn` Morning temperature.
        - `daily.feels_like.day` Day temperature.
        - `daily.feels_like.eve` Evening temperature.
        - `daily.feels_like.night` Night temperature.
    - `daily.pressure` Atmospheric pressure on the sea level, hPa
    - `daily.humidity` Humidity, %
    - `daily.dew_point` Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
    - `daily.wind_speed` Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `daily.wind_gust` (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `daily.wind_deg` Wind direction, degrees (meteorological)
    - `daily.clouds` Cloudiness, %
    - `daily.uvi` The maximum value of UV index for the day
    - `daily.pop` Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
    - `daily.rain` (where available) Precipitation volume, mm. Please note that only mm as units of measurement are available for this parameter
    - `daily.snow` (where available) Snow volume, mm. Please note that only mm as units of measurement are available for this parameter
    - `daily.weather`
        - `daily.weather.id` [Weather condition id](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
        - `daily.weather.main` Group of weather parameters (Rain, Snow etc.)
        - `daily.weather.description` Weather condition within the group ([full list of weather conditions](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)). Get the output in [your language](https://openweathermap.org/api/one-call-3#multi)
        - `daily.weather.icon` Weather icon id. [How to get icons](https://openweathermap.org/weather-conditions#How-to-get-icon-URL)
- `alerts` **National weather alerts data from major national weather warning systems**
    - `alerts.sender_name` Name of the alert source. Please read here the [full list of alert sources](https://openweathermap.org/api/one-call-3#listsource)
    - `alerts.event` Alert event name
    - `alerts.start` Date and time of the start of the alert, Unix, UTC
    - `alerts.end` Date and time of the end of the alert, Unix, UTC
    - `alerts.description` Description of the alert
    - `alerts.tags` Type of severe weather

National weather alerts are provided in English by default.Please note that some agencies provide the alert’s description only in a local language.

# **Weather data for timestamp**

To learn about how get access to weather data for any timestamp from 1st January 1979 till 4 days ahead forecast, please use this section of the documentation.

If you are interested in other functionality on One Call API 3.0, please check [Product concept](https://openweathermap.org/api/one-call-3#concept) to follow the right section.

# **How to make an API call**

**API call**

```
https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat` | required | Latitude, decimal (-90; 90). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `lon` | required | Longitude, decimal (-180; 180). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `dt` | required | Timestamp (Unix time, UTC time zone), e.g. dt=1586468027. Data is available **from January 1st, 1979 till 4 days ahead** |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/api/one-call-3#data) |
| `lang` | optional | You can use the `lang` parameter to get the output in your language. [Learn more](https://openweathermap.org/api/one-call-3#multi) |

Please note that the one API response contains weather data for only one specified timestamp.

**Example of API call**

Before making an API call, please note, that One Call 3.0 is included in the "One Call by Call" subscription **only**. [Learn more](https://openweathermap.org/price)

```
https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid={API key}
```

**Example of API response**

```
Example of API response
```

```json
                   
  {
  "lat": 52.2297,
  "lon": 21.0122,
  "timezone": "Europe/Warsaw",
  "timezone_offset": 3600,
  "data": [
    {
      "dt": 1645888976,
      "sunrise": 1645853361,
      "sunset": 1645891727,
      "temp": 279.13,
      "feels_like": 276.44,
      "pressure": 1029,
      "humidity": 64,
      "dew_point": 272.88,
      "uvi": 0.06,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 3.6,
      "wind_deg": 340,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ]
    }
  ]
}
```

**Fields in API response**

If you do not see some of the parameters in your API response it means that these weather phenomena are just not happened for the time of measurement for the city or location chosen. Only really measured or calculated data is displayed in API response.

- `lat` Latitude of the location, decimal (−90; 90)
- `lon` Longitude of the location, decimal (-180; 180)
- `timezone` Timezone name for the requested location
- `timezone_offset` Shift in seconds from UTC
- `data`
    - `data.dt` Requested time, Unix, UTC
    - `data.sunrise` Sunrise time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response
    - `data.sunset` Sunset time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response
    - `data.temp` Temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `data.feels_like` Temperature. This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
    - `data.pressure` Atmospheric pressure on the sea level, hPa
    - `data.humidity` Humidity, %
    - `data.dew_point` Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
    - `data.clouds` Cloudiness, %
    - `data.uvi` UV index. Please pay attention that historical UV index data available only for 5 days back. If you would like to get historical UVI index data starting from 20th September 2020 please [contact us](mailto:info@openweathermap.org)
    - `data.visibility` Average visibility, metres. The maximum value of the visibility is 10 km
    - `data.wind_speed` Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `data.wind_gust` (where available) Wind gust. Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `data.wind_deg` Wind direction, degrees (meteorological)
    - `data.weather`
        - `data.weather.id` [Weather condition id](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
        - `data.weather.main` Group of weather parameters (Rain, Snow etc.)
        - `data.weather.description` Weather condition within the group ([full list of weather conditions](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)). Get the output in [your language](https://openweathermap.org/api/one-call-3#multi)
        - `data.weather.icon` Weather icon id. [How to get icons](https://openweathermap.org/weather-conditions#How-to-get-icon-URL)
    - `data.rain` (where available)
        - `1h` Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
    - `data.snow`(where available)
        - `1h` Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter

# **Daily Aggregation**

To learn about how get access to aggregated weather data for a particular date from 2nd January 1979 till long-term forecast for 1,5 years ahead, please use this section of the documentation.

If you are interested in other functionality on One Call API 3.0, please check [Product concept](https://openweathermap.org/api/one-call-3#concept) to follow the right section.

# **How to make an API call**

**API call**

```
https://api.openweathermap.org/data/3.0/onecall/day_summary?lat={lat}&lon={lon}&date={date}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat` | required | Latitude, decimal (-90; 90) |
| `lon` | required | Longitude, decimal (-180; 180) |
| `date` | required | Date in the `YYYY-MM-DD` format for which data is requested. Date is available for 46+ years archive (starting from 1979-01-02) up to the 1,5 years ahead forecast to the current date |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/api/one-call-3#data) |
| `lang` | optional | You can use the `lang` parameter to get the output in your language. [Learn more](https://openweathermap.org/api/one-call-3#multi) |

If the service detected timezone for your location incorrectly you can specify correct timezone manually by adding

```
tz
```

parameter in the ±XX:XX format to API call.

**API call**

```
https://api.openweathermap.org/data/3.0/onecall/day_summary?lat={lat}&lon={lon}&date={date}&tz={tz}&appid={API key}
```

**Example of API call**

```
https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=60.45&lon=-38.67&date=2023-03-30&tz=+03:00&appid={API key}
```

Please pay attention that in case timezone is specified time of afternoon, night, evening, morning temperatures, pressure, humidity will be returned in accordance with this specified timezone.

**Example of API call**

Before making an API call, please note, that One Call 3.0 is included in the "One Call by Call" subscription **only**. [Learn more](https://openweathermap.org/price)

```
https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=39.099724&lon=-94.578331&date=2020-03-04&appid={API key}
```

**Example of API response**

```
Example of API response
```

```json
                   
  {
   "lat":33,
   "lon":35,
   "tz":"+02:00",
   "date":"2020-03-04",
   "units":"standard",
   "cloud_cover":{
      "afternoon":0
   },
   "humidity":{
      "afternoon":33
   },
   "precipitation":{
      "total":0
   },
   "temperature":{
      "min":286.48,
      "max":299.24,
      "afternoon":296.15,
      "night":289.56,
      "evening":295.93,
      "morning":287.59
   },
   "pressure":{
      "afternoon":1015
   },
   "wind":{
      "max":{
         "speed":8.7,
         "direction":120
      }
   }
}
```

**Fields in API response**

- `lat` Latitude of the location, decimal (−90; 90)
- `lon` Longitude of the location, decimal (-180; 180)
- `tz` Timezone in the ±XX:XX format
- `date` Date specified in the API request in the `YYYY-MM-DD` format (from 1979-01-02 up to the 1,5 years ahead forecast)
- `units` Units of measurement specified in the request. [Learn more](https://openweathermap.org/api/one-call-3#data)
- `cloud_cover` Cloud related information
    - `afternoon` Cloud cover at 12:00 for the date specified in the request, %
- `humidity` Humidity related information
    - `afternoon` Relative humidity at 12:00 for the date specified in the request, %
- `precipitation` Precipitation related information
    - `total` Total amount of liquid water equivalent of precipitation for the date specified in the request, mm
- `pressure` Atmospheric pressure related information
    - `afternoon` Atmospheric pressure at 12:00 for the date specified in the request, hPa
- `temperature` Temperature related information
    - `min` Minimum temperature for the date specified in the request. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `max` Maximum temperature for the date specified in the request. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `afternoon` Temperature at 12:00 for the date specified in the request. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `night` Temperature at 00:00 for the date specified in the request. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `evening` Temperature at 18:00 for the date specified in the request. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
    - `morning` Temperature at 06:00 for the date specified in the request. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. [How to change units used](https://openweathermap.org/api/one-call-3#data)
- `wind` Wind speed related information
    - `max` Maximum wind speed related information
        - `speed` Maximum wind speed for the date specified in the request. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. [How to change units used](https://openweathermap.org/api/one-call-3#data)
        - `direction` Wind cardinal direction relevant to the maximum wind speed, degrees (meteorological)

# **Weather overview**

This section describes how to get weather overview with a human-readable weather summary for today and tomorrow's forecast, utilizing OpenWeather AI technologies.

If you are interested in other functionality on One Call API 3.0, please check [Product concept](https://openweathermap.org/api/one-call-3#concept) to follow the right section.

# **How to make an API call**

**API call**

```
https://api.openweathermap.org/data/3.0/onecall/overview?lat={lat}&lon={lon}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat` | required | Latitude, decimal (-90; 90) |
| `lon` | required | Longitude, decimal (-180; 180) |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `date` | optional | The date the user wants to get a weather summary in the YYYY-MM-DD format. Data is available for today and tomorrow. If not specified, the current date will be used by default. Please note that the date is determined by the timezone relevant to the coordinates specified in the API request |
| `units` | optional | Units of measurement. Standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. [Learn more](https://openweathermap.org/api/one-call-3#data) |

**Example of API call**

```
https://api.openweathermap.org/data/3.0/onecall/overview?lon=-11.8092&lat=51.509865&appid={API key}
```

```
Example of API response
```

```json
                   
{
   "lat": 51.509865,
   "lon": -0.118092,
   "tz": "+01:00",
   "date": "2024-05-13",
   "units": "metric",
   "weather_overview": "The current weather is overcast with a 
temperature of 16°C and a feels-like temperature of 16°C. 
The wind speed is 4 meter/sec with gusts up to 6 meter/sec 
coming from the west-southwest direction. 
The air pressure is at 1007 hPa with a humidity level of 79%. 
The dew point is at 12°C and the visibility is 10000 meters. 
The UV index is at 4, indicating moderate risk from the 
sun's UV rays. 
The sky is covered with overcast clouds, and there is 
no precipitation expected at the moment. 
Overall, it is a moderately cool and cloudy day 
with light to moderate winds from the west-southwest."
}
```

**Fields in API response**

- `lat` Latitude of the location, decimal (−90; 90)
- `lon` Longitude of the location, decimal (-180; 180)
- `tz`Timezone in the ±XX:XX format
- `date` Date for which summary is generated in the format YYYY-MM-DD
- `units` Units of measurement specified in the request
- `weather_overview`AI generated weather overview for the requested date

# **Other features**

# **List of weather condition codes**

List of [weather condition codes](https://openweathermap.org/weather-conditions) with icons (range of thunderstorm, drizzle, rain, snow, clouds, atmosphere etc.)

# **Units of measurement**

`standard`, `metric` and `imperial` units are available.

[List of all API parameters with available units.](http://openweathermap.org/weather-data)

**API call**

```
https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&units={units}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. |

Temperature is available in Fahrenheit, Celsius and Kelvin units.

Wind speed is available in miles/hour and meter/sec.

- For temperature in Fahrenheit and wind speed in miles/hour, use `units=imperial`
- For temperature in Celsius and wind speed in meter/sec, use `units=metric`
- Temperature in Kelvin and wind speed in meter/sec is used by default, so there is no need to use the units parameter in the API call if you want this

**Examples of API calls**

Standard (default)

```
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335
```

Metric

```
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&units=metric
```

Imperial

```
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&units=imperial
```

# **Multilingual support**

You can use `lang` parameter to get the output in your language.

The contents of the `description` field will be translated.

**API call**

```
https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&lang={lang}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lang` | optional | You can use the `lang` parameter to get the output in your language. |

**Example of API call**

Before making an API call, please note, that One Call 3.0 is included in the "One Call by Call" subscription **only**. [Learn more](https://openweathermap.org/price)

```
https://api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&lang=zh_cn
```

We support the following languages. To select one, you can use the corresponding language code:

- `sq` Albanian
- `af` Afrikaans
- `ar` Arabic
- `az` Azerbaijani
- `eu` Basque
- `be` Belarusian
- `bg` Bulgarian
- `ca` Catalan
- `zh_cn` Chinese Simplified
- `zh_tw` Chinese Traditional
- `hr` Croatian
- `cz` Czech
- `da` Danish
- `nl` Dutch
- `en` English
- `fi` Finnish
- `fr` French
- `gl` Galician
- `de` German
- `el` Greek
- `he` Hebrew
- `hi` Hindi
- `hu` Hungarian
- `is` Icelandic
- `id` Indonesian
- `it` Italian
- `ja` Japanese
- `kr` Korean
- `ku` Kurmanji (Kurdish)
- `la` Latvian
- `lt` Lithuanian
- `mk` Macedonian
- `no` Norwegian
- `fa` Persian (Farsi)
- `pl` Polish
- `pt` Portuguese
- `pt_br` Português Brasil
- `ro` Romanian
- `ru` Russian
- `sr` Serbian
- `sk` Slovak
- `sl` Slovenian
- `sp, es` Spanish
- `sv, se` Swedish
- `th` Thai
- `tr` Turkish
- `ua, uk` Ukrainian
- `vi` Vietnamese
- `zu` Zulu

# **List of national weather alerts sources**

| **Country** | **Agency** |
| --- | --- |
| Albania | Institute of GeoSciences, Energy, Water and Environment of Albania |
| Algeria | National Meteorological Office |
| Argentina | National Weather Service of Argentina |
| Australia | Australian Bureau of Meteorology |
| Austria | • Central Institute for Meteorology and Geodynamics
• Water Balance Department |
| Bahrain | Bahrain Meteorological Directorate |
| Barbados | Barbados Meteorological Service |
| Belarus | State institution "Republican center for hydrometeorology, control of radioactive contamination and environmental monitoring" (Belhydromet) |
| Belgium | Royal Meteorological Institute |
| Belize | National Meteorological Service of Belize |
| Benin | National Meteorological Agency (METEO-BENIN) |
| Bosnia and Herzegovina | • Federal Hydrometeorological Institute of BiH
• Republic Hydrometeorological Institute |
| Botswana | Botswana Meteorological Services |
| Brazil | National Meteorological Institute - INMET |
| Bulgaria | National Institute of Meteorology and Hydrology - Plovdiv branch |
| Cameroon | Cameroon National Meteorological Service |
| Canada | • Alberta Emergency Management Agency (Government of Alberta, Ministry of Municipal Affairs)
• Meteorological Service of Canada
• Quebec Ministry of Public Safety
• Yukon Emergency Measures Organization
• Manitoba Emergency Management Organization |
| Chile | Meteorological Directorate of Chile |
| Congo | National Civil Aviation Agency (ANAC Congo) |
| Costa Rica | National Meteorological Institute of Costa Rica |
| Croatia | State Hydrometeorological Institute (DHMZ) |
| Curacao and Sint Maarten | Meteorological Department Curacao |
| Cyprus | Republic of Cyprus - Department of Meteorology |
| Czech Republic | Czech Hydrometeorological Institute |
| Denmark | Danish Meteorological Institute |
| Ecuador | Ecuadoran Institute for Meteorology and Hydrology (INAMHI) |
| Egypt | Egyptian Meteorological Authority |
| Estonia | Estonian Environment Agency |
| Eswatini | Eswatini Meteorological Service |
| Finland | Finnish Meteorological Institute |
| France | Meteo-France |
| Gabon | General Directorate of Meteorology of Gabon |
| Germany | German Meteorological Office |
| Ghana | Ghana Meteorological Agency |
| Greece | Hellenic National Meteorological Service |
| Guinea | National Meteorological Agency of Guinea |
| Guyana | Hydrometeorological Service of Guyana |
| Hong Kong China | Hong Kong Observatory |
| Hungary | Hungarian Meteorological Service |
| Iceland | Icelandic Meteorological Office |
| India | India Meteorological Department |
| Indonesia | • Agency for Meteorology Climatology and Geophysics of Republic Indonesia (BMKG)
• InaTEWS BMKG |
| Ireland | Met Eireann - Irish Meteorological Service |
| Israel | Israel Meteorological Service |
| Italy | Italian Air Force National Meteorological Service |
| Ivory Coast | Airport, aeronautical and meteorological operating and development company (SODEXAM) |
| Jamaica | Meteorological Service of Jamaica |
| Japan | Japan Meteorological Business Support Center |
| Jordan | Jordanian Meteorological Department |
| Kazakhstan | National Hydrometeorological Service of the Republic of Kazakhstan (Kazhydromet) |
| Kenya | Kenya Meteorological Department |
| Kuwait | Kuwait Meteorological Department |
| Latvia | Latvian Environment, Geology and Meteorology Center |
| Lesotho | Lesotho Meteorological Services |
| Libya | Libyan National Meteorological Center |
| Lithuania | Lithuanian Hydrometeorological Service under the Ministry of Environment of the Republic of Lithuania (LHMS) |
| Luxembourg | Luxembourg Airport Administration |
| Macao China | Macao Meteorological and Geophysical Bureau |
| Madagascar | METEO Madagascar |
| Malawi | Malawi Department of Climate Change and Meteorological Services |
| Maldives | Maldives Meteorological Service |
| Mauritania | National Meteorological Office of Mauritania |
| Mauritius | Mauritius Meteorological Services |
| Mexico | CONAGUA - National Meteorological Service of Mexico |
| Moldova | State Hydrometeorological Service of Moldova |
| Mongolia | National Agency Meteorology and the Environmental Monitoring of Mongolia |
| Mozambique | National Institute of Meteorology of Mozambique |
| Myanmar | Myanmar Department of Meteorology and Hydrology |
| Netherlands | Royal Netherlands Meteorological Institute (KNMI) |
| New Zealand | • Meteorological Service of New Zealand Limited
• National Emergency Management Agency
• Fire and Emergency New Zealand
• Civil Defence Emergency Management (CDEM) Groups |
| New Zealand | New Zealand Emergency Mobile Alert |
| Niger | National Meteorological Directorate of Niger |
| Nigeria | Nigerian Meteorological Agency (NiMet) |
| North Macedonia | National Hydrometeorological Service - Republic of Macedonia |
| Norway | • Norwegian Meteorological Institute
• Norwegian Water Resources and Energy Directorate |
| Paraguay | Directorate of Meteorology and Hydrology |
| Philippines | Philippine Atmospheric Geophysical and Astronomical Services Administration |
| Poland | Institute of Meteorology and Water Management (IMGW-PIB) |
| Portugal | Portuguese Institute of Sea and Atmosphere, I.P. |
| Qatar | Qatar Meteorology Department |
| Republic of Korea | Korea Meteorological Administration, Weather Information |
| Romania | National Meteorological Administration |
| Russia-EN | Hydrometcenter of Russia |
| Russia-RU | Russian Federal Service for Hydrometeorology and Environmental Monitoring |
| Saudi Arabia | National Center for Meteorology - Kingdom of Saudi Arabia |
| Serbia | Republic Hydrometeorological Service of Serbia |
| Seychelles | Seychelles Meteorological Authority |
| Singapore | Meteorological Service Singapore |
| Slovakia | Slovak Hydrometeorological Institute |
| Slovenia | National Meteorological Service of Slovenia |
| Solomon Islands | Solomon Islands Meteorological Services |
| South Africa | South African Weather Service (SAWS) |
| Spain | State Meteorological Agency (AEMET) |
| Sudan | Sudan Meteorological Authority |
| Sweden | Swedish Meteorological and Hydrological Institute |
| Switzerland | MeteoSwiss |
| Tanzania | Tanzania Meteorological Authority |
| Thailand | Thai Meteorological Department |
| Timor-Leste | National Directorate of Meteorology and Geophysics of Timor-Leste |
| Trinidad and Tobago | Trinidad and Tobago Meteorological Service |
| Ukraine | Ukrainian Hydrometeorological Center |
| United Kingdom of Great Britain and Northern Ireland | UK Met Office |
| Uruguay | Uruguayan Institute of Meteorology |
| United States | • Environmental Protection Agency (EPA), Air Quality Alerts
• Integrated Public Alerrt and Warning System (IPAWS)
• National Oceanic and Atmospheric Administration (NOAA), National Tsunami Warning Center
• National Oceanic and Atmospheric Administration (NOAA), National Weather Service
• National Oceanic and Atmospheric Administration (NOAA), National Weather Service - Marine Zones
• U.S. Geological Survey (USGS), Volcano Hazard Program |
| USA | National Oceanic and Atmospheric Administration |
| Yemen | Yemeni Civil Aviation and Meteorology Authority (CAMA) |
| Zambia | Meteorological Department Zambia |
| Zimbabwe | Meteorological Services Department |

Please note that some agencies from the list may cease to provide us the weather alert information.

In case you don’t receive alerts from any agency, please [contact us](mailto:info@openweathermap.org).

We constantly work on our product’s improvement and keep expanding the list of partner agencies.

# **Call back function for JavaScript code**

To use JavaScript code you can transfer `callback` functionName to JSONP callback.

**API call example**

```
api.openweathermap.org/data/3.0/onecall?lat=38.8&lon=12.09&callback=test
```

# **API errors**

# **Structure of API errors**

In case of incorrected API call you will receive API error response. Error response payload returned for all types of errors with the structure below.

**Example of error response**

```
Example of error response
```

                
`{
    "cod":400,
    "message":"Invalid date format",
    "parameters": [
        "date"
    ]
}`

**Fields in error response**

- `cod` Code of error
- `message` Description of error
- `parameters`(optional) List of request parameters names that are related to this particular error

# **Errors list**

Please find more detailed information about some popular errors below.

API calls return an error 400

API calls return an error 401

API calls return an error 404

API calls return an error 429

**API calls return errors '5xx'**

Errors 5xx - Unexpected Error. You can get '5xx' error in case of other internal errors. Error Response code will be `5xx`. Please [contact us](https://home.openweathermap.org/questions) and enclose an example of your API request that receives this error into your email to let us analyze it and find a solution for you promptly. You may retry the request which led to this error.
