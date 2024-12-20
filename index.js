const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
let hotels = require('./hotels');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//functions------------------------------------------
function sortPricingHighToLow(hotel1,hotel2){
  return hotel2.pricing - hotel1.pricing;
}
function sortPricingLowToHigh(hotel1,hotel2){
  return hotel1.pricing - hotel2.pricing;
}
//--------------------------------------------------------
app.get('/hotels/sort/pricing',(req,res)=>{
  let pricing = req.query.pricing;
  let hotelsCopy = hotels.slice();
  if(pricing==="low-to-high"){
    hotelsCopy.sort(sortPricingLowToHigh);
  }else if(pricing==="high-to-low"){
    hotelsCopy.sort(sortPricingHighToLow);
  }
  res.json(hotelsCopy);
  
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
