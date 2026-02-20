
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  longDescription: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  postalCodePrefix?: string;
  description: string;
}

export type ViewState = {
  page: 'home' | 'service' | 'neighborhood' | 'contact' | 'service-neighborhood';
  serviceId?: string;
  neighborhoodId?: string;
};
