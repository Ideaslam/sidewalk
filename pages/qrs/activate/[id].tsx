import React, { useState } from "react";
import type {
    GetStaticPropsContext,
    GetStaticPropsResult,
} from 'next';
import { Qr } from "../../../types/qr";
import Layout from "../../../components/Layout";
import config from "../../../config";
var baseUrl = config.BaseUrl;


type PageParams = {
    id: string
}

type ContentPageProps = {
    qr: Qr;
}


type ResponseFromServer = {
    code: string;
    times: number;
    phone: string;
    name: string;
    _id: string
}

export async function getStaticProps({
    params
}: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {

        let response = await fetch(baseUrl + '/api/qr/getQr?id=' + params?.id);
        console.log(response)
        let responseFromServer: ResponseFromServer = await response.json();
        console.log(responseFromServer)
        return {
            // Passed to the page component as props
            props: {
                qr: {
                    _id: responseFromServer._id,
                    code: responseFromServer.code,
                    times: responseFromServer.times,
                }
            },
        }
    } catch (e) {
        console.log('error ', e);
        return {
            props: {
                qr: {
                    _id: '',
                    code: '',

                    times: 0
                }
            }
        }
    }

}

export async function getStaticPaths() {

    try {
        let qrs = await fetch(baseUrl + '/api/qr/getQrs');

        let qrFromServer: [Qr] = await qrs.json();
        return {
            paths: qrFromServer.map((qr) => {
                return {
                    params: {
                        id: qr._id
                    }
                }
            }),
            fallback: false, // can also be true or 'blocking'
        }


    }
    catch (e) {
        console.log('error ', e);
        return {
            paths: [],
            fallback: false, // can also be true or 'blocking'
        }
    }
}

export default function ActivateQr({ qr: { _id, name, phone } }: ContentPageProps) {

    const [qrName, setQrName] = useState(name);
    const [qrPhone, setQrPhone] = useState(phone);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (qrName && qrPhone) {
            console.log(qrName)
            try {
                let response = await fetch(baseUrl + '/api/qr/activateQr?id=' + _id, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: qrName,
                        phone: qrPhone
                    }),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                setQrName('');
                setQrPhone('');
                setError('');
                setMessage('Qr edited successfully');
            } catch (errorMessage: any) {
                setError(errorMessage);
            }
        } else {
            return setError('All fields are required')
        }
    }

    // no such post exists
    if (!qrName && !qrPhone && !_id && process.browser) {
        // return window.location.href = '/';
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
                    <label>Name</label>
                    <input type="text"
                        placeholder="Full Name"
                        onChange={e => setQrName(e.target.value)}
                        value={qrName ? qrName : ''}
                    />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="text"
                        placeholder="Phone 05xxxxxxxx"
                        onChange={e => setQrPhone(e.target.value)}
                        value={qrPhone ? qrPhone : ''}
                    />
                </div>


                <div className="form-group">
                    <button type="submit" className="submit_btn">Activate</button>
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