import React, { useEffect, useState } from 'react'
import "./Category.css"
import {useCurrency} from "../../Contexts/CurrencyExchange"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const Category = () => {
    const [data,setdata]=useState();
    const {gender} = useParams();
    const {currency}=useCurrency();
    const {type}=useParams();
 
    useEffect(()=>{
        axios.get(`https://volmant.onrender.com/api/${type}/view`)
        .then(res=>setdata(res.data))
        .catch(err=>console.log(err))
    }, [type]);
    const navigate=useNavigate();
  return (
    <div className="category_main_bg">
        {((gender === 'men' || gender === "women") && !type ) ? (
  <div className='Category_Selector'>
    <h1>Select Any watch Category</h1>
    <div className="category_button_container">
      <button onClick={() => navigate(`/category/${gender}/analog`)}>Analog</button>
      <button onClick={() => navigate(`/category/${gender}/digital`)}>Digital</button>
      <button onClick={() => navigate(`/category/${gender}/smartwatch`)}>Smartwatch</button>
      <button onClick={() => navigate(`/category/${gender}/retro`)}>Retro</button>
    </div>
  </div>
) : gender == null ? (
  <h1>You entered Invalid url. Check once again please</h1>
) : null}
      {type=='analog'?
      <>
      <h1>Analog Watches-{(gender).toUpperCase()}</h1>
      <div className="watch_container_flex_category">
      <div className="watches_container_grid_category">
          {data &&data.filter(item => (item.gender === gender)|| (item.gender==="unisex") ).map((item, index) => (
                <div key={index} className="product_card">
                     <div className="image_container"><img src={item.ImageUrl} alt=""/></div>
                     <div className="cover_text"  onClick={()=>{navigate(`/item/analog/${item._id}`)}} >
                     <div className="text_container_hover">
                     <h1 style={{textDecoration:"underline",marginTop:"20px"}}>{item.watchname}</h1>
                  {currency === "INR" ? (
                  <h3>{item.Rupee}₹</h3>
                ) : currency === "USD" ? (
                  <h3>{item.Dollar}$</h3>
                ) : currency === "EUR" ? (
                  <h3>{item.Euro}€</h3>
                ) : (
                  <h3>{item.Rupee}₹</h3>
                )} 
                </div>
                </div>
                </div>
          ))}
          </div>
          </div>
          </>
      :null}
    {type=='digital'?
      <>
      <h1>Digital Watches-{(gender).toUpperCase()}</h1>
      <div className="watch_container_flex_category">
      <div className="watches_container_grid_category">
          {data &&data.filter(item => (item.gender === gender)|| (item.gender==="unisex")).map((item, index) => (
                <div key={index} className="product_card">
                     <div className="image_container"><img src={item.ImageUrl} alt=""/></div>
                     <div className="cover_text"  onClick={()=>{navigate(`/item/digital/${item._id}`)}} >
                     <div className="text_container_hover">
                     <h1 style={{textDecoration:"underline",marginTop:"20px"}}>{item.watchname}</h1>
                     {currency === "INR" ? (
                  <h3>{item.Rupee}₹</h3>
                ) : currency === "USD" ? (
                  <h3>{item.Dollar}$</h3>
                ) : currency === "EUR" ? (
                  <h3>{item.Euro}€</h3>
                ) : (
                  <h3>{item.Rupee}₹</h3>
                )} 
                </div>
                </div>
                </div>
          ))}
          </div>
          </div>
          </>
      :null}
       {type=='smartwatch'?
      <>
      <h1>SmartWatches-{(gender).toUpperCase()}</h1>
      <div className="watch_container_flex_category">
      <div className="watches_container_grid_category">
          {data && data.filter(item => (item.gender === gender)|| (item.gender==="unisex")).map((item, index) => (
                <div key={index} className="product_card">
                     <div className="image_container"><img src={item.ImageUrl} alt=""/></div>
                     <div className="cover_text"  onClick={()=>{navigate(`/item/smartwatch/${item._id}`)}} >
                     <div className="text_container_hover">
                     <h1 style={{textDecoration:"underline",marginTop:"20px"}}>{item.watchname}</h1>
                     {currency === "INR" ? (
                  <h3>{item.Rupee}₹</h3>
                ) : currency === "USD" ? (
                  <h3>{item.Dollar}$</h3>
                ) : currency === "EUR" ? (
                  <h3>{item.Euro}€</h3>
                ) : (
                  <h3>{item.Rupee}₹</h3>
                )} 
                </div>
                </div>
                </div>
          ))}
          </div>
          </div>
          </>
      :null}
       {type=='retro'?
      <>
      <h1>Retro Watches-{(gender).toUpperCase()}</h1>
      <div className="watch_container_flex_category">
      <div className="watches_container_grid_category">
          {data && data.filter(item => (item.gender === gender)|| (item.gender==='unisex')).map((item, index) => (
                <div key={index} className="product_card">
                     <div className="image_container"><img src={item.ImageUrl} alt=""/></div>
                     <div className="cover_text"  onClick={()=>{navigate(`/item/retro/${item._id}`)}}>
                     <div className="text_container_hover">
                     <h1 style={{textDecoration:"underline",marginTop:"20px"}}>{item.watchname}</h1>
                     {currency === "INR" ? (
                  <h3>{item.Rupee}₹</h3>
                ) : currency === "USD" ? (
                  <h3>{item.Dollar}$</h3>
                ) : currency === "EUR" ? (
                  <h3>{item.Euro}€</h3>
                ) : (
                  <h3>{item.Rupee}₹</h3>
                )} 
                </div>
                </div>
                </div>
          ))}
          </div>
          </div>
          </>
      :null}
      
    </div>
  )
}

export default Category
