export type Qr = {
    _id: string;
    code: string;
    times : number;
    name?:string;
    phone?:string; 
    userTimes?:number;
    scans?:Scan[]
}


export type Scan= {
        datetime:Date ; 
}