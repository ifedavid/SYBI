import supabase from "./supabase_client";
import type { Review, Brand, User } from "./models";

const BRAND_TABLE = "brand";
const REVIEW_TABEL = "review";
const USER_TABLE = "user";
const STORAGE_BUCKET = "sybi-images";

export type CreateReview = Omit<Review, "id" | "created_at">;
export type CreateUser = Omit<User, "id" | "created_at">;
export type CreateBrand = Omit<Brand, "id" | "created_at">;

export const createReview = async (review: CreateReview) => {
  const { data, error } = await supabase.from(REVIEW_TABEL).insert(review);
  console.log(data);
  if (data) {
    console.log("Created review data ", review);
    return data;
  }
  if (error) {
    console.error("Something went wrong ", error);
  }
};

export const createBrand = async (brand: CreateBrand) => {
  const { data, error } = await supabase.from(BRAND_TABLE).insert(brand);
  if (data) {
    console.log("Created brand data ", brand);
    return data;
  } else {
    console.error("Something went wrong ", error);
  }
};

export const createUser = async (user: CreateUser) => {
  const { data, error } = await supabase.from(USER_TABLE).insert(user);
  if (data) {
    console.log("Created user data ", user);
    return data;
  } else {
    console.error("Something went wrong ", error);
  }
};

export const getReviews = async (
  brand: Brand | undefined,
): Promise<Review[]> => {
  console.log("filtering reviews with respect to brand - ", brand);

  let query = supabase.from(REVIEW_TABEL).select("*");

  if (brand) {
    query = query
      .filter("brand_name", "eq", brand.name)
      .filter("brand_url", "eq", brand.url);
  }

  const { data, error } = await query;

  console.log("Fetched review data - ", data);
  return data || [];
};

export const getBrands = async (): Promise<Brand[]> => {
  const { data, error } = await supabase.from(BRAND_TABLE).select("*");
  console.log("Fetched brand data - ", data);
  return data || [];
};

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map(async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

    return publicUrl;
  });

  return Promise.all(uploadPromises);
};
