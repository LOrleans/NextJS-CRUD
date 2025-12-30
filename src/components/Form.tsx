import { useState, useEffect } from "react";
import Input from "./Input";
import Client from "../models/Client";
import Button from "./Button";

interface FormProps {
  client?: Client
  cancel?: () => void
  clientOnChange?: (client: Client) => void
}

export default function Form(props: FormProps) {
  const id = props.client?.id ? props.client.id : null
  const [name, setName] = useState(props.client?.name ?? '')
  const [age, setAge] = useState(props.client?.age ?? 0)

  // ESSENCIAL: Atualiza o estado interno se o cliente enviado por prop mudar
  useEffect(() => {
    setName(props.client?.name ?? '')
    setAge(props.client?.age ?? 0)
  }, [props.client])

  return (
    <div>
      {id && (
        <Input readOnly text="Código" value={id} className="mb-4" />
      )}
      
      <Input 
        text="Nome" 
        value={name} 
        onChange={setName} 
        className="mb-4" 
      />
      
      <Input 
        text="Idade" 
        value={age} 
        type="number" 
        onChange={setAge} 
      />

      <div className="flex justify-end mt-7">
        <Button 
          color="blue" 
          className="mr-2" 
          onClick={() => props.clientOnChange?.(new Client(name, +age, id ? id : undefined))}
        >
          {id ? 'Alterar' : 'Salvar'}
        </Button>
        
        <Button color="gray" onClick={props.cancel}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}