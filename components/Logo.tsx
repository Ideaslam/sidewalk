import Image from 'next/image';
 
export default function Logo() {
  return (
    <Image
      src="/logo.png"
      width={200} 
      height={200}
      alt="Sidewalk" 
    />
  )
}