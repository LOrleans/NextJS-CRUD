'use client'

import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../models/Client";
import Button from "../components/Button";
import Form from "../components/Form";
import useClients from "../hooks/useClients";

export default function Home() {
  const { client, clients, view, setView, newClient, eraseClient, selectClient, saveClient} = useClients()
  
  return (
    <div className="flex h-screen justify-center items-center bg-linear-to-r from-purple-500 to-blue-600 text-white">
      <Layout title="Website Title" >
        {view === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button color="blue" className="mb-4" onClick={newClient}>New Client</Button>
            </div>
            <Table clients={clients} clientMarked={selectClient} clientErased={eraseClient}></Table>
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
