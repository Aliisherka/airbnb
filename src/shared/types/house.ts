export interface House {
  _id: string;
  title: string;
  city: string;
  country: string;
  price: string;
  currency: string;
  rating: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export interface HouseCardProps extends House {
  exchangeRate?: number;
}

export interface HouseWithUser extends House {
  userId: {
    name: string;
    avatar?: string;
    phoneNumber: string;
    createdAt: string;
  };
}