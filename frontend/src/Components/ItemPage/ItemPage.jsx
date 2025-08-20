import React, { useEffect, useState } from 'react'
import "./ItemPage.css"
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import {useCurrency} from "../../Contexts/CurrencyExchange"
const ItemPage = () => {
  const navigate=useNavigate();
    const{currency}=useCurrency();
    const { id, type } = useParams();
    const[data,setdata]=useState(null);
    useEffect(()=>{
        axios.get(`/api/${type}/view/${id}`)
        .then(res =>setdata(res.data))
        .catch(error => console.log(error))
    },[id])
  return (
    <div className="item_page">
        {data && (
            <>
        <div className="item_flex_container">
            <div className="item_image_container">
                <div className="item_image_store">
            <img src={data.ImageUrl} alt="" />
            </div>
            </div>
            <div className="item_text_container">
            <h1>{data.watchname}</h1>
            <div className="line"></div>
            <p>Movement: PTS LB19 Multifunction, 20 Jewels, 21600 BPH, Up to 36 Hour Power Reserve. <br /> Made in China. Accuracy: -20/+40 sec per day <br />Functions: Hours, Minutes, Central Seconds, Date, Day, Month <br />Case: Hand-finished 316L Stainless Steel <br />Crystal: Hardened Mineral 
            <br />Dimensions: 42mm Wide. 10.8mm ThickLug to Lug: 46mm <br />Water Resistance: 5 ATM <br />Strap: 20mm Solid Stainless Steel Bracelet w/ Tool-free, Quick-release Springbar System <br /> wrist Circumference: 5.75-8” (140mm/210mm) <br /> Weight: 5.60 oz (159 grams)</p>
            {
                          currency === "INR" ? (
                            <h1 style={{marginTop:"10px"}}>{data.Rupee}₹</h1>
                          ) : currency === "USD" ? (
                            <h1 style={{marginTop:"10px"}}>{data.Dollar}$</h1>
                          ) : currency === "EUR" ? (
                            <h1 style={{marginTop:"10px"}}>{data.Euro}€</h1>
                          ) : (
                            <h1 style={{marginTop:"10px"}}>{data.Rupee}₹</h1>
                          )
                }
            <div className="item_button_container">
                <button>BUY NOW!</button>
                <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const res = await axios.post(
                          "/api/cart/add",
                          {
                            productId: data._id,
                            productType: type
                          },
                          { withCredentials: true }
                        );
                        alert("Added to cart!");
                      } catch (err) {
                        console.error("Error adding to cart. Full error:", err);
                        alert("Failed to add to cart, please Login");
                        navigate("/Login");
                      }
                    }}
                  >
                    Add to Cart
                  </button>
            </div>
            </div>
            <div className="icons_container">
                <div className="item_icons">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-80v-100l120-84v-144L80-280v-120l320-224v-176q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800v176l320 224v120L560-408v144l120 84v100l-200-60-200 60Z"/></svg>
                </div>
                <div className="item_icons">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
                </div>
                <div className="item_icons">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q97-30 162-118.5T718-480H480v-315l-240 90v207q0 7 2 18h238v316Z"/></svg>
                </div>
                <div className="item_icons">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                </div>
            </div>
        </div>
        <div className="item_details_container">
            <h3 id='only_mobile'>Specifications</h3>
        <p id='only_mobile'>Movement: PTS LB19 Multifunction, 20 Jewels, 21600 BPH, Up to 36 Hour Power Reserve. <br /> Made in China. Accuracy: -20/+40 sec per day <br />Functions: Hours, Minutes, Central Seconds, Date, Day, Month <br />Case: Hand-finished 316L Stainless Steel <br />Crystal: Hardened Mineral 
        <br />Dimensions: 42mm Wide. 10.8mm ThickLug to Lug: 46mm <br />Water Resistance: 5 ATM <br />Strap: 20mm Solid Stainless Steel Bracelet w/ Tool-free, Quick-release Springbar System <br /> wrist Circumference: 5.75-8” (140mm/210mm) <br /> Weight: 5.60 oz (159 grams)</p>
            <h3>Description</h3>
            <p>The {data.watchname} gives a nod to vintage aviator watches and features our big date and calendar complication. The open-heart dial allows you to see the balance wheel in motion as you wear it.
                 Archetype's watch cases are made from 316L stainless steel with a scratch-resistant crystal and a stainless steel bracelet, and the strap changes are simple and easy with their quick release springbar system.</p>
            <h3>Shipping</h3>
            <p>Free U.S. shipping on orders over $99 and a flat $19 international shipping to most countries (excludes collector display cases). Not all countries are eligible for $19 international shipping. Upgraded shipping options (estimated transit times and rates) will be quoted during checkout. All prices are in US Dollars ($USD). Most orders ship from Salt Lake City, Utah, USA.
            Watches.com has been shipping worldwide since 1999 and we ship internationally daily. Most orders are processed and shipped out by 5pm (MST) Monday through Friday on regular business days. Payment/fraud verification is typically instantaneous, but in some instances may take up to 48 hours. Orders placed/received after 12:00pm (MST) will be usually be processed the next business day. Please be aware that UPS does not deliver on weekends.</p>
            <h3>Returns</h3>
            <p>We could all use some extra time. If your new, unworn item is not 100% to your satisfaction, you have 30 days from the original ship date to return it. To be eligible for a return, your item must be unused, unworn and in the same condition that you received it (including any protective stickers still on it). It must also be in the original packaging. More details can be found on our Returns page.  **Unfortunately Mystery watches are final sale and only eligible for return for store credit; a small restocking fee applies to these returns.</p>
            <h3>Warranty</h3>
            <p>Warranty periods range from 12 months to lifetime, depending on the brand. All of the brands we carry come with their international manufacturer warranty.* All warranty issues are to be handled directly with the watch manufacturer, so be sure to keep your electronic invoice for proof of purchase from Watches.com as we're an authorized retailer. Contact the brand directly using the information in your warranty booklet or the manufacturer's website for complete warranty terms and repair instructions. Typically the manufacturer's warranty does not cover: battery, crystal, strap or bracelet; damage resulting from improper handling, lack of care, accidents or normal wear and tear; damage from contact with objects; water damage. </p>
        </div>
        <div className="line_container" style={{marginTop:"50px"}}>
            <div className="line_cart">
                <p>You May Also Like</p>
            </div>
        </div>
        <div className="suggestions" style={{marginTop:"30px"}}>
        <div className="product_card"> 
          <div className="image_container"><img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1755698624/3013-1_hisek6.jpg" alt=""/></div>
           <div className="cover_text"onClick={()=>{navigate("/product/analog")}} >
          <div className="text_container_hover">
          <h1>Analog</h1>
          <h4>Timeless Precision, Classic Style</h4>
          </div>
          </div>
          </div>
        <div className="product_card"> 
          <div className="image_container"><img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1755698625/photo-1524592094714-0f0654e20314_kcvlup.jpg" alt=""/></div>
           <div className="cover_text"onClick={()=>{navigate("/product/retro")}} >
          <div className="text_container_hover">
          <h1>Retro</h1>
          <h4>Classic Charm, Modern Legacy</h4>
          </div>
          </div>
          </div>
        <div className="product_card"> 
          <div className="image_container"><img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1755698698/51XGrwhczrL_cdsp02.jpg" alt=""/></div>
           <div className="cover_text" onClick={()=>{navigate("/product/smartwatch")}}>
          <div className="text_container_hover">
            <h1>Smart Watches</h1>
            <h4>Technology on Your Wrist</h4>
          </div>
          </div>
          </div>
      </div>
      </>
    )}
    </div>
  )
}

export default ItemPage
