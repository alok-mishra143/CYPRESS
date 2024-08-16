"use server";

import { z } from "zod";

import { FormSchema } from "../types";
import { createClient } from "../supabase/server";

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (data?.length) return { error: { message: "User already exists", data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });
  console.log("response", response);
  return response;
}

export async function getuser() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    if (!data || !data.user) {
      throw new Error("User data not found");
    }

    return { data };
  } catch (error) {
    // Return the error and any available data
    throw error;
  }
}
