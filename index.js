import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));









app.get("/" ,(req,res) => {
  res.render("index.ejs")
});



app.post("/" , async (req,res) => {
  try {
     
    var b = req.body.name;
    const options = {
      method: 'GET',
      url: `https://foreca-weather.p.rapidapi.com/location/search/${b}`,
      params: {
        lang: 'en',
        country: 'in'
      },
      headers: {
        'X-RapidAPI-Key': 'bb1c3662d1msh36c618fc46daabdp1fdd37jsn8aa4381ba593',
        'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
      }
    };
  
  
    const response = await axios.request(options);
    var lengths = response.data.locations.length;
    
    
    if (response.data.locations.length === 1) {
    
      var id = response.data.locations[0]["id"];
      
    
    
    
      const current = {
        method: 'GET',
        url: `https://foreca-weather.p.rapidapi.com/current/${id}`,
        headers: {
          'X-RapidAPI-Key': 'bb1c3662d1msh36c618fc46daabdp1fdd37jsn8aa4381ba593',
          'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
      };
      const current1 = await axios.request(current);
      // console.log(current1.data.current);
  
  
      const options1 = {
        method: 'GET',
        url: `https://foreca-weather.p.rapidapi.com/observation/latest/${id}`,
        params: {lang: 'en'},
        headers: {
          'X-RapidAPI-Key': 'bb1c3662d1msh36c618fc46daabdp1fdd37jsn8aa4381ba593',
          'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
      };
      
      const response1 = await axios.request(options1);
      // console.log(response1.data.observations[0]);
      // console.log(response1.data.observations[1]);
      // console.log(response1.data.observations[2]);
    
    
    
      res.render("index.ejs",{
          content: response.data.locations[0],
          content2:current1.data.current,
          content3: response1.data.observations,
          bita:req.body.name,
          lengths:lengths
      });
    }    
  
    else {
      res.render("index.ejs",{
        lens:"a"
      });
    }
  }
  
  catch (error) {
    console.error(error);
  }


});



app.listen(port, () => {
  console.log(`Link : http://localhost:${port}/`)
  console.log(`Server Running on Port ${port}`)
});