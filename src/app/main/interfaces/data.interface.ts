
export interface Rental {
  id:              number;
  vehicleCode:     VehicleCode;
  rentalStartDate: Date;
  rentalEndDate:   Date;
  totalHours:      number;
  startLocation:   string;
  endLocation:     string;
}


export interface Vehicle {
  vehicleCode:      string;
  engine:           string;
  plate:            string;
  brand:            string;
  model:            string;
  year:             number;
  fuelType:         "Diesel" | "Gasolina";
  color:            string;
  mileage:          number;
  available?:       string;
  seatingCapacity:  number;
  transmissionType: string;
  numberOfDoors:    number;
  status?:          string;
}




export enum VehicleCode {
  Jp = "JP",
}


