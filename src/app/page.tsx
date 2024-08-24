'use client'

import Button from "@/components/elements/Button";
import Checkbox from "@/components/elements/Checkbox";
import Select from "@/components/elements/Select";
import Switch from "@/components/elements/Switch";
// import Image from "next/image";
import { useState } from "react";

export default function Home() {

  // localStorage.setItem('theme', '')

  const [ radio, setRadio ] = useState(true)

  const [ options, setOptions ] = useState<any[]>([ {name: 'Gabriel', age: 25}, {name: 'Mateus', age: 25}, {name: 'Joao', age: 25}, {name: 'Pedro', age: 25} ])

  const [ selected, setSelected ] = useState<any>({ name: '', age: 0 })


  return (
    
    <main className="flex flex-col gap-2 p-10 bg-background-1">
      <p className="title text-color-1" >Title</p>
      <p className="subtitle text-color-2" >Title</p>
      <p className="paragraph text-color-2" >Paragraph</p>
      <p className="button description text-color-3 font-bold" >Description</p>
      <p className="label text-color-3" >Label</p>

      <div className="border bg-background-2 flex flex-col p-4 gap-2 w-80 rounded-2xl">

        <h1 className="subtitle text-color-1">Card example</h1>

        <p className="description text-color-1">Lorem ipsum dolor sit amet</p>
        <span className="label text-color-1 w-fit bg-background-1 rounded-lg px-1 py-2">any-link-click-here.com.br</span>

        <Button onClick={()=> console.log('hehehe')} className="ml-auto">
          <span>do something</span>
        </Button>

      </div>

      <div className="border bg-background-2 flex flex-col p-4 gap-2 w-80 rounded-2xl">

        <h1 className="subtitle text-color-1">Card example</h1>

        <p className="description text-color-1">Lorem ipsum dolor sit amet</p>
        <span className="label text-primary w-fit bg-primary-opacity rounded-lg px-1 py-2">any-link-click-here.com.br</span>

        <Button onClick={()=> console.log('hehehe')} className="ml-auto bg-color-1">
          <span className="text-background-1">do something</span>
        </Button>

      </div>

      <div className="bg-background-2 flex flex-col p-4 gap-2 w-80 rounded-2xl">

        <h1 className="subtitle text-color-1">Card example</h1>

        <p className="description text-color-1">Lorem ipsum dolor sit amet</p>
        <span className="label text-color-1 w-fit bg-background-1 rounded-lg px-1 py-2">any-link-click-here.com.br</span>

        <Button onClick={()=> console.log('hehehe')} className="ml-auto bg-color-1">
          <span className="text-background-1">do something</span>
        </Button>

      </div>

      <div className="flex gap-2 items-center">

        <Switch onChange={(e)=> setRadio(e.target.checked)} value={radio}/>

        <Checkbox onChange={()=> setRadio((prev) => !prev)} value={radio}/>

        <Button onClick={()=> (console.log('hehehe'))}>
          <span>Products</span>
        </Button>

        <Button onClick={()=> setOptions((prev) => ([...prev, { name: 'henrique', age: 34}]))} className="bg-color-1">
          <span className="text-background-1">do something</span>
        </Button>

        <Select data={options} value={selected.name || 'selecione'} renderItem={(item, i) => <div key={i} onClick={()=> setSelected(item)}>{item.name}</div>} />


      </div>

    </main>
  );
}
