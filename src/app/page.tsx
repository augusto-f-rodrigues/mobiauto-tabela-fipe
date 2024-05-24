'use client';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const [vehicle, setVehicle] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setVehicle(event.target.value as string);
  };

  return (
    <main className="main-container">
      <h1 className='text-2xl font-extrabold mb-2'>Tabela Fipe</h1>
      <h2 className='text-center font-extrabold mb-2'>Consulte o valor de um veículo de forma gratuita</h2>
      <div className='bg-white min-w-80 border border-gray-500 rounded-lg border-opacity-20 p-8 max-w-96 '>
        <FormControl fullWidth>
          <InputLabel id="vehicle-label">Veículo</InputLabel>
          <Select
            labelId="vehicle-label"
            id="vehicle-select"
            value={vehicle}
            label="Veículo"
            onChange={handleChange}
          >
            <MenuItem value={'carros'}>Carros</MenuItem>
            <MenuItem value={'motos'}>Motos</MenuItem>
            <MenuItem value={'caminhoes'}>Caminhões</MenuItem>
          </Select>
        </FormControl>
      </div>
    </main>
  );
}
