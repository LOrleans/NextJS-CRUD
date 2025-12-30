'use client'

import Image from "next/image";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../models/Client";
import Button from "../components/Button";
import Form from "../components/Form";
import { useEffect, useState } from "react";
import ClientRespository from "../models/ClientRepository";
import ClientCollection from "../Backend/db/ClientCollection";

export default function Home() {
  const repo: ClientRespository = new ClientCollection()

  const [client, setClient] = useState<Client>(Client.void())
  const [clients, setClients] = useState<Client[]>([])
  const [view, setView] = useState<'table' | 'form'>('table')

  useEffect(getAll, [])

  function getAll(){
    repo.getAll().then(clients => {
      setClients(clients)
      setView('table')
    })
  }

  async function saveClient(client: Client){
    await repo.save(client)
    getAll()
  }

  function clientMarked(client: Client){
    setClient(client)
    setView('form')
  }

  async function clientErased(client: Client){
    await repo.delete(client)
    getAll()
  }

  function newClient(){
    setClient(Client.void())
    setView('form')
  }

  return (
    <div className="flex h-screen justify-center items-center bg-linear-to-r from-purple-500 to-blue-600 text-white">
      <Layout title="Website Title" >
        {view === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button color="blue" className="mb-4" onClick={newClient}>New Client</Button>
            </div>
            <Table clients={clients} clientMarked={clientMarked} clientErased={clientErased}></Table>
          </>
        ) : (
          <Form 
            client={client}
            cancel={() => setView('table')}
            clientOnChange={saveClient}
          />
        )}
      </Layout>
    </div>
  );
}
