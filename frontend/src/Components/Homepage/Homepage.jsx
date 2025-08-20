// playsInline loop muted autoPlay

import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./Homepage.css"
import { useCurrency } from '../../Contexts/CurrencyExchange';
import axios from 'axios';
const Homepage = () => {
  const navigate = useNavigate();
  const handlProductClick=(id)=>{
    navigate(`/item/promoted/${id}`)
  };
  const [data,setdata]=useState();
  useEffect(()=>{
    axios.get("api/promoted/view")
    .then(res=>{setdata(res.data)
    })
    .catch(error=>console.log(error))
  },[])
  const {currency} = useCurrency();
return (
<div className="homepage">
        <div className="intro_video_background">
        <video src="https://res.cloudinary.com/dvd8yytqv/video/upload/v1753872908/1753461599781_tibayl.mov"  autoPlay loop playsInline muted></video>
        </div>
    <div className="premium_watches">
      {data &&(
        <>
          <div className="watch_vertical_container">
            <div className="premium_watch_container"  onClick={()=>handlProductClick(data[0]._id)}>
              <img src={data[0].ImageUrl} alt="" />
              <div className="cover_text">
                <div className="text_container_hover">
                <h1 style={{textDecoration:"underline"}}>{data[0].watchname}</h1>
                <h3>Nature Inspired, meaning Greenary</h3>
                <>{
                          currency === "INR" ? (
                            <h3>{data[0].Rupee}₹</h3>
                          ) : currency === "USD" ? (
                            <h3>{data[0].Dollar}$</h3>
                          ) : currency === "EUR" ? (
                            <h3>{data[0].Euro}€</h3>
                          ) : (
                            <h3>{data[0].Rupee}₹</h3>
                          )
                }</>
                </div>
              </div>
            </div>
            <div className="premium_watch_container" style={{marginTop:"40px"}} onClick={()=>handlProductClick(data[2]._id)}>
              <img src={data[2].ImageUrl} alt="" />
              <div className="cover_text">
                <div className="text_container_hover">
                <h1 style={{textDecoration:"underline"}}>{data[2].watchname}</h1>
                <h3>French-inspired, meaning chronicle</h3>
                <>{
                          currency === "INR" ? (
                            <h3>{data[2].Rupee}₹</h3>
                          ) : currency === "USD" ? (
                            <h3>{data[2].Dollar}$</h3>
                          ) : currency === "EUR" ? (
                            <h3>{data[2].Euro}€</h3>
                          ) : (
                            <h3>{data[2].Rupee}₹</h3>
                          )
                }</>
                </div>
              </div>
            </div>
          </div>
          <div className="watch_horizontal_container">
            <div className="premium_watch_container_side" onClick={()=>handlProductClick(data[1]._id)}>
              <img src={data[1].ImageUrl} alt="" />
              <div className="cover_text">
                <div className="text_container_hover">
                <h1 style={{textDecoration:"underline"}}>{data[1].watchname}</h1>
                <h3>Inspired by eclipse + precision</h3>
                <>{
                          currency === "INR" ? (
                            <h3>{data[1].Rupee}₹</h3>
                          ) : currency === "USD" ? (
                            <h3>{data[1].Dollar}$</h3>
                          ) : currency === "EUR" ? (
                            <h3>{data[1].Euro}€</h3>
                          ) : (
                            <h3>{data[1].Rupee}₹</h3>
                          )
                }</>
                </div>
              </div>
            </div>
            <div className="label">
            <h1>PREMIUM</h1>
            <h1 style={{marginLeft:"50px"}}>WATCHES</h1>
            </div>
          </div>
          </>)}
          </div>
    <div className="category_page">
        <div className="flex_container_category">
            <div className="watch_category" onClick={() => navigate('/Product/analog')} style={{ cursor: 'pointer' }}>
              <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1753884085/Gemini_Generated_Image_f0vwu1f0vwu1f0vw_nesqqk.png" alt="" />
              <div className="cover_text">
                <div className="text_container_hover">
                <h1 style={{textDecoration:"underline"}}>ANALOG</h1>
                <h3>Timeless craftsmanship, where tradition meets precision
                </h3>
                </div>
              </div>
            </div>
            <div className="watch_category" onClick={() => navigate('/Product/smartwatch')} style={{ cursor: 'pointer' }}>
              <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1753884085/Gemini_Generated_Image_2usibc2usibc2usi_1_e72ip5.png" alt="" />
              <div className="cover_text">
                <div className="text_container_hover">
                <h1 style={{textDecoration:"underline"}}>SMART WATCH</h1>
                <h3>Modern tech on your wrist — sleek, smart, unstoppable</h3>
                </div>
              </div>
            </div>
            <div className="watch_category" onClick={() => navigate('/Product/digital')} style={{ cursor: 'pointer' }}>
              <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1753884083/image_usapsv.png" alt="" />
              <div className="cover_text">
                <div className="text_container_hover">
                <h1 style={{textDecoration:"underline"}}>Digital</h1>
                <h3>Bold hues, bright vibes — make every second pop</h3>
                </div>
              </div>
            </div>
            <div className="watch_category" onClick={() => navigate('/Product/retro')} style={{ cursor: 'pointer' }}>
              <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1753884085/Gemini_Generated_Image_wlx9ivwlx9ivwlx9_u3ydme.png" alt="" />
              <div className="cover_text">
                <div className="text_container_hover">
                <h1 style={{textDecoration:"underline"}}>RETRO</h1>
                <h3>A throwback to classic cool — vintage style, modern soul
                </h3>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div className="brands_container">
      <div className="collabration_brand">
        <img src="/Images/rolex.png" alt="" />
      </div>
      <div className="collabration_brand">
        <img src="/Images/ppg.png" alt="" />
      </div>
      <div className="collabration_brand">
        <img src="/Images/vacheron.png" alt="" />
      </div>
      <div className="collabration_brand">
        <img src="/Images/seiko.png" alt="" />
      </div>
    </div>
    </div>
  )
}

export default Homepage
