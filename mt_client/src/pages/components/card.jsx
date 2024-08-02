import { useState, useEffect } from 'react'

const Card = (Uname,Content,Meta) => {
    const cardStyle = {
      width: '300px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      backgroundColor: '#ffffff',
    };
  
    const headerStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    };
  
    const avatarStyle = {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '12px',
    };
  
    const usernameStyle = {
      fontWeight: 'bold',
      color:'black',
    };
  
    const contentStyle = {
      marginBottom: '12px',
      color:'black',
    };
  
    const imageStyle = {
      width: '100%',
      borderRadius: '8px',
    };
  
    const actionsStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#666666',
      fontSize: '14px',
    };
  
    return (
      <div style={cardStyle}>
        <div style={headerStyle}>
          {/*<img style={avatarStyle} src="avatar.jpg" alt="User Avatar" />*/}
          {Uname.length>0?
                <div style={usernameStyle}>John Doe</div>
                :
                <></>
          }
        </div>
        {
            Content.length>0?
            <>
            <div style={contentStyle}>
                {Content}
            </div>
            </>:
            <></>
        }
        
        {/*<img style={imageStyle} src="post-image.jpg" alt="Post Image" />*/}
        {
            Meta!=false?                
                <div style={actionsStyle}>
                    <span>Like</span>
                    <span>Comment</span>
                    <span>Share</span>
                </div>
            :
            <></>
        }
        
      </div>
    );
  };
  
  export default Card;