// playsInline loop muted autoPlay
import React, { useEffect, useState } from 'react'
import "./ProductPage.css"
import { redirect, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import {useCurrency} from "../../Contexts/CurrencyExchange"
import { Navigate } from 'react-router-dom';

const ProductPage = () => {
  const {type}= useParams();
  const navigate=useNavigate();
  const[data,setdata]=useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() =>{  setLoading(true);
    axios.get(`/api/${type}/view`)
    .then(res => {
      if (Array.isArray(res.data)) {
        setdata(res.data);
      } else {
        setdata([]);
      }
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });},[type]);
  const handlProductClick=(id)=>{
    navigate(`/item/${type}/${id}`)
  };
  
  const {currency}=useCurrency();

  const videotype={
    analog:"https://res.cloudinary.com/dvd8yytqv/video/upload/v1754046984/1753461358864_dfjmhb.mp4",
    digital:"https://res.cloudinary.com/dvd8yytqv/video/upload/v1754227492/1753789572235_lojtux.mp4",
    smartwatch:"https://res.cloudinary.com/dvd8yytqv/video/upload/v1754227492/1753789572235_lojtux.mp4",
    retro:"https://res.cloudinary.com/dvd8yytqv/video/upload/v1754227492/1753789764714_i6kdzu.mp4",
  }   
  if (loading) {
    return <div className="loader">Loading...</div>;
  }
  return (
    <div className="analog_page">
      {type==null?
            <div><h1 id='Nopage'>SELECT A TYPE OF WATCH</h1></div> :null
      }
      {videotype[type] &&(
        <div className="analog_video_background">
            <video src={videotype[type]} autoPlay playsInline loop muted ></video>
        </div>
        )}
        <div className="watch_container_flex">
            <div className="watches_container_grid">
            {(Array.isArray(data) ? data : []).map((item, index) => (
               <div className="product_card" key={index}>
                <div className="image_container"><img src={item.ImageUrl} alt=""/></div>
                <div className="cover_text" onClick={()=>handlProductClick(item._id)}>
                <div className="text_container_hover">
                <h1 style={{textDecoration:"underline",marginTop:"20px"}}>{item.watchname}</h1>
                {
                          currency === "INR" ? (
                            <h3>{item.Rupee}₹</h3>
                          ) : currency === "USD" ? (
                            <h3>{item.Dollar}$</h3>
                          ) : currency === "EUR" ? (
                            <h3>{item.Euro}€</h3>
                          ) : (
                            <h3>{item.Rupee}₹</h3>
                          )
                }
                <div className="button_container_buy_cart" style={{zIndex:"999"}}>
                <button style={{opacity:'100%'}} onClick={(e) => { e.stopPropagation();handlProductClick(item._id)}}>View Info</button>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const res = await axios.post(
                          "/api/cart/add",
                          {
                            productId: item._id,
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
              </div>
               </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default ProductPage
