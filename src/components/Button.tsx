interface ButtonProps {
  color?: 'blue' | 'gray'
  className?: string
  children?: any
  onClick?: () => void
}

export default function Button(props: ButtonProps){
  return (
    <div 
      onClick={props.onClick} 
      className={`inline-flex text-white  px-4 py-2 rounded-md mb-4 cursor-pointer bg-linear-to-r
      ${props.color === 'blue' ? 'from-blue-400 to-blue-700' : 'from-gray-400 to-gray-700'} ${props.className}`}>
      {props.children}
    </div>
  )
}