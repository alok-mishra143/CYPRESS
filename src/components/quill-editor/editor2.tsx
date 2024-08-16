"use client";

import { useSupabaseUser } from "@/lib/provider/supabase-userProvider";
import React from "react";

const Temp = () => {
  const { user } = useSupabaseUser();

  if (!user) return;

  return (
    <div>
      <div>this is your email :-</div>
      {user.email}
      <br />
      <div>this is your id :- </div>
      {user.id}
    </div>
  );
};

export default Temp;
