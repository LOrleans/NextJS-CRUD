export default function Title(props: any){
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="px-7 py-2 text-3xl">{props.children}</h1>
      <hr className="border-2 border-purple-900 w-full rounded-md"/>
    </div>
  )
}