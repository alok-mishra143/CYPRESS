"use client";

import { AuthUser } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getuser } from "../action-server/action";

type SupabaseUserContextType = {
  user: AuthUser | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
});

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

interface SupabaseUserProviderProps {
  children: React.ReactNode;
}

export const SupabaseUserProvider: React.FC<SupabaseUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();

  //Fetch the user details
  useEffect(() => {
    const getUser = async () => {
      console.log("get user");
      const {
        data: { user },
      } = await getuser();

      if (user) {
        console.log(user);
        setUser(user);
      }
    };
    getUser();
  }, [toast]);
  return (
    <SupabaseUserContext.Provider value={{ user }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};
