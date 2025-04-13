import supabase from "./supabase_client";
import type { Review, Brand, User } from "./models";
import type { PostgrestError } from "@supabase/supabase-js";

const VITE_DB_TIER = import.meta.env.VITE_DB_TIER;
const VITE_S3_TIER = import.meta.env.VITE_S3_TIER;
const BRAND_TABLE = "brand" + VITE_DB_TIER;
const REVIEW_TABEL = "review" + VITE_DB_TIER;
const USER_TABLE = "user" + VITE_DB_TIER;
const STORAGE_BUCKET = "sybi-images" + VITE_S3_TIER;

export type CreateReview = Omit<Review, "id" | "created_at">;
export type CreateUser = Omit<User, "id" | "created_at">;
export type CreateBrand = Omit<Brand, "id" | "created_at">;

export const createReview = async (review: CreateReview): Promise<Review[] | PostgrestError> => {
  const { data, error } = await supabase.from(REVIEW_TABEL).insert(review).select();
  if (error) {
    console.error("Something went wrong creating review ", error);
    return error;
  }

  console.log("Created review successfully with data ", data);
  return data;
};

export const createBrand = async (brand: CreateBrand) => {
  const { data, error } = await supabase.from(BRAND_TABLE).upsert(brand).select();
  if (error) {
    console.error("Something went wrong creating a brand ", error);
    return error;
  }

  console.log("Upserted brand successfully with data ", data);
  return data;
};

export const createUser = async (user: CreateUser) => {
  const { data, error } = await supabase.from(USER_TABLE).upsert(user).select();
  if (error) {
    console.error("Something went wrong creating a user ", error);
    return error;
  }

  console.log("Upserted user successfully with data ", data);
  return data;
};

export const getReviews = async (
  brand: Brand | undefined,
): Promise<Review[]> => {
  console.log("filtering reviews with respect to brand - ", brand);

  let query = supabase.from(REVIEW_TABEL).select("*").order("created_at", {ascending:false});

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
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

    return publicUrl;
  });

  return Promise.all(uploadPromises);
};
