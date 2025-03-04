# Statistical Weather Data API

Statistical Weather Data API allows you to get statistical data by main weather parameters for a chosen date or month of the year, or for the entire year.

This product is useful for analysis of climate indicators and statistical approach to weather forecasting. Statistical Weather Data API is calculated based on our [Historical weather data](https://openweathermap.org/history).

In this product, you will be able to request basic statistical data for the following weather characteristics:

- Temperature
- Pressure
- Humidity
- Wind
- Precipitation
- Clouds

All weather data can be obtained only in JSON format. The frequency of data update is 1 hour.

Please note that Statistical API **doesn't return real historical data**, but statistically calculated data based on real historical data for a specific period of time.

# **Yearly aggregation**

By using this API, you will be able to receive statistical data for all 365 days of the entire year in one single API response. To get aggregated data only for a specific month or for a specific day, use the methods of [Monthly](https://openweathermap.org/api/statistics-api#month) or [Daily Aggregation](https://openweathermap.org/api/statistics-api#day).

# **How to make an API call**

**API call**

```
history.openweathermap.org/data/2.5/aggregated/year?lat={lat}&lon={lon}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat, lon` | required | Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api). |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that [built-in geocoder](https://openweathermap.org/api/statistics-api#geocoding) has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

**Example of API call**

```
https://history.openweathermap.org/data/2.5/aggregated/year?lat=35&lon=139&appid={API key}
```

# **Response of Yearly aggregation**

The response of API contains 365 groups of statistical data for each day of the entire calendar year.

Example of API response
`{
"cod":200,
"city_id":5400075,
"calctime":3.105838634,
"result":[
   {
      "month": 1,
      "day": 1,
      "temp":{
         "record_min":274.44,
         "record_max":290.45,
         "average_min":276.79,
         "average_max":286.5,
         "median":281.26,
         "mean":281.29,
         "p25":278.57,
         "p75":283.83,
         "st_dev":3.69,
         "num":136
      },
      "pressure":{
         "min":1014,
         "max":1026,
         "median":1021,
         "mean":1020.5,
         "p25":1019,
         "p75":1023,
         "st_dev":3.25,
         "num":135
      },
      "humidity":{
         "min":23,
         "max":100,
         "median":70,
         "mean":65.88,
         "p25":47,
         "p75":82,
         "st_dev":20.63,
         "num":133
      },
      "wind":{
         "min":0,
         "max":10,
         "median":1,
         "mean":2.36,
         "p25":1,
         "p75":3,
         "st_dev":2.3,
         "num":136
      },
      "precipitation":{
         "min":0,
         "max":0.3,
         "median":0,
         "mean":0.01,
         "p25":0,
         "p75":0,
         "st_dev":0.04,
         "num":136
      },
      "clouds":{
         "min":0,
         "max":90,
         "median":1,
         "mean":20.18,
         "p25":1,
         "p75":40,
         "st_dev":31.91,
         "num":136
      }
   },
   .....
]
}`

**Parameters**

- `code`Internal parameter
- `city_id`City ID. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/api/statistics-api#builtin).
- `calctime`Internal parameter
- `result`
    - `month` Month of the year
    - `day`Day of the month
    - `temp`
        - `record_min`Absolute temperature minimum based on all historical measurements for this day, Kelvin.
        - `record_max`Absolute temperature maximum based on all historical measurements for this day, Kelvin.
        - `average_min`Average of all minimum temperature values for this day, Kelvin.
        - `average_max`Average of all maximum temperature values for this day, Kelvin.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the temperature, Kelvin.
        - `mean`Average of all temperature measurements for this day, Kelvin.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the temperature, Kelvin.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the temperature, Kelvin.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the temperature, Kelvin.
        - `num`Number of measurements.
    - `pressure`
        - `min`Absolute pressure minimum based on all historical measurements for this day, hPa.
        - `max`Absolute pressure maximum based on all historical measurements for this day, hPa.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the pressure, hPa.
        - `mean`Average of all pressure measurements for this day, hPa.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the pressure, hPa.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the pressure, hPa.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the pressure, hPa.
        - `num`Number of measurements.
    - `humidity`
        - `min`Absolute humidity minimum based on all historical measurements for this day, %.
        - `max`Absolute humidity maximum based on all historical measurements for this day, %.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the humidity, %.
        - `mean`Average of all humidity measurements for this day, %.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the humidity, %.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the humidity, %.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the humidity, %.
        - `num`Number of measurements.
    - `wind`
        - `min`Absolute wind speed minimum based on all historical measurements for this day, meter/sec.
        - `max`Absolute wind speed maximum based on all historical measurements for this day, meter/sec.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the wind speed, meter/sec.
        - `mean`Average of all wind speed measurements for this day, meter/sec.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the wind speed, meter/sec.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the wind speed, meter/sec.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the wind speed, meter/sec.
        - `num`Number of measurements.
    - `precipitation`
        - `min`Absolute precipitation volume minimum based on all historical measurements for this day, mm.
        - `max`Absolute precipitation volume maximum based on all historical measurements for this day, mm.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the precipitation volume, mm.
        - `mean`Average of all precipitation volume measurements for this day, mm.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the precipitation volume, mm.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the precipitation volume, mm.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the precipitation volume, mm.
        - `num`Number of measurements.

# **Monthly aggregation**

By using this API, you will be able to request statistical monthly weather data for any month of the entire year in a single API response. If you like to receive aggregated data only for one specific day, please use the [Daily Aggregation](https://openweathermap.org/api/statistics-api#day) approach described below.

# **How to make an API call**

**API call**

```
history.openweathermap.org/data/2.5/aggregated/month?lat={lat}&lon={lon}&month={number of the month}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat, lon` | required | Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api). |
| `month` | required | A number of the month in the year. Available values: `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`. |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that [built-in geocoder](https://openweathermap.org/api/statistics-api#geocoding) has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

**Example of API call**

```
https://history.openweathermap.org/data/2.5/aggregated/month?month=2&lat=35&lon=139&appid={API key}
```

# **Response of Monthly aggregation**

The Response of API contains 1 group of statistical data for selected month.

**Example of API response**

Example of API response
`{
"cod":200,
"city_id":5400075,
"calctime":0.417010027,
"result":{
   "month": 2,
   "temp":{
      "record_min":269.85,
      "record_max":296.05,
      "average_min":274.17,
      "average_max":291.97,
      "median":283.71,
      "mean":283.69,
      "p25":281.05,
      "p75":286.18,
      "st_dev":3.98,
      "num":3953
   },
   "pressure":{
      "min":988,
      "max":1036,
      "median":1020,
      "mean":1019.34,
      "p25":1016,
      "p75":1024,
      "st_dev":6.94,
      "num":3942
   },
   "humidity":{
      "min":17,
      "max":100,
      "median":81,
      "mean":77.38,
      "p25":67,
      "p75":89,
      "st_dev":16.33,
      "num":3669
   },
   "wind":{
      "min":0,
      "max":17,
      "median":1,
      "mean":2.06,
      "p25":1,
      "p75":3,
      "st_dev":1.96,
      "num":3953
   },
   "precipitation":{
      "min":0,
      "max":3,
      "median":0,
      "mean":0.16,
      "p25":0,
      "p75":0,
      "st_dev":0.46,
      "num":3953
   },
   "clouds":{
      "min":0,
      "max":90,
      "median":12,
      "mean":37.4,
      "p25":1,
      "p75":90,
      "st_dev":39.94,
      "num":3953
   },
   "sunshine_hours":102.17
}
}`

**Parameters**

- `code`Internal parameter
- `city_id`City ID. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/api/statistics-api#builtin).
- `calctime`Internal parameter
- `result`
    - `month`Month of the year
    - `temp`
        - `record_min`Absolute temperature minimum based on all historical measurements for this month, Kelvin.
        - `record_max`Absolute temperature maximum based on all historical measurements for this month, Kelvin.
        - `average_min`Average of all minimum temperature values for this month, Kelvin.
        - `average_max`Average of all maximum temperature values for this month, Kelvin.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the tempreture, Kelvin.
        - `mean`Average of all temperature measurements for this month, Kelvin.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the temperature, Kelvin.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the temperature, Kelvin.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the temperature, Kelvin.
        - `num`Number of measurements.
    - `pressure`
        - `min`Absolute pressure minimum based on all historical measurements for this month, hPa.
        - `max`Absolute pressure maximum based on all historical measurements for this month, hPa.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the pressure, hPa.
        - `mean`Average of all pressure measurements for this month, hPa.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the pressure, hPa.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the pressure, hPa.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the pressure, hPa.
        - `num`Number of measurements.
    - `humidity`
        - `min`Absolute humidity minimum based on all historical measurements for this month, %.
        - `max`Absolute humidity maximum based on all historical measurements for this month, %.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the humidity, %.
        - `mean`Average of all humidity measurements for this month, %.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the humidity, %.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the humidity, %.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the humidity, %.
        - `num`Number of measurements.
    - `wind`
        - `min`Absolute wind speed minimum based on all historical measurements for this month, meter/sec.
        - `max`Absolute wind speed maximum based on all historical measurements for this month, meter/sec.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the wind speed, meter/sec.
        - `mean`Average of all wind speed measurements for this month, meter/sec.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the wind speed, meter/sec.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the wind speed, meter/sec.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the wind speed, meter/sec.
        - `num`Number of measurements.
    - `precipitation`
        - `min`Absolute precipitation volume minimum based on all historical measurements for this month, mm.
        - `max`Absolute precipitation volume maximum based on all historical measurements for this month, mm.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the precipitation volume, mm.
        - `mean`Average of all precipitation volume measurements for this month, mm.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the precipitation volume, mm.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the precipitation volume, mm.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the precipitation volume, mm.
        - `num`Number of measurements.
    - `sunshine_hours`The number of sunny hours in the selected month.

# **Daily aggregation**

Using this API method, you will receive in one API response statistical data for any day during the entire calendar year. To get aggregated data only for a specific month, use methods of [Month Aggregation](https://openweathermap.org/api/statistics-api#month).

# **How to make an API call**

**API call**

```
history.openweathermap.org/data/2.5/aggregated/day?lat={lat}&lon={lon}&month={number of the month}&day={number of the day}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat, lon` | required | Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api). |
| `month` | required | A number of the month in the year. Available values: `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`. |
| `day` | required | A number of the day in month. Available values: `1` - `31` |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that [built-in geocoder](https://openweathermap.org/api/statistics-api#geocoding) has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

**Example of API call**

```
https://history.openweathermap.org/data/2.5/aggregated/day?lat=35&lon=139&month=2&day=2&appid={API key}
```

# **Response of Daily aggregation**

The response of API contains 1 group of statistical data for selected day.

**Example of API response**

Example of API response
`{
"cod":200,
"city_id":5400075,
"calctime":0.022604633,
"result":{
   "month":1,
   "day":1,
   "temp":{
      "record_min":275.9,
      "record_max":291.14,
      "average_min":283.27,
      "average_max":289.06,
      "median":285.41,
      "mean":285.17,
      "p25":283.52,
      "p75":287.59,
      "st_dev":3.32,
      "num":124
   },
   "pressure":{
      "min":1014,
      "max":1027,
      "median":1019,
      "mean":1019.02,
      "p25":1017,
      "p75":1020,
      "st_dev":2.65,
      "num":124
   },
   "humidity":{
      "min":32,
      "max":100,
      "median":81,
      "mean":80.51,
      "p25":76,
      "p75":87,
      "st_dev":11.05,
      "num":111
   },
   "wind":{
      "min":0,
      "max":8,
      "median":2,
      "mean":2.14,
      "p25":1,
      "p75":3,
      "st_dev":1.69,
      "num":124
   },
   "precipitation":{
      "min":0,
      "max":0.9,
      "median":0,
      "mean":0.09,
      "p25":0,
      "p75":0,
      "st_dev":0.2,
      "num":124
   },
   "clouds":{
      "min":1,
      "max":90,
      "median":90,
      "mean":68.52,
      "p25":75,
      "p75":90,
      "st_dev":31.45,
      "num":124
   }
}
}`

**Fields in API response**

- `code`Internal parameter
- `city_id`City ID. Please note that built-in geocoder functionality has been deprecated. Learn more [here](https://openweathermap.org/api/statistics-api#builtin).
- `calctime`Internal parameter
- `result`
    - `month` Month of the year
    - `day` Day of the month
    - `temp`
        - `record_min`Absolute temperature minimum based on all historical measurements for this day, Kelvin.
        - `record_max`Absolute temperature maximum based on all historical measurements for this day, Kelvin.
        - `average_min`Average of all minimum temperature values for this day, Kelvin.
        - `average_max`Average of all maximum temperature values for this day, Kelvin.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the tempreture, Kelvin.
        - `mean`Average of all temperature measurements for this day, Kelvin.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the tempreture, Kelvin.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the tempreture, Kelvin.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the tempreture, Kelvin.
        - `num`Number of measurements.
    - `pressure`
        - `min`Absolute pressure minimum based on all historical measurements for this day, hPa.
        - `max`Absolute pressure maximum based on all historical measurements for this day, hPa.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the pressure, hPa.
        - `mean`Average of all pressure measurements for this day, hPa.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the pressure, hPa.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the pressure, hPa.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the pressure, hPa.
        - `num`Number of measurements.
    - `humidity`
        - `min`Absolute humidity minimum based on all historical measurements for this day, %.
        - `max`Absolute humidity maximum based on all historical measurements for this day, %.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the humidity, %.
        - `mean`Average of all humidity measurements for this day, %.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the humidity, %.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the humidity, %.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the humidity, %.
        - `num`Number of measurements.
    - `wind`
        - `min`Absolute wind speed minimum based on all historical measurements for this day, meter/sec.
        - `max`Absolute wind speed maximum based on all historical measurements for this day, meter/sec.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the wind speed, meter/sec.
        - `mean`Average of all wind speed measurements for this day, meter/sec.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the wind speed, meter/sec.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the wind speed, meter/sec.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the wind speed, meter/sec.
        - `num`Number of measurements.
    - `precipitation`
        - `min`Absolute precipitation volume minimum based on all historical measurements for this day, mm.
        - `max`Absolute precipitation volume maximum based on all historical measurements for this day, mm.
        - `median`The [median value](https://en.wikipedia.org/wiki/Median) of the precipitation volume, mm.
        - `mean`Average of all precipitation volume measurements for this day, mm.
        - `p25`The [first quartile](https://en.wikipedia.org/wiki/Quartile) value of the precipitation volume, mm.
        - `p75` The [third quartile](https://en.wikipedia.org/wiki/Quartile) value of the precipitation volume, mm.
        - `st_dev`The [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the precipitation volume, mm.
        - `num`Number of measurements.

# **Other features**

# **Geocoding API**

Requesting API calls by geographical coordinates is the most accurate way to specify any location. If you need to convert city names to geo coordinates and the other way around automatically, please use our [**Geocoding API**](https://openweathermap.org/api/geocoding-api).

# **Built-in geocoding**

Please use [**Geocoder API**](https://openweathermap.org/api/geocoding-api) if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

**Please note that [API requests by city name](https://openweathermap.org/api/statistics-api#name) and [city id](https://openweathermap.org/api/statistics-api#cityid) have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality.**

### **Built-in API request by city name**

Please use the parameter `q` instead of the parameters `lat,lon` to specify the city name in the API requests.

| **Parameters** |  |  |
| --- | --- | --- |
| `q` | required | City name, state code and country code divided by comma, please refer to [ISO 3166](https://www.iso.org/obp/ui/) for the state codes or country codes.
You can specify the parameter not only in English. In this case, the API response should be returned in the same language as the language of requested location name if the location is in our predefined list of more than 200,000 locations. |

**Example of API calls**

Yearly aggregation

```
https://history.openweathermap.org/data/2.5/aggregated/year?q=London,GB&appid={API key}
```

Monthly aggregation

```
https://history.openweathermap.org/data/2.5/aggregated/month?q=London,GB&month=2&appid={API key}
```

Daily aggregation

```
https://history.openweathermap.org/data/2.5/aggregated/day?q=London,GB&month=2&day=1&appid={API key}
```

### **Built-in API request by city id**

Please use the parameter `id` instead of the parameters `lat,lon` to specify the city id in the API requests.

| **Parameters** |  |  |
| --- | --- | --- |
| `id` | required | City ID. The list of city IDs 'city.list.json.gz' can be downloaded [here](http://bulk.openweathermap.org/sample/). |

**Example of API calls**

Yearly aggregation

```
https://history.openweathermap.org/data/2.5/aggregated/year?id=2643743&appid={API key}
```

Monthly aggregation

```
https://history.openweathermap.org/data/2.5/aggregated/month?id=2643743&month=2&appid={API key}
```

Daily aggregation

```
https://history.openweathermap.org/data/2.5/aggregated/day?id=2643743&month=2&day=2&appid=[{API key}](https://home.openweathermap.org/api_keys)
```