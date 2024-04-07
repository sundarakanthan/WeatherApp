const express = require("express");
const https = require("https");

const app =  express();
app.use(express.urlencoded({extended:true}))

app.get("/weatherapp",(req,res)=>{

  res.sendFile(__dirname+'/index.html')

//    res.send("<h1>This is a response.</h1>") //This wont work because two send methods wont work.
//So instead we can use res.write() method. and finally call the res.send() to send the response.
})
app.post('/weatherapp',(request,res)=>{


  let cityName =  request.body.searchInput;


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=daf03b4bfa5a86e3606cf95e7e3a49fb&units=metric`

    https.get(url,(response)=>{
      response.on("data",(data)=>{
        
   
        let  weatherData = JSON.parse(data);

        let temperature = weatherData.main.temp;
        res.write(`<h1>The Temperature in ${cityName} is: ${temperature}°C</h1>`);
        res.send();
        //  let temperature = weatherData.main.temp
        // console.log(temperature);
      })
    })
})

app.listen(5500,()=>{
    console.log('Server is running...');
})

// API key - daf03b4bfa5a86e3606cf95e7e3a49fb
