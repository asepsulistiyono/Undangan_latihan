import { createContext, useContext, type ReactNode } from "react";
import { useWeddingData, type WeddingData } from "./useWeddingData";
import { WEDDING as DEFAULT_WEDDING } from "./wedding";

interface WeddingContextType {
  data: WeddingData;
  mergedData: typeof DEFAULT_WEDDING & { photos: any };
  loading: boolean;
  error: string | null;
  updateData: (patch: WeddingData) => Promise<void>;
  refetch: () => Promise<void>;
}

const WeddingContext = createContext<WeddingContextType | null>(null);

export function WeddingProvider({ children, userId }: { children: ReactNode; userId?: string | null }) {
  const value = useWeddingData(userId);
  return <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>;
}

export function useWedding() {
  const ctx = useContext(WeddingContext);
  if (!ctx) throw new Error("useWedding must be used within WeddingProvider");
  return ctx;
}
