import React from "react";

interface City {
  nome: string;
}

export function useApiCity() {
  const [cities, setCities] = React.useState<string[]>([]);
  React.useEffect(() => {
    const ApiCity =
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados/MG/municipios";

    const fetchCities = async (): Promise<void> => {
      try {
        const response = await fetch(ApiCity);
        if (!response.ok) {
          throw new Error("Erro ao obter os dados dos municípios");
        }
        const data = await response.json();

        const cityNames = data.map((city: City) => city.nome);
        setCities(cityNames);
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    };

    fetchCities();
  }, []);

  return {
    cities,
  };
}
