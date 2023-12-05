import React from "react";
import ShowsService from "../../service/Shows/Shows";
import { IShow } from "../../service/Shows/Shows.structure";

export function useShows() {
  const [shows, setShows] = React.useState<IShow[]>([]);
  const [filteredShows, setFilteredShows] = React.useState<IShow[]>([]);
  const [locationList, setLocationList] = React.useState<string[]>([]);

  const [busca, setBusca] = React.useState<string>("");

  //COMENTÁRIO PARA REVISAR QUAL HOOK MELHOR UTILIZAR PARA A REQUISIÇÃO E O PORQUE.
  const fetchAndSetShows = React.useMemo(async () => {
    const responseGet = await ShowsService.getShow();
    if (Array.isArray(responseGet)) {
      setShows(responseGet);
      setFilteredShows(responseGet);
    } else {
      console.error(responseGet);
      return;
    }
    console.log(responseGet, "ola cara");
  }, [setShows, setFilteredShows]);

  React.useEffect(() => {
    const searchLowerCase = busca.toLocaleLowerCase();
    const filtered = shows.filter((show) =>
      show.title.toLocaleLowerCase().includes(searchLowerCase)
    );
    setFilteredShows(filtered);
  }, [busca, shows]);

  // React.useEffect(() => {
  //   async function fetchLocations() {
  //     try {
  //       if (shows) {
  //         const uniqueLocations = Array.from(
  //           new Set(shows.map((show) => show.city))
  //         );
  //         setLocationList(uniqueLocations);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching locations:", error);
  //     }
  //   }

  //   fetchLocations();
  // }, [shows]);

  const fetchUniqueLocationsFromShows = React.useCallback(async () => {
    try {
      if (shows) {
        const uniqueLocations = Array.from(
          new Set(shows.map((show) => show.city))
        );
        setLocationList(uniqueLocations);
      }
    } catch (error) {
      console.error("Error ao carregar a localização", error);
    }
  }, [shows]);

  React.useEffect(() => {
    fetchUniqueLocationsFromShows();
  }, [fetchUniqueLocationsFromShows]);

  // const fetchShowDetails  = React.useEffect(() => {
  //    async () => {
  //     try {
  //       const response = await ShowsService.getShowById(id);
  //       setShow(response);
  //     } catch (error) {
  //       console.error("Error ao carregar detalhes do show", error);
  //     }
  //   };
  // }, [id]);

  return {
    filteredShows,
    setBusca,
    setLocationList,
    locationList,
    fetchAndSetShows,
  };
}
