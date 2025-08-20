import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
      <div className="footer">
        <div className="quote_container">
            <h1>Timeless Pieces for Modern Lives</h1>
            <h4>A watch says a lot about you and it should help you stand out . We only carry watch brands that make a statement.</h4>
        </div>
        <div className="footer_storage">
        <div className="contact_links_container">
            <h4 style={{marginLeft:"5px"}}>Subscribe to get special offers,<br /> free giveaways, and exclusive deals.</h4>
            <div className="social_media_links">
                <div className="link"><i className="fa-brands fa-square-instagram"></i></div>
                <div className="link"><i className="fa-brands fa-square-whatsapp"></i></div>
                <div className="link"><i className="fa-brands fa-facebook"></i></div>
                <div className="link"><i className="fa-solid fa-envelope"></i></div>
                <div className="link"><i className="fa-solid fa-phone"></i></div>
            </div>
            </div>
            <div className="category_container_footer">
                <h4>ANALOG</h4>
                <h4>DIGITAl</h4>
                <h4>SMART WATCH</h4>
                <h4>RETRO</h4>
            </div>
            <div className="logo_volmant">
                <img src="/Images/logo.png" alt="" style={{height:'120px',width:"120px"}} id='logovolmant'/>
            </div>
        </div>
        <div className="category_container_footer_phone" style={{display:"none"}}>
                <h4>ANALOG</h4>
                <h4>DIGITAl</h4>
                <h4>SMART WATCH</h4>
                <h4>RETRO</h4>
            </div>
        <div className="brand_name_footer">
        <h1>VOLMANT</h1>
        <h3>© 2025 VOLMANT All Rights Reserved</h3>
        </div>
      </div>
  )
}

export default Footer
