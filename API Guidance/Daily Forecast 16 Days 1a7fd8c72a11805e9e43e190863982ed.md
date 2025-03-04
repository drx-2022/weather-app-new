# Daily Forecast 16 Days

# **Product concept**

Daily Forecast 16 Days is available at any location on the globe. The forecast includes daily weather data and the response data is available in JSON or XML format.

# **Call 16 day / daily forecast data**

# **How to make an API call**

You can seach 16 day weather forecast with daily average parameters by geographic coordinates. All weather data can be obtained in JSON and XML formats.

**API call**

```
api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat` | required | Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `lon` | required | Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `cnt` | optional | A number of days, which will be returned in the API response (from `1` to `16`). [Learn more](https://openweathermap.org/forecast16#limit) |
| `mode` | optional | Data format. Possible values are: `json`, `xml`. If the `mode` parameter is empty the format is JSON by default. [Learn more](https://openweathermap.org/forecast16#format) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/forecast16#data) |
| `lang` | optional | Language code. [Learn more](https://openweathermap.org/forecast16#multi) |

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that [built-in geocoder](https://openweathermap.org/forecast16#geocoding) has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

**Example of API call**

Call 7 days forecast by geographic coordinates

```
api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid={API key}
```

# **API response**

If you do not see some of the parameters in your API response it means that these weather phenomena are just not happened for the time of measurement for the city or location chosen. Only really measured or calculated data is displayed in API response.

# **JSON**

```
JSON format API response example
```

```json
{
  "city": {
    "id": 3163858,
    "name": "Zocca",
    "coord": {
      "lon": 10.99,
      "lat": 44.34
    },
    "country": "IT",
    "population": 4593,
    "timezone": 7200
  },
  "cod": "200",
  "message": 0.0582563,
  "cnt": 7,
  "list": [
    {
      "dt": 1661857200,
      "sunrise": 1661834187,
      "sunset": 1661882248,
      "temp": {
        "day": 299.66,
        "min": 288.93,
        "max": 299.66,
        "night": 290.31,
        "eve": 297.16,
        "morn": 288.93
      },
      "feels_like": {
        "day": 299.66,
        "night": 290.3,
        "eve": 297.1,
        "morn": 288.73
      },
      "pressure": 1017,
      "humidity": 44,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "speed": 2.7,
      "deg": 209,
      "gust": 3.58,
      "clouds": 53,
      "pop": 0.7,
      "rain": 2.51
    },
    {
      "dt": 1661943600,
      "sunrise": 1661920656,
      "sunset": 1661968542,
      "temp": {
        "day": 295.76,
        "min": 287.73,
        "max": 295.76,
        "night": 289.37,
        "eve": 292.76,
        "morn": 287.73
      },
      "feels_like": {
        "day": 295.64,
        "night": 289.45,
        "eve": 292.97,
        "morn": 287.59
      },
      "pressure": 1014,
      "humidity": 60,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "speed": 2.29,
      "deg": 215,
      "gust": 3.27,
      "clouds": 66,
      "pop": 0.82,
      "rain": 5.32
    },
    {
      "dt": 1662030000,
      "sunrise": 1662007126,
      "sunset": 1662054835,
      "temp": {
        "day": 293.38,
        "min": 287.06,
        "max": 293.38,
        "night": 287.06,
        "eve": 289.01,
        "morn": 287.84
      },
      "feels_like": {
        "day": 293.31,
        "night": 287.01,
        "eve": 289.05,
        "morn": 287.85
      },
      "pressure": 1014,
      "humidity": 71,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "speed": 2.67,
      "deg": 60,
      "gust": 2.66,
      "clouds": 97,
      "pop": 0.84,
      "rain": 4.49
    },
    ....
```

**JSON format API response fields**

- `city`
    - `city.id` City ID. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/forecast16#builtin)
    - `city.name` City name. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/forecast16#builtin)
    - `city.coord`
        - `city.coord.lat` Geo location, latitude
        - `city.coord.lon` Geo location, longitude
- `country` Country code (GB, JP etc.). Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/forecast16#builtin)
- `population` Internal parameter
- `timezone` Shift in seconds from UTC
- `cod` Internal parameter
- `message` Internal parameter
- `cnt` A number of days returned in the API response
- `list`
    - `list.dt` Time of data forecasted
    - `list.temp`
        - `list.temp.day` Temperature at 12:00 local time. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `list.temp.min` Min daily temperature. Please find more info [here.](https://openweathermap.org/forecast16#min) Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `list.temp.max` Max daily temperature. Please find more info [here.](https://openweathermap.org/forecast16#min) Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `list.temp.night` Temperature at 00:00 local time. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `list.temp.eve` Temperature at 18:00 local time. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `list.temp.morn` Ttemperature at 06:00 local time. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    - `list.feels_like`
        - `list.feels_like.day` Temperature at 12:00 local time.This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `list.feels_like.night` Temperature at 00:00 local time.This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `list.feels_like.eve` Temperature at 18:00 local time.This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `list.feels_like.morn` Temperature at 06:00 local time. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    - `list.pressure` Atmospheric pressure on the sea level, hPa
    - `list.humidity` Humidity, %
    - `list.weather` (more info [Weather condition codes](https://openweathermap.org/weather-conditions))
        - `list.weather.id` Weather condition id
        - `list.weather.main` Group of weather parameters (Rain, Snow, Clouds etc.)
        - `list.weather.description` Weather condition within the group. Please find more [here.](https://openweathermap.org/forecast16#list) You can get the output in your language. [Learn more](https://openweathermap.org/forecast16#multi)
        - `list.weather.icon` Weather icon id
    - `list.speed` Maximum wind speed for the day. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
    - `list.deg` Wind direction relevant to the maximum wind speed, degrees (meteorological)
    - `list.gust` Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
    - `list.clouds` Cloudiness, %
    - `list.rain` Precipitation volume, mm. Please note that only mm as units of measurement are available for this parameter
    - `list.snow` Snow volume, mm. Please note that only mm as units of measurement are available for this parameter
    - `list.pop` Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%

# **XML**

XML format API response example

```xml
		<weatherdata>
    <location>
    <name>Zocca</name>
    <type/>
    <country>IT</country>
    <timezone>7200</timezone>
    <location altitude="0" latitude="44.34" longitude="10.99" geobase="geonames" geobaseid="3163858"/>
    </location>
    <credit/>
    <meta>
    <lastupdate/>
    <calctime>0</calctime>
    <nextupdate/>
    </meta>
    <sun rise="2022-08-30T04:36:27" set="2022-08-30T17:57:28"/>
    <forecast>
    <time day="2022-08-30">
    <sun rise="2022-08-30T04:36:27" set="2022-08-30T17:57:28"/>
    <symbol number="500" name="light rain" var="10d"/>
    <precipitation probability="0.7" value="2.51" type="rain"/>
    <windDirection deg="209" code="SSW" name="South-southwest"/>
    <windSpeed mps="2.7" unit="m/s" name="Light breeze"/>
    <windGust gust="3.58" unit="m/s"/>
    <temperature day="299.65" min="288.93" max="299.65" night="290.31" eve="297.15" morn="288.93" unit="kelvin"/>
    <feels_like day="299.65" night="290.3" eve="297.09" morn="288.73" unit="kelvin"/>
    <pressure unit="hPa" value="1017"/>
    <humidity value="44" unit="%"/>
    <clouds value="broken clouds" all="53" unit="%"/>
    </time>
    <time day="2022-08-31">
    <sun rise="2022-08-31T04:37:36" set="2022-08-31T17:55:42"/>
    <symbol number="500" name="light rain" var="10d"/>
    <precipitation probability="0.82" value="5.32" type="rain"/>
    <windDirection deg="215" code="SW" name="Southwest"/>
    <windSpeed mps="2.29" unit="m/s" name="Light breeze"/>
    <windGust gust="3.27" unit="m/s"/>
    <temperature day="295.76" min="287.73" max="295.76" night="289.37" eve="292.76" morn="287.73" unit="kelvin"/>
    <feels_like day="295.64" night="289.45" eve="292.97" morn="287.59" unit="kelvin"/>
    <pressure unit="hPa" value="1014"/>
    <humidity value="60" unit="%"/>
    <clouds value="broken clouds" all="66" unit="%"/>
    </time>
    <time day="2022-09-01">
    <sun rise="2022-09-01T04:38:46" set="2022-09-01T17:53:55"/>
    <symbol number="500" name="light rain" var="10d"/>
    <precipitation probability="0.84" value="4.49" type="rain"/>
    <windDirection deg="60" code="ENE" name="East-northeast"/>
    <windSpeed mps="2.67" unit="m/s" name="Light breeze"/>
    <windGust gust="2.66" unit="m/s"/>
    <temperature day="293.38" min="287.06" max="293.38" night="287.06" eve="289.01" morn="287.84" unit="kelvin"/>
    <feels_like day="293.31" night="287.01" eve="289.05" morn="287.85" unit="kelvin"/>
    <pressure unit="hPa" value="1014"/>
    <humidity value="71" unit="%"/>
    <clouds value="overcast clouds" all="97" unit="%"/>
    </time>
    ...
    </time>
    </forecast>
    </weatherdata>
```

**XML format API response fields**

- `location`
    - `location.name` City name. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/forecast16#builtin)
    - `location.type` Prototype parameter
    - `location.country` Country code (GB, JP etc.). Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/forecast16#builtin)
    - `location.timezone` Shift in seconds from UTC
    - `location.location`
        - `location.location.altitude` Geo location, altitude above the sea level
        - `location.location.latitude` Geo location, latitude
        - `location.location.longitude` Geo location, longitude
        - `location.location.geobase` Internal parameter
        - `location.location.geobaseid` Internal parameter
- `meta`
    - `meta.lastupdate` Internal parameter
    - `meta.calctime` Speed of data calculation
    - `meta.nextupdate` Internal parameter
- `sun`
    - `sun.rise` Sunrise time
    - `sun.set` Sunset time
- `forecast`
    - `forecast.time`
        - `forecast.time.day` Date of weather data forecasted
    - `forecast.symbol`
        - `forecast.symbol.number` Weather condition id
        - `forecast.symbol.name` Weather condition
        - `forecast.symbol.var` Weather icon id
    - `forecast.precipitation`
        - `forecast.precipitation.value` Precipitation volume for the last day, mm. Please note that only mm as units of measurement are available for this parameter
        - `forecast.precipitation.type` Type of precipitation. Possible value is rain, snow
        - `forecast.precipitation.probability` Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
    - `forecast.windDirection`
        - `forecast.windDirection.deg` Wind direction relevant to the maximum wind speed, degrees (meteorological)
        - `forecast.windDirection.code` Code of the wind direction relevant to the maximum wind speed. Possible value is WSW, N, S etc.
        - `forecast.windDirection.name` Full name of the wind direction relevant to the maximum wind speed
    - `forecast.windSpeed`
        - `forecast.windSpeed.mps` Maximum wind speed for the day, meters per second
        - `forecast.windSpeed.unit` Maximum wind speed units, m/s
        - `forecast.windSpeed.name`Type of wind relevant to the maximum wind speed
    - `forecast.windGust`
        - `forecast.windGust.gust` Wind gust, meters per second
        - `forecast.windGust.unit` Wind gust units, m/s
    - `forecast.temperature`
        - `forecast.temperature.day` Temperature at 12:00 local time for forecasted day. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.temperature.min` Min daily temperature. Please find more info [here.](https://openweathermap.org/forecast16#min) Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.temperature.max` Max daily temperature. Please find more info [here.](https://openweathermap.org/forecast16#min) Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.temperature.night` Temperature at 00:00 local time for forecasted day. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.temperature.eve` Temperature at 18:00 local time for forecasted day. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.temperature.morn` Temperature at 06:00 local time for forecasted day. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.temperature.unit` Unit of measurements. Possible values are Celsius, Kelvin, Fahrenheit
    - `forecast.feels_like`
        - `forecast.feels_like.day` Temperature at 12:00 local time for forecasted day. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenhei.
        - `forecast.feels_like.night` Temperature at 00:00 local time for forecasted day. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.feels_like.eve` Temperature at 18:00 local time for forecasted day. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.feels_like.morn` Temperature at 06:00 local time for forecasted day. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        - `forecast.feels_like.unit` Unit of measurements. Possible values are Celsius, Kelvin, Fahrenheit. Unit Default: Kelvin
    - `forecast.pressure`
        - `forecast.pressure.unit` hPa
        - `forecast.pressure.value` Pressure value
    - `forecast.humidity`
        - `forecast.humidity.unit` %
        - `forecast.humidity.value` Humidity value
    - `forecast.clouds`
        - `forecast.pressure.value` Name of the cloudiness
        - `forecast.pressure.all` Cloudiness
        - `forecast.pressure.unit` %

We provide a broad variety of products such as [One Call API 3.0,](https://openweathermap.org/api/one-call-3) [Solar Irradiance & Energy Prediction service,](https://openweathermap.org/api#solar) [Road Risk API,](https://openweathermap.org/api/road-risk) [Air Pollution API](https://openweathermap.org/api/air-pollution) and solutions for advanced weather parameters like solar irradiance data, UVI, dew point, government weather alerts, etc. Please review our [product list](https://openweathermap.org/api) page and find more info in the product documentation and [pricing](https://openweathermap.org/price) pages.

# **List of condition codes**

List of [weather condition codes](https://openweathermap.org/weather-conditions) with icons (range of thunderstorm, drizzle, rain, snow, clouds, atmosphere etc.)

# **Min/max temperature in current weather API and forecast API**

Please do not confuse min/max parameters in our weather APIs.

- In **16 Day forecast** - **min** and **max** mean maximum and minimum temperature in the day.
- In [Current weather API](https://openweathermap.org/current), [Hourly forecast API](https://openweathermap.org/api/hourly-forecast) and [5 day / 3 hour forecast API](https://openweathermap.org/forecast5) - **temp_min** and **temp_max** are optional parameters mean min / max temperature in the city at the current moment to see deviation from current temp just for your reference. For large cities and megalopolises geographically expanded it might be applicable. In most cases both **temp_min** and **temp_max** parameters have the same volume as 'temp'. Please use **temp_min** and **temp_max** parameters in current weather API optionally.

```
Example of current weather API response
```

```json
"main":{
   "temp":306.15, //current temperature
   "pressure":1013,
   "humidity":44,
   "temp_min":306.15, //min current temperature in the city
   "temp_max":306.15 //max current temperature in the city
},
```

For comparison, take a look at the example of daily forecast weather API response:

```
Example of daily forecast weather API response
```

```json
"dt":1406080800,
"temp":{
   "day":297.77,  //daily averaged temperature
   "min":293.52, //daily min temperature
   "max":297.77, //daily max temperature
   "night":293.52, //night temperature
   "eve":297.77, //evening temperature
   "morn":297.77 //morning temperature
}
```

# **Bulk downloading**

We provide number of bulk files with current weather and forecasts. More information is on the [Bulk page](https://openweathermap.org/bulk).

Bulk downloading is available not for all accounts. To get more information please refer to the [Price page.](https://openweathermap.org/price)

**Examples of bulk files**

[http://bulk.openweathermap.org/sample/](http://bulk.openweathermap.org/sample/)

# **Other features**

# **Geocoding API**

Requesting API calls by geographical coordinates is the most accurate way to specify any location. If you need to convert city names and zip-codes to geo coordinates and the other way around automatically, please use our [**Geocoding API**](https://openweathermap.org/api/geocoding-api).

# **Built-in geocoding**

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

**Please note that [API requests by city name](https://openweathermap.org/forecast16#name16), [zip-codes](https://openweathermap.org/forecast16#zip16) and [city id](https://openweathermap.org/forecast16#cityid16) have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality.**

# **Built-in API request by city name**

You can search 16 day weather forecast with daily average parameters by city name. All weather data can be obtained in JSON and XML formats.

**API calls**

```
api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
```

```
api.openweathermap.org/data/2.5/forecast/daily?q={city name},{country code}&cnt={cnt}&appid={API key}
```

```
api.openweathermap.org/data/2.5/forecast/daily?q={city name},{state code},{country code}&cnt={cnt}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `q` | required | City name, state code and country code divided by comma, use ISO 3166 country codes. You can specify the parameter not only in English. In this case, the API response should be returned in the same language as the language of requested location name if the location is in our predefined list of more than 200,000 locations. |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `cnt` | optional | A number of days, which will be returned in the API response (from `1` to `16`). [Learn more](https://openweathermap.org/forecast16#limit) |
| `mode` | optional | Data format. Possible values are: `json`, `xml`. If the `mode` parameter is empty the format is JSON by default. [Learn more](https://openweathermap.org/forecast16#format) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/forecast16#data) |
| `lang` | optional | Language code. [Learn more](https://openweathermap.org/forecast16#multi) |

**Examples of API calls**

Call 7 days forecast by city name in metric units

```
api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&appid={API key}
```

Please note, that searching by states available only for the USA locations.

There is a possibility to receive a central district of the city/town with its own parameters (geographic coordinates/id/name) in API response. Please see the example below

Call 16 days forecast by geographic coordinates

```
api.openweathermap.org/data/2.5/forecast/daily?q=München,DE&appid={API key}
```

# **Built-in API request by city ID**

You can seach 16 day weather forecast with daily average parameters by city ID. All weather data can be obtained in JSON and XML format.

List of city ID 'city.list.json.gz' can be downloaded [here.](http://bulk.openweathermap.org/sample/)

We recommend to call API by city ID to get unambiguous result for your city.

**API call**

```
api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `id` | required | city ID |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `cnt` | optional | A number of days, which will be returned in the API response (from `1` to `16`). [Learn more](https://openweathermap.org/forecast16#limit) |
| `mode` | optional | Data format. Possible values are: `json`, `xml`. If the `mode` parameter is empty the format is JSON by default. [Learn more](https://openweathermap.org/forecast16#format) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/forecast16#data) |
| `lang` | optional | Language code. [Learn more](https://openweathermap.org/forecast16#multi) |

**Example of API call**

```
api.openweathermap.org/data/2.5/forecast/daily?id=524901&appid={API key}
```

# **Built-in API request by ZIP code**

Please note if country is not specified then the search works for USA as a default.

**API call**

```
api.openweathermap.org/data/2.5/forecast/daily?zip={zip code},{country code}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `zip` | required | Zip code |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `cnt` | optional | A number of days, which will be returned in the API response (from `1` to `16`). [Learn more](https://openweathermap.org/forecast16#limit) |
| `mode` | optional | Data format. Possible values are: `json`, `xml`. If the `mode` parameter is empty the format is JSON by default. [Learn more](https://openweathermap.org/forecast16#format) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/forecast16#data) |
| `lang` | optional | Language code. [Learn more](https://openweathermap.org/forecast16#multi) |

**Example of API call**

```
api.openweathermap.org/data/2.5/forecast/daily?zip=94040,us&appid={API key}
```

# **Format**

Data format. JSON format is used by default. To get data in XML format use `mode=xml`.

| **Parameters** |  |  |
| --- | --- | --- |
| `mode` | optional | Data format. Possible values are: `json`, `xml`. If the `mode` parameter is empty the format is JSON by default. |

**Examples of API calls**

JSON

```
api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
```

XML

```
api.openweathermap.org/data/2.5/weather?q=London&mode=xml
```

# **Limitation of result**

To limit the number of returned days please use `cnt` parameter.

| **Parameters** |  |  |
| --- | --- | --- |
| `cnt` |  | A number of days, which will be returned in the API response |

**Example of API call**

```
http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=3&appid={API key}
```

# **Units of measurement**

`standard`, `metric`, and `imperial` units are available. [List of all API parameters with available units](https://openweathermap.org/weather-data).

| **Parameters** |  |  |
| --- | --- | --- |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. |

Temperature is available in Fahrenheit, Celsius and Kelvin units.

Maximum wind speed is available in miles/hour and meter/sec.

- For temperature in Fahrenheit and maximum wind speed in miles/hour, use `units=imperial`
- For temperature in Celsius and maximum wind speed in meter/sec, use `units=metric`
- Temperature in Kelvin and maximum wind speed in meter/sec is used by default, so there is no need to use the units parameter in the API call if you want this

**Examples of API calls:**

Standard

```
https://api.openweathermap.org/data/2.5/forecast/daily?lat=57&lon=-2.15&appid={API key}
```

metric

```
https://api.openweathermap.org/data/2.5/forecast/daily?lat=57&lon=-2.15&appid={API key}&units=metric
```

imperial

```
https://api.openweathermap.org/data/2.5/forecast/daily?lat=57&lon=-2.15&appid={API key}&units=imperial
```

# **Multilingual support**

You can use `lang` parameter to get the output in your language.

Translation is applied for the `city name` and `description` fields.

**API call**

```
https://api.openweathermap.org/data/2.5/forecast/daily?id=524901&lang={lang}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lang` | optional | Language code |

**Example of API call**

```
https://api.openweathermap.org/data/2.5/forecast/daily?id=524901&lang=zh_cn&appid={API key}
```

We support the following languages that you can use with the corresponded lang values:

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

# **Call back function for JavaScript code**

To use JavaScript code you can transfer `callback` functionName to JSONP callback.

**Example of API call**

`api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid=[{API key}](https://home.openweathermap.org/api_keys)`