import React from 'react'
import image1 from '../../images/image6.png'
import './welcome.css'


function welcome() {
    


    return (
        <div>

           {/* <p>WELCOME TO </p><br></br> */}


            <div>
                <span>
                    

                    <p id="para1">WELCOME TO </p><br></br>

                </span>
                
                
            </div>

            <div class="patterns">
                <svg width="100%" height="100%">
                    <defs>

                        <pattern id="polka-dots" x="0" y="0"                    
                            width="100" height="100"
                            patternUnits="userSpaceOnUse">
                            
                            <circle fill="#be9ddf" cx="25" cy="25" r="3"></circle>
                
                        </pattern>  
        
                    </defs>
                   
              
                    <text x="50%" y="60%"    >
                        Amigoes
                    </text>
                </svg>
            </div>
            <div>
                <span id = "para2">
                    Shopping the way you like it...
                </span>
            </div>
 
            
            
            <div>
                <img src={image1} id="image1"/>
            </div>  

            
        </div>
    )
}

export default welcome