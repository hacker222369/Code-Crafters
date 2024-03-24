export type User = {
    _id: string;
    email: string;
    name: string;
    room_number: number;
    hostel: string;
  };

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
  };

export type Canteen = {
    deliveryPrice: number;
    _id: string;
    user: string;
    canteenName: string;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
  };