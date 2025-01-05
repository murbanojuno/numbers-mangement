export interface Number {
    id: string;
    number: string;
    prefix?: string;
    country?: string;
    company?: string;
    description?: string;
  }
  
export interface CreateNumberDto {
    number: string;
    prefix?: string;
    country?: string;
    company?: string;
    description?: string;
  }