import { DataAccess } from "@kcat/user-wizard-services/src/dataAccess"

export const useDataAccess = () =>
  {
    const dataAccess = new DataAccess();
    return dataAccess
  }
