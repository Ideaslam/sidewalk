import React, { useState } from "react";
import Layout from "../../components/Layout";
import config from "../../config";
var baseUrl =config.BaseUrl; 

export default function AddQr() { 
    const [times, setTimes] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e:any )=>{
        e.preventDefault();
        if(times){
            try{
                let response =await fetch(baseUrl+'/api/qr/addQr', {
                    method: 'POST',
                    body: JSON.stringify({
                        times
                    }),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
               
                setTimes('');
                setError('');
                setMessage('Qr added successfully');

            }catch(errorMessage: any) {
                setError(errorMessage);
            }
        }else {
            return setError('All fields are required') ; 
        }

    }


    return (
        <Layout>
            <form onSubmit={handleSubmit} className="form">
                {
                    error ? (
                        <div className="alert-error">
                            {error}
                        </div>
                    ) : null
                }
                {
                    message ? (
                        <div className="alert-message">
                            {message}
                        </div>
                    ) : null
                }
                
                <div className="form-group">
                    <label>Times</label>
                    <input
                        name="times"
                        type="number"
                        value={times}
                        onChange={e => setTimes(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit_btn">Add Qr</button>
                </div>
            </form>
            <style jsx>
                {`
                    .form{
                        width:400px;
                        margin:10px auto;
                    }
                    .form-group{
                        width:100%;
                        margin-bottom:10px;
                        display:block;
                    }
                    .form-group label{
                        display:block;
                        margin-bottom:10px;
                    }
                    .form-group input[type="text"]{
                        padding:10px;
                        width:100%;
                    }
                    .form-group textarea{
                        padding:10px;
                        width:100%;
                    }
                    .alert-error{
                        width:100%;
                        color:red;
                        margin-bottom:10px;
                    }
                    .alert-message{
                        width:100%;
                        color:green;
                        margin-bottom:10px;
                    }
                `
                }
            </style>
        </Layout>
    )


}