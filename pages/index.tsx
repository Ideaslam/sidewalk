import Layout from '../components/Layout';
import { useState } from 'react';
import QrCode from '../components/QrCode';
import { Qr } from '../types/qr';
import config from '../config';
 
var baseUrl = config.BaseUrl;
type Props = {
  qrs: [Qr]
}

 

export async function getServerSideProps() {
  try {

    let response = await fetch(baseUrl+'/api/qr/getQrs');
    let qrs = await response.json();
    console.log(qrs);

    return {
      props: { qrs: JSON.parse(JSON.stringify(qrs))    },
      
    };
  } catch (e) {
    console.error(e);
    return {
      props: {},
    };
  }
}



export default function Qrs(props: Props) {

  const [qrs, setQrs] = useState<[Qr]>(props.qrs);

  const handleDeleteQr = async (qrId: string) => {
    try {
      let response = await fetch(baseUrl+'/api/qr/deleteQr?id=' + qrId, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }
  }

  return (
    <Layout>
      <div className="qrs-body"> 
        {
          qrs.length > 0 ? (
            <ul className="qrs-list">
              {qrs.map((qr, index) => {
                return (
                  <li key={index} className="qr-item">
                    <div className="qr-item-details">
                      
                        <div className="col-4"> 
                          <p>User :<b> {qr.name ?? 'Not Active'}</b></p>
                          <p>Maximum Usage :<b> {qr.times}</b></p>
                          <p>User Usage :<b> {qr.userTimes ?? 0}</b></p>
                        </div>
                        <div className="col-6">
                          <QrCode> {baseUrl+'/qrs/inform/'+qr.code}</QrCode>
                        </div>
                       
                    </div>
                    <div className="qr-item-actions">
                      <a href={`/qrs/${qr._id} `}>Edit</a>
                       {qr.name == null ? <a href={`/qrs/activate/${qr._id} `}>Activate</a> : null}
                      
                      <button onClick={() => handleDeleteQr(qr._id as string)}>Delete</button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <h2 className="qrs-body-heading">Ooops! No qrs added so far</h2>
          )
        }
      </div>
      <style jsx>
        {
          `
        .qrs-body{
            width:400px;
            margin:10px auto;
        }
        .qrs-body-heading{
            font-family:sans-serif;
        }
        .qrs-list{
            list-style-type:none;
            display:block;
        }
        .qr-item{
            width:100%;
            padding:10px;
            border: 1px solid #d5d5d5;
        }
        .qr-item-details{
          display:flex;
          justify-content:space-between;
        }
        .qr-item-actions{
            display:flex;
            justify-content:space-between;
        }
        .qr-item-actions a{
            text-decoration:none;
        }
        `
        }
      </style>
    </Layout>
  );
}