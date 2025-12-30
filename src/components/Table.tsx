import Client from "../models/Client"
import { EditIcon, TrashIcon } from "./icons"

interface TableProps {
  clients: Client[]
  clientMarked?: (client: Client) => void
  clientErased?: (client: Client) => void
}

export default function Table(props: TableProps) {
  const showActions = props.clientMarked || props.clientErased

  function renderHeader(){
    return (
      <tr>
        <th className="text-left p-4">Code</th>
        <th className="text-left p-4">Name</th>
        <th className="text-left p-4">Age</th>
        {showActions ? <th className="text-center p-4">Actions</th> : false}
      </tr>
    )
  }

  function renderData(){
    return props.clients?.map((client, i) => {
      return (
        <tr key={client.id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className="text-left p-4">{client.id}</td>
          <td className="text-left p-4">{client.name}</td>
          <td className="text-left p-4">{client.age}</td>
          {showActions ? renderActions(client) : false}
        </tr>
      )
    })
  }

  function renderActions(client: Client){
    return (
      <td className="flex justify-center">
        {props.clientMarked ? (
          <button 
            className="flex justify-center items-center text-green-600 hover:bg-purple-50 p-2 m-1 rounded-full"
            onClick={() => props.clientMarked?.(client)}
          >
              {EditIcon}
          </button>
        ) : false }

        {props.clientErased ? (
          <button 
            className="flex justify-center items-center text-red-500 hover:bg-purple-50 p-2 m-1 rounded-full"
            onClick={() => props.clientErased?.(client)}
          >
              {TrashIcon}
          </button>
        ) : false }
      </td>
    )
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className={`bg-linear-to-r from-purple-500 to-purple-800 text-gray-100`}>
        {renderHeader()}
      </thead>
      <tbody>{renderData()}</tbody>
    </table>
  )
}