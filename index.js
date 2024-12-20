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

//=------------------------------------------------
function sortPricingHighToLow(hotel1,hotel2){
  return hotel2.price - hotel1.price;
}
function sortPricingLowToHigh(hotel1,hotel2){
  return hotel1.price - hotel2.price;
}
app.get('/hotels/sort/pricing',(req,res)=>{
  let pricing = req.query.pricing;
  let hotelsCopy = hotels.slice();
  if(pricing==='low-to-high'){
    hotelsCopy.sort(sortPricingLowToHigh);
  }else if(pricing==='high-to-low'){
    hotelsCopy.sort(sortPricingHighToLow);
  }
  res.json(hotelsCopy);
});


//-----------------------------------------
function sortRatingHighToLow(hotel1,hotel2){
  return hotel2.rating - hotel1.rating;
}
function sortRatingLowToHigh(hotel1,hotel2){
  return hotel1.rating - hotel2.rating;
}
app.get('/hotels/sort/rating',(req,res)=>{
  let rating = req.query.rating ;
  let hotelsCopy = hotels.slice();
  if(rating==='low-to-high'){
    hotelsCopy.sort(sortRatingLowToHigh);
  }else if(rating==='high-to-low'){
    hotelsCopy.sort(sortRatingHighToLow);
  }
  res.json(hotelsCopy);
});
//-----------------------------------------
function sortReviewsMostToLeast(hotel1,hotel2){
  return hotel2.reviews - hotel1.reviews;
}
function sortReviewsLeastToMost(hotel1,hotel2){
  return hotel1.reviews - hotel2.reviews;
}
app.get('/hotels/sort/reviews',(req,res)=>{
  let reviews  = req.query.reviews  ;
  let hotelsCopy = hotels.slice();
  if(reviews ==='least-to-most'){
    hotelsCopy.sort(sortReviewsLeastToMost);
  }else if(reviews ==='most-to-least'){
    hotelsCopy.sort(sortReviewsMostToLeast);
  }
  res.json(hotelsCopy);
});

//-=============================================






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
