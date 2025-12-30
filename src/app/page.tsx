'use client'

import Image from "next/image";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../models/Client";
import Button from "../components/Button";
import Form from "../components/Form";
import { useState } from "react";

export default function Home() {
  const [client, setClient] = useState<Client>(Client.void())
  const [view, setView] = useState<'table' | 'form'>('table')

  const clients = [
    new Client('Ana', 34, '1'),
    new Client('Bia', 45, '2'),
    new Client('Carlos', 23, '3'),
    new Client('Pedro', 53, '4'),
  ]

  function saveClient(client: Client){
    console.log(client)
    setView('table')
  }

  function clientMarked(client: Client){
    setClient(client)
    setView('form')
  }

  function clientErased(client: Client){
    console.log(`Excluir... ${client.name}`)
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
              <Button color="green" className="mb-4" onClick={newClient}>New Client</Button>
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
