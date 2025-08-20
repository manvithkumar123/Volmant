import React, { useEffect, useState } from 'react'
import "./Cartpage.css";
import { useNavigate } from 'react-router-dom';
import {useCurrency} from "../../Contexts/CurrencyExchange"
import { loadStripe } from "@stripe/stripe-js";


const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate=useNavigate();
  const [isLogged, setIsLogged] = useState(true);
  // Load Stripe publishable key from env or directly here (test key for development)
  const [stripePromise] = useState(() =>
    loadStripe("pk_test_51RyAWTIkUBOokg8wAGt4eF4F8evdPjUZimzCoX4jQTRWvKAl56gMWNnnlT0aIbnyfTb5WU8AvIEkYV3ObCg3PGmq00Oxgp3YDb") // replace with your actual test publishable key
  );
  useEffect(() => {
    fetch("https://volmant.onrender.com/api/cart", { credentials: "include" })
    .then(res => {
      if (res.status === 401) {
        setIsLogged(false);
        return;
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        setCartItems(data);
      }
    })
    .catch(err => console.error("Failed to fetch cart:", err));
  }, []);
  
  const handleAddQuantity = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
    // Optional: You can also update the backend here if needed
  };
  
  const {currency}=useCurrency();
  const handleRemoveItem = async (index) => {
    const itemToRemove = cartItems[index];
    console.log("Removing item:", itemToRemove);
    
    if (!itemToRemove._id) {
      console.error("Missing _id for item:", itemToRemove);
      return;
    }

    try {
      const response = await fetch(`https://volmant.onrender.com/api/cart/remove/${itemToRemove._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        const updatedItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedItems);
      } else {
        console.error("Failed to delete item from backend");
      }
    } catch (error) {
      console.error("Error while deleting cart item:", error);
    }
  };

  if (!isLogged) {
    return (
      <div className='login_error_page'>
        <h1>Login to View Cart</h1>
        <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1754913535/30249018-removebg-preview_qpbfql.png" alt="" style={{height:"300px",width:"400px"}} />
        <div className="button_container_loginerror">
          <button onClick={()=>{navigate("/")}}>Home page</button>
          <button onClick={()=>{navigate('/Login')}}>Login Page</button>
        </div>
      </div>
    );
  }
  // Helper function to map DB values to user-friendly names
  const formatType = (type) => {
    switch (type) {
      case "digitalSchema": return "Digital";
      case "RetroSchema": return "Retro";
      case "smartschema": return "Smart-Watch";
      case "promote": return "Analog";
      case "analog": return "Analog";
      default: return type;
    }
  };
  return (
    <div className="cart_page">
        <div className="cartpage_flex">
        <div className="cart_logo_buy">
            <h1>VOLMANT</h1>
            <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1754309439/image_3_gdc21d.png" alt="" style={{height:"200px",width:'200px',marginTop:"15px"}} />
            <div className="buttons_cart_container">
                <button onClick={async () => {
                  if (!cartItems.length) {
                    alert("Cart is empty");
                    return;
                  }
                  const totalAmount = cartItems.reduce((sum, item) => sum + (Number(item.productId?.Rupee) || 0) * item.quantity, 0);
                  try {
                    // Call backend to create checkout session
                    const response = await fetch("https://volmant.onrender.com/api/create-checkout-session", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ amount: totalAmount * 100 }) // amount in paise
                    });
                    const session = await response.json();
                    if (!session.id) {
                      alert("Failed to get session ID");
                      return;
                    }
                    // Use Stripe publishable key to redirect
                    const stripe = await stripePromise;
                    const result = await stripe.redirectToCheckout({ sessionId: session.id });
                    if (result.error) {
                      alert(result.error.message);
                    }
                  } catch (err) {
                    console.error("Error initiating payment:", err);
                    alert("Failed to initiate payment");
                  }
                }}>Checkout</button>
                <button onClick={()=>{navigate("/")}}>Continue Shopping</button>
            </div>
            <div className="update_cart_button">
            <button onClick={() => window.location.reload()}>Update Cart</button>
            </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"5px",justifyContent:"center",alignItems:"center"}}>
        <div className="cart_items_container">
          {cartItems.map((item, index) => (
            <div key={item._id || index} className="cart_selected_items">
              <img src={item.productId?.ImageUrl} alt={item.name} style={{height:'100px',width:"100px",borderRadius:"10px"}} />
              <div className='cart_product_text'>
              <h3>{item.productId?.watchname || item.productId?.name || "Unnamed Product"}</h3>
              <p>Quantity: {item.quantity}</p>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <p>Type: {formatType(item.productType)}</p>
              </div>
              <div className="price">
                <p>Price:</p>
                {currency === "INR" ? (
                  <h3>{(Number(item.productId?.Rupee)) * item.quantity}₹</h3>
                ) : currency === "USD" ? (
                  <h3>{(Number(item.productId?.Dollar) || 0) * item.quantity}$</h3>
                ) : currency === "EUR" ? (
                  <h3>{(Number(item.productId?.Euro) || 0) * item.quantity}€</h3>
                ) : (
                  <h3>{(Number(item.productId?.Rupee) || 0) * item.quantity}₹</h3>
                )} 
              </div>
              <div className="buttons_added_container">
                <button onClick={() => handleAddQuantity(index)}>ADD</button>
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </div>

              </div>
              
            </div>
          ))}
        </div>
        <div className="total_value">
        <h2>
      Total:{" "}
      {currency === "INR"
        ? `${cartItems.reduce((sum, item) => sum + (Number(item.productId?.Rupee) || 0) * item.quantity, 0)}₹`
        : currency === "USD"
        ? `${cartItems.reduce((sum, item) => sum + (Number(item.productId?.Dollar) || 0) * item.quantity, 0)}$`
        : currency === "EUR"
        ? `${cartItems.reduce((sum, item) => sum + (Number(item.productId?.Euro) || 0) * item.quantity, 0)}€`
        : `${cartItems.reduce((sum, item) => sum + (Number(item.productId?.Rupee) || 0) * item.quantity, 0)}₹`}
    </h2>
        </div>
        </div>
        </div>
        <div className="line_container">
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
    </div>
  )
}

export default Cartpage
