/* eslint-disable @typescript-eslint/no-unused-vars */

import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";
import { create } from "zustand";

interface WaterStore {
    waterDrinkStamps: string[];
    addWaterIntake: (timestamp: string) => void;
    resetWaterIntake: () => void;
}

export const useWaterStore = create<WaterStore>()(
  persist(
    (set, get) => ({
      waterDrinkStamps: [],
      addWaterIntake: (timestamp) => {
        const waterDrinkStamps = [...get().waterDrinkStamps, timestamp];
        set({ waterDrinkStamps });
      },
      resetWaterIntake: () => {
        set({ waterDrinkStamps: [] }); // Corrected this line
      },
    }),
    {
      name: "water-storage",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
