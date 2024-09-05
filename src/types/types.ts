export type TDataStore = "CRM" | "DATABASE"
export type TContact = {
  first_name:string;
  last_name:string;
  email:string;
  mobile_number:string;
}

export type TContactBody = TContact & {
  data_store: TDataStore
}