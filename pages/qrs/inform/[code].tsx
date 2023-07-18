import React, { Component, useState } from "react";
import ErrorBoundary from '../../../components/ErrorHandling';
import type {
    GetStaticPropsContext,
    GetStaticPropsResult,
} from 'next';
import { Qr } from "../../../types/qr";
import Layout from "../../../components/Layout";
import config from "../../../config";
import 'bootstrap/dist/css/bootstrap.css';
import Logo from "../../../components/Logo";

var baseUrl = config.BaseUrl;

type PageParams = {
    code: string
}

type ContentPageProps = {
    code: string
}


export async function getServerSideProps({ params }: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {

        console.log(params?.code)
        return {
            // Passed to the page component as props
            props: {
                code: params?.code ?? "",
            },
        }
    } catch (e) {
        console.log('error ', e);
        return {
            props: {
                code: ''
            }
        }
    }

}



export default function InformUser({ code }: any) {

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


    console.log(code)
    const handleInformUser = async () => {
        if (code) {
            try {
                let response = await fetch(baseUrl + '/api/qr/informUser?code=' + code, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error((await response.text()))
                }

                response = await response.json();
                setError('');
                setMessage('The User is Informed');
            } catch (error: any) {
                setError(error.message);
            }
        } else {
            return setError('All fields are required')
        }
    }



    // no such post exists
    if (!code && process.browser) {
        // return window.location.href = '/';
    }



    return (

        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Logo></Logo>

                </div>
            </div>
            <div className="row"> 
                <div className="col-12 col-md-4">
                    Please inform the car owner to relocate their vehicle if it is not parked in a suitable place.
                </div>

                <div className="col-12 col-md-6"> 
                    <h2>{message == "" ? <button className="btn btn-danger" 
                    onClick={handleInformUser}>Inform User</button> : message}</h2>
                      
                    <p>{error ?? ""}</p>
                 
                </div> 
            </div>

            <style jsx>
                {
                    `
                    .container{
                        margin:auto
                    }
 
                    `
                }
            </style>

        </div>




    )
}