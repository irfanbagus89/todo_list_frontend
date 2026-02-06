import useSWR from "swr";
import fetcher from "@/lib/fetcher/fetcherApi";

// Mock API result for development/testing
export const mockAPIResult = {
  data: [
    {
      id: "550e8400-e29b-41d4-a716-44665544000001",
      name: "Work",
      color: "#3B82F6",
      createdAt: "2026-02-04T09:00:00Z",
      updatedAt: "2026-02-04T09:00:00Z",
    },
  ],
};
export const getCategories = async (params) => {
  const response = await fetcher.get("/categories", { params });
  
  const raw = response?.data?.Data?.data || [];

  const mapped = raw.map((item) => ({
    ...item,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
  return {
    data: mapped,
    total: response?.total || 0,
  };
};

export const useGetCategories = (params) =>
  useSWR(`categories-${JSON.stringify(params)}`, () => getCategories(params));
