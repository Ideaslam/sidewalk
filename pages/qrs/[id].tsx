import React, { useState } from "react";
import type {
    GetStaticPropsContext,
    GetStaticPropsResult,
} from 'next';
import Layout from '../../components/Layout';
import { Qr } from "../../types/qr";
import config from "../../config";

var baseUrl=config.BaseUrl;

type PageParams = {
    id: string
}

type ContentPageProps = {
    qr: Qr;
}

 
type ResponseFromServer = {
    code: string;
    times: number;
    _id: string
}

export async function getStaticProps({
    params
}: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {
        console.log('num1 ')
        let response = await fetch(baseUrl+'/api/qr/getQr?id=' + params?.id);

        let responseFromServer: ResponseFromServer = await response.json();
        console.log(responseFromServer)
        return {
            // Passed to the page component as props
            props: {
                qr: {
                    _id: responseFromServer._id,
                    code: responseFromServer.code,
                    times: responseFromServer.times
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
 

    let qrs = await fetch(baseUrl+'/api/qr/getQrs');

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

export default function EditQr({ qr: { _id, code, times } }: ContentPageProps) {
    console.log(code)
    const [qrCode, setQrCode] = useState(code);
    const [qrTimes, setQrTimes] = useState(times);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (qrCode && qrTimes) {
            try {
                let response = await fetch(baseUrl+'/api/qr/editQr?id=' + _id, {
                    method: 'POST',
                    body: JSON.stringify({
                        code: qrCode,
                        times: qrTimes
                    }),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                setQrCode('');
                setQrTimes(0);
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
    if (!qrCode && !qrTimes && !_id && process.browser) {
        console.log(qrCode)
        console.log(qrTimes)
        console.log(_id)
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
                    <label>Code</label>
                    <input type="text"
                        placeholder="Code of the Qr"
                        onChange={e => setQrCode(e.target.value)}
                        value={qrCode ? qrCode : ''}
                    />
                </div>
                <div className="form-group">
                    <label>Times</label>
                    <input type="number" 
                        onChange={e => setQrTimes(e.target.valueAsNumber)}
                        value={qrTimes ? qrTimes : 0}
                    />
 
                </div>
                <div className="form-group">
                    <button type="submit" className="submit_btn">Update</button>
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