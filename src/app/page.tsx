'use client';

import { API_BASE_URL } from '@/constants/api.constant';
import { VEHICLES } from '@/constants/vehicle.constant';
import { ResponseI } from '@/interfaces/response.interface';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVehicle, setBrand, setModel, setYear } from '@/redux/data-slice';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [vehicle, setVehicleState] = useState('');
  const [brand, setBrandState] = useState<ResponseI | null>(null);
  const [brands, setBrands] = useState<ResponseI[]>([]);
  const [model, setModelState] = useState<ResponseI | null>(null);
  const [models, setModels] = useState<ResponseI[]>([]);
  const [year, setYearState] = useState<ResponseI | null>(null);
  const [years, setYears] = useState<ResponseI[]>([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleVehicleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setVehicleState(value);
    dispatch(setVehicle(value));
    setBrandState(null);
    setModelState(null);
    setModels([]);
    setYears([]);
  };

  const handleBrandChange = (event: any, newValue: ResponseI | null) => {
    setBrandState(newValue);
    dispatch(setBrand(newValue));
    setModelState(null);
    setModels([]);
    setYears([]);
  };

  const handleModelChange = (event: any, newValue: ResponseI | null) => {
    setModelState(newValue);
    dispatch(setModel(newValue));
    setYearState(null);
    setYears([]);
  };

  const handleYearChange = (event: any, newValue: ResponseI | null) => {
    setYearState(newValue);
    dispatch(setYear(newValue));
  };

  useEffect(() => {
    if (vehicle) {
      const fetchBrands = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/${vehicle}/marcas`);
          setBrands(response.data);
        } catch (error) {
          console.error('Erro ao buscar marcas:', error);
        }
      };
      fetchBrands();
    }
  }, [vehicle]);

  useEffect(() => {
    if (brand) {
      const fetchModels = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/${vehicle}/marcas/${brand.codigo}/modelos`
          );
          setModels(response.data.modelos);
        } catch (error) {
          console.error('Erro ao buscar modelos:', error);
        }
      };
      fetchModels();
    }
  }, [brand, vehicle]);

  useEffect(() => {
    if (model) {
      const fetchYears = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/${vehicle}/marcas/${brand?.codigo}/modelos/${model.codigo}/anos`
          );
          setYears(response.data);
        } catch (error) {
          console.error('Erro ao buscar anos:', error);
        }
      };
      fetchYears();
    }
  }, [model, brand, vehicle]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push('/result');
  };

  return (
    <main className="main-container">
      <h1 className="text-h1 mb-2">Tabela Fipe</h1>
      <h2 className="text-h2 mb-4">
        Consulte o valor de um veículo de forma gratuita
      </h2>
      <form className="flex flex-col justify-center items-center bg-white min-w-80 border border-gray-500 rounded-lg border-opacity-20 p-10 max-w-[500px] w-full lg:" onSubmit={handleSubmit}>
        <FormControl fullWidth className="mb-4">
          <InputLabel id="vehicle-label">Veículo</InputLabel>
          <Select
            labelId="vehicle-label"
            id="vehicle-select"
            value={vehicle}
            label="Veículo"
            onChange={handleVehicleChange}
          >
            {VEHICLES.map((vehicle: ResponseI) => (
              <MenuItem key={vehicle.codigo} value={vehicle.codigo}>
                {vehicle.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth className="mb-4">
          <Autocomplete
            disablePortal
            id="brand-autocomplete"
            options={brands}
            getOptionLabel={(option) => option.nome}
            value={brand}
            onChange={handleBrandChange}
            renderInput={(params) => <TextField {...params} label="Marca" />}
            disabled={!vehicle}
          />
        </FormControl>

        <FormControl fullWidth className="mb-4">
          <Autocomplete
            disablePortal
            id="model-autocomplete"
            options={models}
            getOptionLabel={(option) => option.nome}
            value={model}
            onChange={handleModelChange}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
            disabled={!brand}
          />
        </FormControl>

        {model && (
          <FormControl fullWidth className="mb-4">
            <Autocomplete
              disablePortal
              id="year-autocomplete"
              options={years}
              getOptionLabel={(option) => option.nome}
              value={year}
              onChange={handleYearChange}
              renderInput={(params) => <TextField {...params} label="Ano" />}
            />
          </FormControl>
        )}

        <Button
          className="px-8 py-2 col-span-4 normal-case bg-purple-700 hover:bg-purple-600"
          variant="contained"
          type="submit"
          disabled={!year}
        >
          <span>Consultar preço</span>
        </Button>
      </form>
    </main>
  );
}
