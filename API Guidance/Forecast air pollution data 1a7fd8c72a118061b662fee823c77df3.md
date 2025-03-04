# Forecast air pollution data

**API call**

```
http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat={lat}&lon={lon}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat` | required | Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `lon` | required | Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |

**Example of API request**

```
http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=50&lon=50&appid={API key}
```

# **Historical air pollution data**

**API call**

```
http://api.openweathermap.org/data/2.5/air_pollution/history?lat={lat}&lon={lon}&start={start}&end={end}&appid={API key}
```

| **Parameters** |  |  |
| --- | --- | --- |
| `lat` | required | Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `lon` | required | Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our [Geocoding API](https://openweathermap.org/api/geocoding-api) |
| `start` | required | Start date (unix time, UTC time zone), e.g. start=1606488670 |
| `end` | required | End date (unix time, UTC time zone), e.g. end=1606747870 |
| `appid` | required | Your unique API key (you can always find it on your account page under the ["API key" tab](https://home.openweathermap.org/api_keys)) |

**Example of API request**

```
http://api.openweathermap.org/data/2.5/air_pollution/history?lat=508&lon=50&start=1606223802&end=1606482999&appid={API key}
```

# **Air Pollution API response**

Example of the API response

```json
{
  "coord":[
    50,
    50
  ],
  "list":[
    {
      "dt":1605182400,
      "main":{
        "aqi":1
      },
      "components":{
        "co":201.94053649902344,
        "no":0.01877197064459324,
        "no2":0.7711350917816162,
        "o3":68.66455078125,
        "so2":0.6407499313354492,
        "pm2_5":0.5,
        "pm10":0.540438711643219,
        "nh3":0.12369127571582794
      }
    }
  ]
}
```

**Fields in API response**

- `coord` Coordinates from the specified location (latitude, longitude)
- `list`
    - `dt` Date and time, Unix, UTC
    - `main`
        - `main.aqi` Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor. If you want to recalculate Air Quality indexes according UK, Europe, USA and Mainland China scales please use ["Air Pollution Index levels scale"](https://openweathermap.org/air-pollution-index-levels) page
    - `components`
        - `components.co` Сoncentration of CO ([Carbon monoxide](https://en.wikipedia.org/wiki/Carbon_monoxide)), μg/m3
        - `components.no` Сoncentration of NO ([Nitrogen monoxide](https://en.wikipedia.org/wiki/Nitric_oxide)), μg/m3
        - `components.no2` Сoncentration of NO ([Nitrogen dioxide](https://en.wikipedia.org/wiki/Nitrogen_dioxide)), μg/m3
        - `components.o3` Сoncentration of O ([Ozone](https://en.wikipedia.org/wiki/Ozone)), μg/m3
        - `components.so2` Сoncentration of SO ([Sulphur dioxide](https://en.wikipedia.org/wiki/Sulfur_dioxide)), μg/m3
        - `components.pm2_5` Сoncentration of PM ([Fine particles matter](https://en.wikipedia.org/wiki/Particulates)), μg/m3
        - `components.pm10` Сoncentration of PM ([Coarse particulate matter](https://en.wikipedia.org/wiki/Particulates#Size,_shape,_and_solubility_matter)), μg/m3
        - `components.nh3` Сoncentration of NH ([Ammonia](https://en.wikipedia.org/wiki/Ammonia)), μg/m3