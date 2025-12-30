import { useState } from "react";
import Input from "./Input";
import Client from "../models/Client";
import Button from "./Button";

interface FormProps {
  client?: Client
  cancel?: () => void
  clientOnChange?: (client: Client) => void
}

export default function Form(props: FormProps) {
  const id = props.client?.id
  const [name, setName] = useState(props.client?.name ?? '')
  const [age, setAge] = useState(props.client?.age ?? 0)

  return (
    <div>
      {id ? (
        <Input readOnly text="Code" value={id} className="mb-2"></Input>
      ) : false }
      <Input text="Name" value={name} onChange={setName} className="mb-2"></Input>
      <Input text="Age" value={age} type="number" onChange={setAge}></Input>
      <div className="flex justify-end mt-7">
        <Button color="blue" className="mr-2" onClick={() => props.clientOnChange?.(new Client(name, +age, id))}>
          {id ? 'Change' : 'Save'}
        </Button>
        <Button color="gray" onClick={props.cancel}>Cancel</Button>
      </div>
    </div>
  )
}