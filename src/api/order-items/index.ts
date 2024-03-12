import { useMutation } from "@tanstack/react-query";
import { InsertTables } from "@/src/types/types";
import { supabase } from "@/src/lib/supabase";

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(userInput: InsertTables<"order_items">[]) {
      const { data, error } = await supabase
        .from("order_items")
        .insert(userInput)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};
