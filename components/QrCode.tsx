import React from 'react';
import { useQRCode } from 'next-qrcode';

export default function QrCode(props: any) {
    const { Canvas } = useQRCode();
 
  return (
    <Canvas
      text={props.children} 
      options={{
        level: 'M',
        margin: 3,
        scale: 4,
        width: 100,
        color: {
          dark: '#010599FF',
          light: '#FFBF60FF',
        },
      }}
    />
  );
}
 