import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./Dashboard.css"
const Dashboard = () => {
    const[display,setdisplay]=useState("analog")
    const navigate= useNavigate();
  return (
    <div className="dashboard_page">
        <div className="profile_section">
            <div className="welcome_text">
            <img src="https://res.cloudinary.com/dvd8yytqv/image/upload/v1754054835/download_gpltj0.png" alt="" />
            <h1>HELLO MANVITH KUMAR</h1>
            </div>
        <div className="button_container">
            <button onClick={()=>navigate("/")}>Redirect to page</button>
            <form action="https://volmant.onrender.com/api/login/logout"><button id='logout'>Logout</button></form>
        </div>
        <div className="crud_operations">
            <button onClick={()=>{setdisplay("analog")}}>Analog</button>
            <button onClick={()=>{setdisplay("digital")}}>Digital</button>
            <button onClick={()=>{setdisplay("Smartwatch")}}>Smart Watch</button>
            <button onClick={()=>{setdisplay("Retro")}}>Retro</button>
            <button onClick={()=>{setdisplay("Customers")}}>Customers</button>
            <button onClick={()=>{setdisplay("promoted")}}>Promoted</button>
        </div>
        <div className="crud_container">
            {display==="analog" ?
            <div className="forms_container">
            <form action="https://volmant.onrender.com/api/analog/create" method='post'>
                <h3>CREATE ANALOG</h3>
                <input type="text" placeholder='Enter Watch-Name' autoComplete='off'   name='watchname'/>
                <input type="text" placeholder='Enter Image-url' autoComplete='off'   name='ImageUrl'/>
                <input type="text" placeholder='Price in rupees'  autoComplete='off'   name='Rupee'/>
                <input type="text" placeholder='Price in Dollars'  autoComplete='off'   name='Dollar'/>
                <input type="text" placeholder='Price in Euros' autoComplete='off'   name='Euro' />
                <textarea id="" name='specification' autoComplete='off'   placeholder='Enter Specifications'></textarea>
                <select name='gender'>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Both</option>
                </select>
                <button>Submit</button>
            </form>
            <form action="https://volmant.onrender.com/api/analog/edit" method='post'>
                <h3>EDIT ANALOG</h3>
                <input type="text" placeholder='ID of Item to change' autoComplete='off'  name='edit_id'/>
                <input type="text" placeholder='Enter New Watch-Name' autoComplete='off'   name='watchname'/>
                <input type="text" placeholder='Enter New Image-url'  autoComplete='off'  name='ImageUrl'/>
                <input type="text" placeholder='New Price in rupees'  autoComplete='off'   name='Rupee'/>
                <input type="text" placeholder='New Price in Dollars' autoComplete='off'    name='Dollar'/>
                <input type="text" placeholder='New Price in Euros' autoComplete='off'   name='Euro' />
                <textarea id="" name='specification' autoComplete='off'  placeholder='Enter Specifications'></textarea>
                <select name='gender'>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Both</option>
                </select>
                <button>Save Changes</button>
            </form>
            <div className="delete_view">
            <form action="https://volmant.onrender.com/api/analog/view" method='get'>
                <button>View All Analog Watches</button>
            </form>
            <div>
            <form action="https://volmant.onrender.com/api/analog/deleteid" method='post'>
                <input type="text"  placeholder='Enter id' name='deletebyid'/>
                <button>Delete selected one</button>
            </form>
            </div>
            <div>
                <form action="https://volmant.onrender.com/api/analog/deleteall" method='post' style={{height:"max-content"}}>
                <button
                  onClick={(e) => {
                    if (!window.confirm("Are you sure you want to delete all analog watches?")) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete all
                </button>
                </form>
            </div>
            </div>
            </div>
            :null}
              {display==="digital" ?
            <div className="forms_container">
            <form action="https://volmant.onrender.com/api/digital/create" method='post'>
                <h3>CREATE DIGITAL</h3>
                <input type="text" placeholder='Enter Watch-Name' autoComplete='off'   name='watchname'/>
                <input type="text" placeholder='Enter Image-url' autoComplete='off'   name='ImageUrl'/>
                <input type="text" placeholder='Price in rupees'  autoComplete='off'   name='Rupee'/>
                <input type="text" placeholder='Price in Dollars' autoComplete='off'    name='Dollar'/>
                <input type="text" placeholder='Price in Euros'autoComplete='off'    name='Euro' />
                <textarea id="" name='specification' autoComplete='off'  placeholder='Enter Specifications'></textarea>
                <select name='gender'>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Both</option>
                </select>
                <button>Submit</button>
            </form>
            <form action="https://volmant.onrender.com/api/digital/edit" method='post'>
                <h3>EDIT DIGITAL</h3>
                <input type="text" placeholder='ID of Item to change' autoComplete='off'  name='edit_id'/>
                <input type="text" placeholder='Enter New Watch-Name' autoComplete='off'   name='watchname'/>
                <input type="text" placeholder='Enter New Image-url'  autoComplete='off'  name='ImageUrl'/>
                <input type="text" placeholder='New Price in rupees'  autoComplete='off'   name='Rupee'/>
                <input type="text" placeholder='New Price in Dollars' autoComplete='off'    name='Dollar'/>
                <input type="text" placeholder='New Price in Euros' autoComplete='off'   name='Euro' />
                <textarea id="" name='specification' autoComplete='off'  placeholder='Enter Specifications'></textarea>
                <select name='gender'>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Both</option>
                </select>
                <button>Save Changes</button>
            </form>
            <div className="delete_view">
            <form action="https://volmant.onrender.com/api/digital/view" method='get'>
                <button>View All Digital Watches</button>
            </form>
            <div>
            <form action="https://volmant.onrender.com/api/digital/deleteid" method='post'>
                <input type="text"  placeholder='Enter id' name='deletebyid'/>
                <button>Delete selected one</button>
            </form>
            </div>
            <div>
                <form action="https://volmant.onrender.com/api/digital/deleteall" method='post' style={{height:"max-content"}}>
                <button
                  onClick={(e) => {
                    if (!window.confirm("Are you sure you want to delete all analog watches?")) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete all
                </button>
                </form>
            </div>
            </div>
            </div>
            :null}
              {display==="Smartwatch" ?
                 <div className="forms_container">
                 <form action="https://volmant.onrender.com/api/smartwatch/create" method='post'>
                     <h3>CREATE SMART WATCH</h3>
                     <input type="text" placeholder='Enter Watch-Name' autoComplete='off'   name='watchname'/>
                     <input type="text" placeholder='Enter Image-url' autoComplete='off'   name='ImageUrl'/>
                     <input type="text" placeholder='Price in rupees'  autoComplete='off'   name='Rupee'/>
                     <input type="text" placeholder='Price in Dollars' autoComplete='off'    name='Dollar'/>
                     <input type="text" placeholder='Price in Euros'autoComplete='off'    name='Euro' />
                     <textarea id="" name='specification' autoComplete='off'  placeholder='Enter Specifications'></textarea>
                     <select name='gender'>
                     <option value="men">Men</option>
                     <option value="women">Women</option>
                     <option value="unisex">Both</option>
                     </select>
                     <button>Submit</button>
                 </form>
                 <form action="https://volmant.onrender.com/api/smartwatch/edit" method='post'>
                     <h3>EDIT SMART WATCH</h3>
                     <input type="text" placeholder='ID of Item to change' autoComplete='off'  name='edit_id'/>
                     <input type="text" placeholder='Enter New Watch-Name' autoComplete='off'   name='watchname'/>
                     <input type="text" placeholder='Enter New Image-url'  autoComplete='off'  name='ImageUrl'/>
                     <input type="text" placeholder='New Price in rupees'  autoComplete='off'   name='Rupee'/>
                     <input type="text" placeholder='New Price in Dollars' autoComplete='off'    name='Dollar'/>
                     <input type="text" placeholder='New Price in Euros' autoComplete='off'   name='Euro' />
                     <textarea id="" name='specification' autoComplete='off'  placeholder='Enter Specifications'></textarea>
                     <select name='gender'>
                     <option value="men">Men</option>
                     <option value="women">Women</option>
                     <option value="unisex">Both</option>
                     </select>
                     <button>Save Changes</button>
                 </form>
                 <div className="delete_view">
                 <form action="https://volmant.onrender.com/api/smartwatch/view" method='get'>
                     <button>View All SMART-WATCHES</button>
                 </form>
                 <div>
                 <form action="https://volmant.onrender.com/api/smartwatch/deleteid" method='post'>
                     <input type="text"  placeholder='Enter id' name='deletebyid'/>
                     <button>Delete selected one</button>
                 </form>
                 </div>
                 <div>
                     <form action="https://volmant.onrender.com/api/smartwatch/deleteall" method='post' style={{height:"max-content"}}>
                     <button
                       onClick={(e) => {
                         if (!window.confirm("Are you sure you want to delete all analog watches?")) {
                           e.preventDefault();
                         }
                       }}
                     >
                       Delete all
                     </button>
                     </form>
                 </div>
                 </div>
                 </div>
            :null}
              {display==="Retro" ?
               <div className="forms_container">
               <form action="https://volmant.onrender.com/api/retro/create" method='post'>
                   <h3>CREATE RETRO WATCH</h3>
                   <input type="text" placeholder='Enter Watch-Name' autoComplete='off'   name='watchname'/>
                   <input type="text" placeholder='Enter Image-url' autoComplete='off'   name='ImageUrl'/>
                   <input type="text" placeholder='Price in rupees'  autoComplete='off'   name='Rupee'/>
                   <input type="text" placeholder='Price in Dollars' autoComplete='off'    name='Dollar'/>
                   <input type="text" placeholder='Price in Euros'autoComplete='off'    name='Euro' />
                   <textarea id="" name='specification' autoComplete='off'  placeholder='Enter Specifications'></textarea>
                   <select name='gender'>
                   <option value="men">Men</option>
                   <option value="women">Women</option>
                   <option value="unisex">Both</option>
                   </select>
                   <button>Submit</button>
               </form>
               <form action="https://volmant.onrender.com/api/retro/edit" method='post'>
                   <h3>EDIT RETRO WATCH</h3>
                   <input type="text" placeholder='ID of Item to change' autoComplete='off'  name='edit_id'/>
                   <input type="text" placeholder='Enter New Watch-Name' autoComplete='off'   name='watchname'/>
                   <input type="text" placeholder='Enter New Image-url'  autoComplete='off'  name='ImageUrl'/>
                   <input type="text" placeholder='New Price in rupees'  autoComplete='off'   name='Rupee'/>
                   <input type="text" placeholder='New Price in Dollars' autoComplete='off'    name='Dollar'/>
                   <input type="text" placeholder='New Price in Euros' autoComplete='off'   name='Euro' />
                   <textarea id="" name='specification' autoComplete='off'  placeholder='Enter Specifications'></textarea>
                   <select name='gender'>
                   <option value="men">Men</option>
                   <option value="women">Women</option>
                   <option value="unisex">Both</option>
                   </select>
                   <button>Save Changes</button>
               </form>
               <div className="delete_view">
               <form action="https://volmant.onrender.com/api/retro/view" method='get'>
                   <button>View All RETRO WATCH</button>
               </form>
               <div>
               <form action="https://volmant.onrender.com/api/retro/deleteid" method='post'>
                   <input type="text"  placeholder='Enter id' name='deletebyid'/>
                   <button>Delete selected one</button>
               </form>
               </div>
               <div>
                   <form action="https://volmant.onrender.com/api/retro/deleteall" method='post' style={{height:"max-content"}}>
                   <button
                     onClick={(e) => {
                       if (!window.confirm("Are you sure you want to delete all analog watches?")) {
                         e.preventDefault();
                       }
                     }}
                   >
                     Delete all
                   </button>
                   </form>
               </div>
               </div>
               </div>
            :null}
            { display==="Customers" ?
             <div className="forms_container">
              <div className="customer_form">
             <form action="https://volmant.onrender.com/api/login/userlist" method='get'>
                 <button>View Users</button>
             </form>
             <form action="https://volmant.onrender.com/api/login/deleteid" method='post'>
              <input type="text" placeholder='Enter id' name='id_user' />
              <button>Delete user</button>
             </form>
             <form action="https://volmant.onrender.com/api/login/deleteall" method='post'>
             <button
               onClick={(e) => {
                 if (!window.confirm("Are you sure you want to delete all users?")) {
                   e.preventDefault();
                 }
               }}
             >
               Delete All Users
             </button>
             </form>
              </div>
             </div>
             :null
            }
            {display==="promoted" ?
            <div style={{display:"flex",flexDirection:"row"}}>
            <div className="forms_container"style={{display:"flex",flexDirection:"row"}} >
            <form method='post' action="https://volmant.onrender.com/api/promoted/add">
            <h1>Homepage Promotion</h1>
              <input type="text" placeholder='WatchName' name='watchname'   autoComplete='off'/>
              <input type="text" placeholder='WatchUrl'    name='ImageUrl'  autoComplete='off'/>
              <input type="text" placeholder='Rupees'   name='Rupee'  autoComplete='off'/>
              <input type="text" placeholder='Dollars'   name='Dollar'  autoComplete='off'/>
              <input type="text" placeholder='Euros'   name='Euro'  autoComplete='off'/>
              <button>Submit</button>
            </form>
            <div className='customer_form2'> 
            <form action="https://volmant.onrender.com/api/promoted/view" method='get'>
            <button>View Promoted</button>
            </form>
            <form action="https://volmant.onrender.com/api/promoted/delete" method='post' style={{paddingTop:"15px"}}>
            <input type="text" placeholder='enter id' name='user_id' autoComplete='off'/>
            <button>submit</button>
            </form>
            </div>
            </div>
            </div>
            :null}
        </div>
        </div>
    </div>
  )
}

export default Dashboard
