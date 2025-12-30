interface ButtonProps {
  color?: 'green' | 'blue' | 'gray'
  className?: string
  children?: any
  onClick?: () => void
}

export default function Button(props: ButtonProps){
  return (
    <div onClick={props.onClick} className={`inline-flex text-white bg-linear-to-r from-${props.color}-400 to-${props.color}-700 px-4 py-2 rounded-md mb-4 cursor-pointer ${props.className}`}>
      {props.children}
    </div>
  )
}