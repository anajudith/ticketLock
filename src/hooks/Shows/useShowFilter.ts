import React from "react";
import ShowsService from "../../service/Shows/Shows";
import { IShow } from "../../service/Shows/Shows.structure";

export function useShows() {
  const [shows, setShows] = React.useState<IShow[]>([]);
  const [filteredShows, setFilteredShows] = React.useState<IShow[]>([]);
  const [locationList, setLocationList] = React.useState<string[]>([]);

  const [busca, setBusca] = React.useState<string>("");

  const fetchAndGetShows = React.useMemo(async () => {
    const responseGet = await ShowsService.getShow();
    if (responseGet) {
      setShows(responseGet);
      setFilteredShows(responseGet);
    } else {
      console.error(responseGet);
      return;
    }
  }, [setShows, setFilteredShows]);

  // const searchShows = React.useMemo(async () => {
  //   const responseGet = await ShowsService.pesquisa(shows.time, shows.date);
  //   if (responseGet) {
  //     setShows(responseGet);
  //     setFilteredShows(responseGet);
  //   } else {
  //     console.error(responseGet);
  //     return;
  //   }
  //   console.log(responseGet, "ola pesquisa");
  // }, []);

  React.useEffect(() => {
    const searchLowerCase = busca.toLocaleLowerCase();
    const filtered = shows.filter((show) =>
      show.title.toLocaleLowerCase().includes(searchLowerCase)
    );
    setFilteredShows(filtered);
  }, [busca, shows]);

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

  return {
    filteredShows,
    setBusca,
    setLocationList,
    locationList,
    fetchAndGetShows,
    // searchShows,
  };
}
