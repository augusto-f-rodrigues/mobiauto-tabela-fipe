'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/constants/api.constant';
import { ResponsePriceI } from '@/interfaces/response.interface';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Result = () => {
  const { vehicle, brand, model, year } = useSelector(
    (state: RootState) => state.data
  );
  const [price, setPrice] = useState<ResponsePriceI | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (vehicle && brand && model && year) {
      const fetchPrice = async () => {
        try {
          const response = await axios.get<
            any,
            AxiosResponse<ResponsePriceI, any>
          >(
            `${API_BASE_URL}/${vehicle}/marcas/${brand.codigo}/modelos/${model.codigo}/anos/${year.codigo}`
          );
          setPrice(response.data);
        } catch (error) {
          console.error('Erro ao buscar preço:', error);
        }
      };
      fetchPrice();
    }
  }, [vehicle, brand, model, year]);

  const onClickBackButton = (event: React.FormEvent) => {
    router.push('/');
  };

  return (
    <main className="main-container bg-teal-100">
      {price ? (
        <>
          <h1 className="text-h1 mb-4">
            Tabela Fipe: Preço {brand?.nome} {model?.nome} {year?.nome}
          </h1>
          <div className="bg-teal-600 px-6 py-2 rounded-full mb-4">
            <span className="text-2xl font-semibold text-white">
              {price.Valor}
            </span>
          </div>
          <p className="text-center text-sm">
            Este é o preço de compra do veículo
          </p>
        </>
      ) : (
        <p className="mb-6">Carregando...</p>
      )}
      <Button
        className="px-8 py-2 col-span-4 normal-case bg-teal-600 hover:bg-teal-500 mt-4"
        variant="contained"
        onClick={onClickBackButton}
      >
        <span>Voltar</span>
      </Button>
    </main>
  );
};

export default Result;
