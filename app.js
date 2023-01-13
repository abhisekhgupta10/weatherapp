const express = require('express')
const app  = express();
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const request = require('request');
const port = process.env.PORT || 80


dotenv.config({ path: "./config/config.env" });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.render('index',{
        city:"Search",
        temp:0,
        country:"Search",
        desc:"Please Search",
        minTemp:0,
        maxTemp:0,
        hum:0,
        ico:""
    })
})

app.post('/',(req,res)=>{
 request(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=08db2d8dd768dc49371df1ce694ce160&units=metric`, function (error, response, body) {
   if(response.statusCode===200){
      const data = JSON.parse(body)
    //   res.send(data)
      const country = data.sys.country
      const temperature =data.main.temp
      const minTemp =data.main.temp_min
      const maxTemp =data.main.temp_max
      const hum =data.main.humidity
      const desc =data.weather[0].description
      const ico = data.weather[0].icon
      

    res.render('index',{
        city:req.body.city,
        temp:temperature,
        country:country,
        desc:desc,
        minTemp:minTemp,
        maxTemp:maxTemp,
        hum:hum,
        ico:ico
    })
}else{
    console.log(error)
}
})
})

app.listen(port,()=>{
    console.log('listening at port'+port)
})