
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CloudIcon from '@mui/icons-material/Cloud';
import moment from "moment";
import "moment/locale/ar";

const cities = {
  1:  { name: "Cairo",       nameAr: "القاهرة",   lat: 30.06,  lon: 31.24  },
  2:  { name: "Lebanon",     nameAr: "لبنان",      lat: 33.88,  lon: 35.50  },
  3:  { name: "London",      nameAr: "لندن",       lat: 51.50,  lon: -0.12  },
  4:  { name: "New York",    nameAr: "نيويورك",    lat: 40.71,  lon: -74.00 },
  5:  { name: "Paris",       nameAr: "باريس",      lat: 48.85,  lon: 2.35   },
  6:  { name: "Tokyo",       nameAr: "طوكيو",      lat: 35.68,  lon: 139.69 },
  7:  { name: "Dubai",       nameAr: "دبي",        lat: 25.20,  lon: 55.27  },
  8:  { name: "Berlin",      nameAr: "برلين",      lat: 52.52,  lon: 13.40  },
  9:  { name: "Moscow",      nameAr: "موسكو",      lat: 55.75,  lon: 37.61  },
  10: { name: "Sydney",      nameAr: "سيدني",      lat: -33.86, lon: 151.20 },
  11: { name: "Toronto",     nameAr: "تورنتو",     lat: 43.65,  lon: -79.38 },
  12: { name: "Rome",        nameAr: "روما",       lat: 41.90,  lon: 12.49  },
  13: { name: "Madrid",      nameAr: "مدريد",      lat: 40.41,  lon: -3.70  },
  14: { name: "Beijing",     nameAr: "بكين",       lat: 39.90,  lon: 116.40 },
  15: { name: "Mumbai",      nameAr: "مومباي",     lat: 19.07,  lon: 72.87  },
  16: { name: "Los Angeles", nameAr: "لوس أنجلوس", lat: 34.05,  lon: -118.24},
  17: { name: "Istanbul",    nameAr: "إسطنبول",    lat: 41.01,  lon: 28.95  },
  18: { name: "Singapore",   nameAr: "سنغافورة",   lat: 1.35,   lon: 103.82 },
  19: { name: "Amsterdam",   nameAr: "أمستردام",   lat: 52.37,  lon: 4.90   },
  20: { name: "Riyadh",      nameAr: "الرياض",     lat: 24.68,  lon: 46.72  },
};
let cancelAxios=null;
export default function BasicCard() {
  const [weather, setWeather] = useState({});
  const [country, setCountry] = useState(1);
  
  const [lang, setLang] = useState("ar");
 


  useEffect(() => {
    const { lat, lon } = cities[country];
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=cb49e31b8cef0be498decad79b018257`, 
      {cancelToken: new axios.CancelToken((c)=>{
cancelAxios=c;
    })})
      .then((response) => {
   
        const data = response.data;
        setWeather({
          temp: Math.round(data.main.temp),
          main: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp_max: Math.round(data.main.temp_max),
          temp_min: Math.round(data.main.temp_min),
        });
      })
      .catch((error) => console.error("Error fetching weather data:", error));
      return()=>{
   
        cancelAxios();
      }
  }, [country]);

  const isAr = lang === "ar";
  const city = cities[country];

  return (
    <Card className='app-card px-2 absolute  top-1/2 '   dir={isAr ? "rtl" : "ltr"} sx={{ minWidth: 375, backgroundColor: "#003f91", color: "#d0d4db" }} >
      <CardContent sx={{ paddingBottom: 0 }}>
        <div className="flex flex-row items-center gap-2.5">
          <Typography gutterBottom sx={{ fontSize: 40, marginBottom: 0, color: "white" }}>
            {isAr ? city.nameAr : city.name}
          </Typography>
       <Typography variant="h6" className='text-gray-200'>
  {moment().locale(lang).format('LL')}
</Typography>
        </div>

        <hr />

        <div className="flex flex-row gap-20">
          <div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: "80px", fontWeight: 100, color: "white" }}>
                {weather.temp}
              </span>
              <img
                className="w-32 h-32"
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
              />
            </div>
            <Typography variant="body2" sx={{ fontSize: "15px" }}>
              {weather.description}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "15px", marginTop: 1 }}>
              {isAr
                ? `الصغري: ${weather.temp_min}  |  الكبري: ${weather.temp_max}`
                : `min: ${weather.temp_min}  |  max: ${weather.temp_max}`
              }
            </Typography>
          </div>

          <div>
            <CloudIcon sx={{ fontSize: 180, color: "white" }} />
          </div>
        </div>
      </CardContent>

      <CardActions className='flex justify-between'>
        <Button
          size="small"
          sx={{ color: "white" }}
          onClick={() => setLang(isAr ? "en" : "ar")}
        >
          {isAr ? "English" : "عربي"}
        </Button>
        <Select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          sx={{ color: "white", fontSize: "14px" }}
        >
          {Object.entries(cities).map(([key, city]) => (
            <MenuItem key={key} value={Number(key)}>
              {isAr ? city.nameAr : city.name}
            </MenuItem>
          ))}
        </Select>
      </CardActions>
    </Card>
  );
}