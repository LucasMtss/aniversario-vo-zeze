import { supabase } from "@/client/supabase.client";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { names } = req.body;

    try {
      // Insere cada nome como uma nova linha na tabela "presencas"
      const { data, error } = await supabase
        .from('presencas')
        .insert(names.map(name => ({ nome: name })));

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      res.status(200).json({ message: 'Presenças salvas com sucesso!' });
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: error });
      res.send({
        error
      })
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
