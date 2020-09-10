import React from 'react';

export const Popup = (props) => (

    <div style={{ position: "fixed", width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "rgba(0, 0, 0, .6)", zIndex: 9998 }}>
        <div style={{ position: "fixed", width: "400px", top: "10%", left: "45%", zIndex: 9999, background: "#fff", padding: "70px" }}>
            <p>Login</p>
            <input type="text" id='login' name='login' />
            <p>Password</p>
            <input type="password" id='password' name='password' />
            <hr />
            <button onClick={props.checkUser} > SIGN IN</button>
            <button onClick={props.innerCloser}>Cancel</button>
        </div>
    </div>
);