import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { stripe } from "./stripe.ts";

type Profile = {
  id: string;
  updated_at: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
  group: "ADMIN" | "USER";
  stripe_customer_id: string | null;
};
export const createOrRetrieveProfile = async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    },
  );
  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) throw new Error("No user found");

  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    throw new Error("Profile not found");
  }

  console.log(profile);

  //// IF THERE IS A USER, JUST RETURN IT
  if (profile.stripe_customer_id) {
    return profile.stripe_customer_id;
  }

  //// IF NOT, CREATE A NEW ONE
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { uid: user.id },
  });

  //// THEN, UPDATE TABLE PROFILES
  await supabaseClient
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", profile.id);

  return customer.id;
};
