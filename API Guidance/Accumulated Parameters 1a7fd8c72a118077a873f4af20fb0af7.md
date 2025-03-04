# Accumulated Parameters

The Accumulated Parameters include accumulated temperature and accumulated precipitation.

- Accumulated temperature is the sum, counted in degrees, by which the actual air temperature rises above or falls below a threshold level during the chosen time period.
- Accumulated precipitation is the sum, counted in millimeters, of daily precipitation during the chosen time period.

# **Accumulated temperature**

# **How to make an API call**

**API call**

```
http://history.openweathermap.org/data/2.5/history/accumulated_temperature?lat={lat}&lon={lon}&start={start}&end={end}&threshold={threshold}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat, lon` | required | Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api). |
| `start` | required | Start date (unix time, UTC time zone), e.g. start=1586853378 |
| `end` | required | End date (unix time, UTC time zone), e.g. end=1589445367 |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |
| `threshold` | optional | All values smaller than indicated value are not taken into account |

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that [built-in geocoder](https://openweathermap.org/api/accumulated-parameters#geocoding) has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

**Example of API call**

```
http://history.openweathermap.org/data/2.5/history/accumulated_temperature?lat=51.51&lon=-0.13&start=1586853378&end=1589445367&threshold=284&appid={API key}
```

# **Example of API response**

`{
  "date": "2020-4-17",
  "temp": 574.37,
  "count": 2
},`

**Fields in API response**

- `date` Date
- `temp` Temperature accumulated indicator, Kelvin
- `count` Number of data measurements

# **Accumulated precipitation**

# **How to make an API call**

**API call**

```
http://history.openweathermap.org/data/2.5/history/accumulated_precipitation?lat={lat}&lon={lon}&start={start}&end={end}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat, lon` | required | Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api). |
| `start` | required | Start date (unix time, UTC time zone), e.g. start=1586853378 |
| `end` | required | End date (unix time, UTC time zone), e.g. end=1589445367 |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that [built-in geocoder](https://openweathermap.org/api/accumulated-parameters#geocoding) has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

**Example of API call**

```
http://history.openweathermap.org/data/2.5/history/accumulated_precipitation?lat=51.51&lon=-0.12&start=1586853378&end=1589445367&appid={API key}
```

# **Example of API response**

`{
  "date": "2020-4-15",
  "rain": 0.6,
  "count": 2
},`

**Fields in API response**

- `date` Date
- `rain` Precipitation accumulation indicator, mm
- `count` Number of data measurements

The threshold parameter is not used. The whole ammount of precipitation data is provided for specified period.

# **Other features**

# **Geocoding API**

Requesting API calls by geographical coordinates is the most accurate way to specify any location. If you need to convert city names and zip-codes to geo coordinates and the other way around automatically, please use our [**Geocoding API**](https://openweathermap.org/api/geocoding-api).

# **Built-in geocoding**

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

**Please note that [API requests by city name](https://openweathermap.org/api/accumulated-parameters#name) and [city id](https://openweathermap.org/api/accumulated-parameters#cityid) have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality.**

### **Built-in API request by city name**

Please use the parameter `q` instead of the parameters `lat,lon` to specify the city name in the API requests.

| **Parameters** |  |  |
| --- | --- | --- |
| `q` | required | City name, state code and country code divided by comma, please refer to [ISO 3166](https://www.iso.org/obp/ui/) for the state codes or country codes.
You can specify the parameter not only in English. In this case, the API response should be returned in the same language as the language of requested location name if the location is in our predefined list of more than 200,000 locations. |

**Example of API calls**

Accumulated temperature

```
http://history.openweathermap.org/data/2.5/history/accumulated_temperature?q=London,GB&start=1586853378&end=1589445367&threshold=284&appid={API key}
```

Accumulated precipitation

```
http://history.openweathermap.org/data/2.5/history/accumulated_precipitation?q=London,GB&start=1586853378&end=1589445367&appid={API key}
```

### **Built-in API request by city id**

Please use the parameter `id` instead of the parameters `lat,lon` to specify the city id in the API requests.

| **Parameters** |  |  |
| --- | --- | --- |
| `id` | required | City ID. The list of city IDs 'city.list.json.gz' can be downloaded [here](http://bulk.openweathermap.org/sample/). |

**Example of API calls**

Accumulated temperature

```
http://history.openweathermap.org/data/2.5/history/accumulated_temperature?id=2885679&start=1586853378&end=1589445367&threshold=284&appid={API key}
```

Accumulated precipitation

```
http://history.openweathermap.org/data/2.5/history/accumulated_precipitation?id=2885679&start=1586853378&end=1589445367&appid={API key}
```