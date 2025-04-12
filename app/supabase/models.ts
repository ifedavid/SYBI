export type Review = {
  id: string;
  created_at: Date;
  title: string;
  description: string;
  rating: number;
  recommended: boolean;
  brand_name: string;
  brand_url: string;
  user_name: string;
  user_email: string;
  images: string[];
};

export type Brand = {
  id: string;
  created_at: Date;
  name: string;
  url: string;
  insta_url: string;
  category: string;
};

export type User = {
  id: string;
  created_at: Date;
  name: string;
  email: string;
};
