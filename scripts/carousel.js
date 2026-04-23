'use strict'
import {topRatedProducts} from '../index.js'

// createcarousel()
 topRatedProducts.forEach((product) => console.log(product.rating)
  );


function createCarousel(topRatedProducts){
  
const first12 = topRatedProducts.slice(0 , 12)

console.log("this is the 12 first: " + first12.rating)

  // createCarouselCards(topRatedProducts)

}
createCarousel(topRatedProducts)