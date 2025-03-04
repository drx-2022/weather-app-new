# Current weather data

# **Product concept**

Access current weather data for any location on Earth! We collect and process weather data from different sources such as global and local weather models, satellites, radars and a vast network of weather stations. Data is available in JSON, XML, or HTML format.

# **Call current weather data**

# **How to make an API call**

**API call**

```
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat` | required | Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `lon` | required | Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `mode` | optional | Response format. Possible values are `xml` and `html`. If you don't use the `mode` parameter format is JSON by default. [Learn more](https://openweathermap.org/current#format) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default.[Learn more](https://openweathermap.org/current#data) |
| `lang` | optional | You can use this parameter to get the output in your language. [Learn more](https://openweathermap.org/current#multi) |

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that [built-in geocoder](https://openweathermap.org/current#geocoding) has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

**Examples of API calls**

```
https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
```

# **API response**

If you do not see some of the parameters in your API response it means that these weather phenomena are just not happened for the time of measurement for the city or location chosen. Only really measured or calculated data is displayed in API response.

# **JSON**

```
JSON format API response example
```

```json
                          
{
   "coord": {
      "lon": 7.367,
      "lat": 45.133
   },
   "weather": [
      {
         "id": 501,
         "main": "Rain",
         "description": "moderate rain",
         "icon": "10d"
      }
   ],
   "base": "stations",
   "main": {
      "temp": 284.2,
      "feels_like": 282.93,
      "temp_min": 283.06,
      "temp_max": 286.82,
      "pressure": 1021,
      "humidity": 60,
      "sea_level": 1021,
      "grnd_level": 910
   },
   "visibility": 10000,
   "wind": {
      "speed": 4.09,
      "deg": 121,
      "gust": 3.47
   },
   "rain": {
      "1h": 2.73
   },
   "clouds": {
      "all": 83
   },
   "dt": 1726660758,
   "sys": {
      "type": 1,
      "id": 6736,
      "country": "IT",
      "sunrise": 1726636384,
      "sunset": 1726680975
   },
   "timezone": 7200,
   "id": 3165523,
   "name": "Province of Turin",
   "cod": 200
}
```

**JSON format API response fields**

- `coord`
    - `coord.lon` Longitude of the location
    - `coord.lat` Latitude of the location
- `weather` (more info [Weather condition codes](https://openweathermap.org/weather-conditions))
    - `weather.id` Weather condition id
    - `weather.main` Group of weather parameters (Rain, Snow, Clouds etc.)
    - `weather.description` Weather condition within the group. Please find more [here.](https://openweathermap.org/current#list) You can get the output in your language. [Learn more](https://openweathermap.org/current#multi)
    - `weather.icon` Weather icon id
- `base` Internal parameter
- `main`
    - `main.temp` Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    - `main.feels_like` Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    - `main.pressure` Atmospheric pressure on the sea level, hPa
    - `main.humidity` Humidity, %
    - `main.temp_min` Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Please find more info [here.](https://openweathermap.org/current#min) Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    - `main.temp_max` Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Please find more info [here.](https://openweathermap.org/current#min) Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    - `main.sea_level` Atmospheric pressure on the sea level, hPa
    - `main.grnd_level` Atmospheric pressure on the ground level, hPa
- `visibility` Visibility, meter. The maximum value of the visibility is 10 km
- `wind`
    - `wind.speed` Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
    - `wind.deg` Wind direction, degrees (meteorological)
    - `wind.gust` Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
- `clouds`
    - `clouds.all` Cloudiness, %
- `rain`
    - `1h`(where available)Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
- `snow`
    - `1h`(where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
- `dt` Time of data calculation, unix, UTC
- `sys`
    - `sys.type` Internal parameter
    - `sys.id` Internal parameter
    - `sys.message` Internal parameter
    - `sys.country` Country code (GB, JP etc.)
    - `sys.sunrise` Sunrise time, unix, UTC
    - `sys.sunset` Sunset time, unix, UTC
- `timezone` Shift in seconds from UTC
- `id` City ID. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/current#builtin)
- `name` City name. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/current#builtin)
- `cod` Internal parameter

# **XML**

```
XML format API response example
```

```xml
                          <current>
    <city id="3163858" name="Zocca">
    <coord lon="10.99" lat="44.34"/>
    <country>IT</country>
    <timezone>7200</timezone>
    <sun rise="2022-08-30T04:36:27" set="2022-08-30T17:57:28"/>
    </city>
    <temperature value="298.48" min="297.56" max="300.05" unit="kelvin"/>
    <feels_like value="298.74" unit="kelvin"/>
    <humidity value="64" unit="%"/>
    <pressure value="1015" unit="hPa"/>
    <wind>
    <speed value="0.62" unit="m/s" name="Calm"/>
    <gusts value="1.18"/>
    <direction value="349" code="N" name="North"/>
    </wind>
    <clouds value="100" name="overcast clouds"/>
    <visibility value="10000"/>
    <precipitation value="3.37" mode="rain" unit="1h"/>
    <weather number="501" value="moderate rain" icon="10d"/>
    <lastupdate value="2022-08-30T14:45:57"/>
    </current>
```

**XML format API response fields**

- `city`
    - `city.id` City ID. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/current#builtin)
    - `city.name` City name. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/current#builtin)
    - `city.coord`
        - `city.coord.lon`Geo location, longitude
        - `city.coord.lat` Geo location, latitude
    - `city.country` Country code (GB, JP etc.). Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/current#builtin)
    - `timezone`Shift in seconds from UTC
    - `city.sun`
        - `city.sun.rise` Sunrise time
        - `city.sun.set` Sunset time
- `temperature`
    - `temperature.value` Temperature
    - `temperature.min` Minimum temperature at the moment of calculation. This is minimal currently observed temperature (within large megalopolises and urban areas), use this parameter optionally. Please find more info [here](https://openweathermap.org/current#min)
    - `temperature.max` Maximum temperature at the moment of calculation. This is maximal currently observed temperature (within large megalopolises and urban areas), use this parameter optionally. Please find more info [here](https://openweathermap.org/current#min)
    - `temperature.unit` Unit of measurements. Possible value is Celsius, Kelvin, Fahrenheit
- `feels_like`
    - `feels_like.value` Temperature. This temperature parameter accounts for the human perception of weather
    - `feels_like.unit` Unit of measurements. Possible value is Celsius, Kelvin, Fahrenheit. Unit Default: Kelvin
- `humidity`
    - `humidity.value` Humidity value
    - `humidity.unit` Humidity units, %
- `pressure`
    - `pressure.value` Pressure value
    - `pressure.unit` Pressure units, hPa
- `wind`
    - `wind.speed`
        - `wind.speed.value` Wind speed
        - `wind.speed.unit` Wind speed units, m/s
        - `wind.speed.name` Type of the wind
    - `wind.direction`
        - `wind.direction.value` Wind direction, degrees (meteorological)
        - `wind.direction.code` Code of the wind direction. Possible value is WSW, N, S etc.
        - `wind.direction.name` Full name of the wind direction
- `clouds`
    - `clouds.value` Cloudiness
    - `clouds.name` Name of the cloudiness
- `visibility`
    - `visibility.value` Visibility, meter. The maximum value of the visibility is 10 km
- `precipitation`
    - `precipitation.value` Precipitation, mm. Please note that only mm as units of measurement are available for this parameter.
    - `precipitation.mode` Possible values are 'no", name of weather phenomena as 'rain', 'snow'
- `weather`
    - `weather.number` Weather condition id
    - `weather.value` Weather condition name
    - `weather.icon` Weather icon id
- `lastupdate`
    - `lastupdate.value` Last time when data was updated

We provide a broad variety of products such as [One Call API 3.0,](https://openweathermap.org/api/one-call-3) [Solar Irradiance & Energy Prediction service,](https://openweathermap.org/api#solar) [Road Risk API,](https://openweathermap.org/api/road-risk) [Air Pollution API](https://openweathermap.org/api/air-pollution) and solutions for advanced weather parameters like solar irradiance data, UVI, dew point, government weather alerts, etc. Please review our [product list](https://openweathermap.org/api) page and find more info in the product documentation and [pricing](https://openweathermap.org/price) pages.

# **List of weather condition codes**

List of [weather condition codes](https://openweathermap.org/weather-conditions) with icons (range of thunderstorm, drizzle, rain, snow, clouds, atmosphere etc.)

# **Min/max temperature in current weather API and forecast API**

Please do not confuse min/max parameters in our weather APIs.

- In **Current weather API**, [Hourly forecast API](https://openweathermap.org/api/hourly-forecast) and [5 day / 3 hour forecast API](https://openweathermap.org/forecast5) - **temp_min** and **temp_max** are optional parameters mean min / max temperature in the city at the current moment just for your reference. For large cities and megalopolises geographically expanded it might be applicable. In most cases both **temp_min** and **temp_max** parameters have the same volume as 'temp'. Please use **temp_min** and **temp_max** parameters in current weather API optionally.
- In [16 Day forecast](https://openweathermap.org/forecast16) - **min** and **max** mean maximum and minimum temperature in the day.

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
   }
```

### **For comparison look at example of daily forecast weather API response:**

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
        "morn":297.77}, //morning temperature
```

# **Bulk downloading**

We provide number of bulk files with current weather and forecasts. The service allows you to regularly download current weather and forecast data in JSON format. There is no need to call an API to do this.

More information is on the [Bulk page](https://openweathermap.org/bulk).

**Examples of bulk files**

[http://bulk.openweathermap.org/sample/](http://bulk.openweathermap.org/sample/)

# **Other features**

# **Geocoding API**

Requesting API calls by geographical coordinates is the most accurate way to specify any location. If you need to convert city names and zip-codes to geo coordinates and the other way around automatically, please use our [**Geocoding API**](https://openweathermap.org/api/geocoding-api).

# **Built-in geocoding**

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

**Please note that [API requests by city name](https://openweathermap.org/current#name), [zip-codes](https://openweathermap.org/current#zip) and [city id](https://openweathermap.org/current#cityid) have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality.**

### **Built-in API request by city name**

You can call by city name or city name, state code and country code. Please note that searching by states available only for the USA locations.

**API call**

```
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```

```
https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
```

```
https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `q` | required | City name, state code and country code divided by comma, Please refer to [ISO 3166](https://www.iso.org/obp/ui/#search) for the state codes or country codes.
You can specify the parameter not only in English. In this case, the API response should be returned in the same language as the language of requested location name if the location is in our predefined list of more than 200,000 locations. |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `mode` | optional | Response format. Possible values are `xml` and `html`. If you don't use the `mode` parameter format is JSON by default. [Learn more](https://openweathermap.org/current#format) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/current#data) |
| `lang` | optional | You can use this parameter to get the output in your language. [Learn more](https://openweathermap.org/current#multi) |

**Examples of API calls:**

```
https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
```

```
https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
```

There is a possibility to receive a central district of the city/town with its own parameters (geographic coordinates/id/name) in API response. [Example](http://samples.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=439d4b804bc8187953eb36d2a8c26a02)

### **Built-in API request by city ID**

You can make an API call by city ID. List of city ID 'city.list.json.gz' can be downloaded [here](http://bulk.openweathermap.org/sample/).

We recommend to call API by city ID to get unambiguous result for your city.

**API call**

```
https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `id` | required | City ID. List of city ID 'city.list.json.gz' can be downloaded [here](http://bulk.openweathermap.org/sample/). |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `mode` | optional | Response format. Possible values are `xml` and `html`. If you don't use the `mode` parameter format is JSON by default. [Learn more](https://openweathermap.org/current#format) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/current#data) |
| `lang` | optional | You can use this parameter to get the output in your language. [Learn more](https://openweathermap.org/current#multi) |

**Examples of API calls**

```
https://api.openweathermap.org/data/2.5/weather?id=2172797&appid={API key}
```

### **Built-in API request by ZIP code**

Please note if country is not specified then the search works for USA as a default.

**API call**

```
https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `zip` | required | Zip code |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `mode` | optional | Response format. Possible values are `xml` and `html`. If you don't use the `mode` parameter format is JSON by default. [Learn more](https://openweathermap.org/current#format) |
| `units` | optional | Units of measurement. `standard`, `metric` and `imperial` units are available. If you do not use the `units` parameter, `standard` units will be applied by default. [Learn more](https://openweathermap.org/current#data) |
| `lang` | optional | You can use this parameter to get the output in your language. [Learn more](https://openweathermap.org/current#multi) |

**Examples of API calls**

```
https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
```

# **Format**

Response format. JSON format is used by default. To get data in XML format just set up mode = xml.

| **Parameters** |  |  |
| --- | --- | --- |
| `mode` | optional | Response format. Possible values are `xml` and `html`. If you don't use the `mode` parameter format is JSON by default. |

**Example of API calls**

JSON

```
https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
```

XML

```
https://api.openweathermap.org/data/2.5/weather?q=London&mode=xml
```

# **Units of measurement**

`standard`, `metric`, and `imperial` units are available. [List of all API parameters with available units](https://openweathermap.org/weather-data).

| **Parameters** |  |  |
| --- | --- | --- |
| `units` | optional | `standard`, `metric`, `imperial`. When you do not use the `units` parameter, format is `standard` by default. |

Temperature is available in Fahrenheit, Celsius and Kelvin units.

- For temperature in Fahrenheit use units=imperial
- For temperature in Celsius use units=metric
- Temperature in Kelvin is used by default, no need to use units parameter in API call

List of all API parameters with units [openweathermap.org/weather-data](http://openweathermap.org/weather-data)

**Examples of API calls:**

Standard

```
https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}
```

metric

```
https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric
```

imperial

```
https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=imperial
```

# **Multilingual support**

You can use the `lang` parameter to get the output in your language.

Translation is applied for the `city name` and `description` fields.

**API call**

```
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang={lang}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lang` | optional | Language code |

**Examples of API calls**

```
https://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid={API key}
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

```
https://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid={API key}
```