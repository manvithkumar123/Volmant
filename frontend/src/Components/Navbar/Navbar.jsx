import React, { useState } from 'react'
import { useTheme } from '../../Contexts/ThemeContext';
import "./Navbar.css"
import { Navigate, useNavigate } from 'react-router-dom';
import {useCurrency} from "../../Contexts/CurrencyExchange"

const Navbar = () => {
  const { setCurrency } = useCurrency();
  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };
    const { theme, toggleTheme } = useTheme();
     const navigate = useNavigate();

  const [showcurrency,setshowcurrency]=useState(false);
  const [showcategory,setshowcategory]=useState(false);


  return (
    <div className='Navbar'>
        <div className="dark-light-toggler">
          <div className='toggler_button' onClick={toggleTheme}>
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/>
              </svg>
            )}
          </div>
        </div>
        <div className="main_navbar" id={theme} >
            <h3 onClick={()=>navigate("/")}>HOME</h3>
            <h3 onClick={()=>navigate("/Category/men")}>MEN</h3>
            <h3 onClick={()=>navigate("/Category/women")}>WOMEN</h3>
            <h3 onClick={()=>{navigate("/Cartpage")}}>CART</h3>
        </div>

        <div className="phone_navbar" style={{display:"none"}}>
            <img src="/Images/logo.png" alt=""  style={{height:"24px",width:"24px",marginRight:'5px'}}/>
            <h2>VOLMANT</h2>
        </div>
        <div className="options">
        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>navigate('/Login')} height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
        <svg  onClick={()=>navigate("/Cartpage")} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M292-120q-38 0-65-27.5T200-213v-371l-73-176H40v-80h141l66 160h591q23 0 35 19t1 39L760-399q51 8 85.5 47t34.5 92q0 58-40.5 99T741-120q-59 0-99.5-41T601-260q0-20 5-37t14-33l-131-12-120 180q-13 20-33.5 31T292-120Zm382-285 99-195H280l50 120q8 20 25.5 33.5T396-431l278 26ZM293-201q2 0 9-5l97-144q-49-5-77-23.5T280-412v200q0 5 4 8t9 3Zm447 1q26 0 43-17.5t17-42.5q0-26-17-43t-43-17q-25 0-42.5 17T680-260q0 25 17.5 42.5T740-200Zm-66-205-278-26 278 26Z"/></svg>
        <svg id='hide_phone' onClick={()=>{setshowcategory(!showcategory),setshowcurrency(false)}}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z"/></svg>
        <svg id='hide_phone' onClick={()=>{setshowcurrency(!showcurrency),setshowcategory(false)}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40Zm-36-160v-52q-47-11-76.5-40.5T324-370l66-26q12 41 37.5 61.5T486-314q33 0 56.5-15.5T566-378q0-29-24.5-47T454-466q-59-21-86.5-50T340-592q0-41 28.5-74.5T446-710v-50h70v50q36 3 65.5 29t40.5 61l-64 26q-8-23-26-38.5T482-648q-35 0-53.5 15T410-592q0 26 23 41t83 35q72 26 96 61t24 77q0 29-10 51t-26.5 37.5Q583-274 561-264.5T514-250v50h-70ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Z"/></svg>
        <svg id='show_phone' style={{display:"none"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
        {showcategory ?
      <div className='select_options'>
        <select 
          className='select_options'
          onChange={(e) => {
            const value = e.target.value;
            if (value === "men") navigate("/category/men");
            if (value === "women") navigate("/category/women");
          }}
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>
      :null}
      {showcurrency ?
      <div className='select_options'>
        <select onChange={handleCurrencyChange} className='select_options'>
      <option value="INR">₹ INR</option>
      <option value="USD">$ USD</option>
      <option value="EUR">€ EUR</option>
    </select>
    </div>
      :null}

        </div>
    </div>
  )
}

export default Navbar
