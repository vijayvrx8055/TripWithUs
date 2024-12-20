const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
let hotels = require('./hotels.json');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//functions------------------------------------------
function sortPricingHighToLow(hotel1,hotel2){
  return hotel2.price - hotel1.price;
}
function sortPricingLowToHigh(hotel1,hotel2){
  return hotel1.price - hotel2.price;
}
//--------------------------------------------------------
app.get('/hotels/sort/pricing',(req,res)=>{
  let pricing = req.query.pricing;
  let hotelsCopy = hotels.slice();
  if(pricing==='low-to-high'){
    console.log('asc');
    hotelsCopy.sort(sortPricingLowToHigh);
    res.json(hotelsCopy);
  }else if(pricing==='high-to-low'){
    console.log('desc');
    hotelsCopy.sort(sortPricingHighToLow);
    res.json(hotelsCopy);
  }
  
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
