import { useEffect, useState } from "react"
import ClientCollection from "../Backend/db/ClientCollection"
import Client from "../models/Client"
import ClientRespository from "../models/ClientRepository"

export default function useClients(){
  const repo: ClientRespository = new ClientCollection()
  
  const [client, setClient] = useState<Client>(Client.void())
  const [clients, setClients] = useState<Client[]>([])
  const [view, setView] = useState<'table' | 'form'>('table')

  useEffect(() => {
    const unsubscribe = repo.subscribe(clients => {
      setClients(clients)
    })
    return () => unsubscribe()
  })

  function getAll(){
    repo.getAll().then(clients => {
      setClients(clients)
      setView('table')
    })
  }

  async function saveClient(client: Client) {
    await repo.save(client)
    setView('table') 
  }

  function selectClient(client: Client){
    setClient(client)
    setView('form')
  }

  async function eraseClient(client: Client) {
    await repo.delete(client)
  }

  function newClient(){
    setClient(Client.void())
    setView('form')
  }

  return {
    client,
    clients,
    view,
    setView,
    newClient,
    eraseClient,
    selectClient,
    saveClient
  }
}