import Title from "./Title";

interface LayoutProps {
  title: string
  children?: any
  className?: string
}
 
export default function Layout(props: LayoutProps) {
  return (
    <div className={`flex flex-col w-2/3 text-gray-800 bg-gray-200 rounded-md ${props.className}`}>
      <div>
        <Title>
          {props.title}
        </Title>
        <div className="text-xl ml-2 p-6">
          {props.children}
        </div>
      </div>
    </div>
  )
} 