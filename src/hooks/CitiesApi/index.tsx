interface City {
  nome: string;
}
const ApiCity =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados/MG/municipios";
const CitiesApi = async (): Promise<string[]> => {
  try {
    const response = await fetch(ApiCity);
    if (!response.ok) {
      throw new Error("Erro ao obter os dados dos municípios");
    }
    const data = await response.json();

    const cityNames = data.map((city: City) => city.nome);

    return cityNames;
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    return [];
  }
};

export default CitiesApi;
