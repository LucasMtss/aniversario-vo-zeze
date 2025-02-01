"use client";

import { toast, Toaster } from 'sonner';
import '../styles/globals.css';
import { useState } from "react";
import { TrashIcon } from '@heroicons/react/16/solid';

interface IAddedName {
  name: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [addedNames, setAddedNames] = useState<IAddedName[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      names: addedNames.concat([{ name }]).filter(item => item.name.length).map(item => item.name)
    };
    const response = await fetch('/api/presence-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      toast.success('Presença confirmada!');
      setName('');
      setAddedNames([]);
    } else {
      const errorResponse = await response.json();
      console.log('Error Response:', errorResponse);
      toast.error('Erro ao salvar presença. ' + errorResponse);
    }
  };

  function addNewName() {
    setAddedNames(prev => [...prev, { name: '' }]);
  }

  function deleteName(index: number) {
    setAddedNames(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-stone-50 p-2 flex flex-col items-center">
      <div className='flex flex-col items-center border border-purple-200 px-4 py-8 h-full w-full'>
        <Toaster richColors position="top-right" closeButton />
        <h1 className="font-bold text-2xl mb-3 text-slate-600">Aniversário da Vó Zezé</h1>
        <p>Convidamos você para comemorar o aniversário da vó Zezé. Haverá missa no Santuário de Nossa Senhora das Mercês e após a missa, almoço no Sítio Dornelas.</p>
        <div className="w-full mt-4">
          <hr />
        </div>
        <div className="flex flex-col w-full my-2 ">
          <p>Data: <strong>22/02/2025</strong></p>
          <p>Horário: <strong>10h</strong></p>
          <p>Local: <strong>Santuário de Nossa Senhora das Mercês</strong></p>
        </div>
        <div className="w-full mt-4">
          <hr />
        </div>
        <h1 className="font-bold text-xl mt-8 mb-3 text-slate-600">Confirme sua presença</h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <div className='flex justify-between items-center mb-4'>
            <label className='w-full flex items-center'>
              Nome:
              <input
                className="border-b border-slate-800 rounded-lg px-4 py-2 ml-2 text-base w-[90%]"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
           
          </div>
          {
            addedNames.map((name, index) => {
              return (
                <div key={index} className='flex justify-between items-center mb-4'>
                  <label className='w-full flex items-center'>
                    Nome:
                    <input
                      className="border-b border-slate-800 rounded-lg px-4 py-2 ml-2 text-base w-[90%]"
                      type="text"
                      value={name.name}
                      onChange={(e) => {
                        const newNames = [...addedNames];
                        newNames[index].name = e.target.value;
                        setAddedNames(newNames);
                      }}
                      required
                    />
                  </label>
                  <button className='bg-indigo-400 w-8 h-8 rounded-full text-slate-50 p-1 ml-3'>
                    <TrashIcon className="" onClick={() => deleteName(index)} />
                  </button>
                </div>
              )
            })
          }
          <button onClick={addNewName} className="font-bold bg-fuchsia-300 text-slate-50 px-4 py-2 mx-auto rounded-lg mt-8 w-full" type="button">{isLoading ? 'Carregando' : 'Adicionar nova pessoa'}</button>
          <button className="font-bold bg-indigo-400 text-slate-50 px-4 py-2 mx-auto rounded-lg mt-4 w-full" type="submit">{isLoading ? 'Carregando' : 'Confirmar Presença'}</button>
        </form>
      </div>
    </div>
  );
}
