import React from "react";
import ShowsService from "../../service/Shows/Shows";
import { IShow } from "../../service/Shows/Shows.structure";

export function useShows() {
  const [filteredShows, setFilteredShows] = React.useState<IShow[]>([]);

  const fetchAndGetShows = React.useMemo(async () => {
    const responseGet = await ShowsService.getShow();
    if (responseGet) {
      setFilteredShows(responseGet);
    } else {
      console.error(responseGet);
      return;
    }
  }, [setFilteredShows]);

  return {
    filteredShows,
    fetchAndGetShows,
    setFilteredShows,
  };
}
