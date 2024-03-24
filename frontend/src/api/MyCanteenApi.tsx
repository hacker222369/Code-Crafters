import CanteenProfileForm from "@/forms/canteen-profile-form/CanteenProfileForm";
import { Canteen } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyCanteen = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyCanteenRequest = async (): Promise<Canteen> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/Canteen`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get Canteen");
    }
    return response.json();
  };

  const { data: Canteen, isLoading } = useQuery(
    "fetchMyCanteen",
    getMyCanteenRequest
  );

  return { Canteen, isLoading };
};

export const useCreateMyCanteen = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyCanteenRequest = async (
    CanteenFormData: FormData
  ): Promise<Canteen> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/Canteen`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: CanteenFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create Canteen");
    }

    return response.json();
  };

  const {
    mutate: createCanteen,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyCanteenRequest);

  if (isSuccess) {
    toast.success("Canteen created!");
  }

  if (error) {
    toast.error("Unable to update Canteen");
  }

  return { createCanteen, isLoading };
};

export const useUpdateCanteen= () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateCanteenRequest = async (
    canteenFormData: FormData
  ): Promise<Canteen> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: canteenFormData,
    });

    if (!response) {
      throw new Error("Failed to update canteen");
    }

    return response.json();
  };

  const {
    mutate: updateCanteen,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateCanteenRequest);

  if (isSuccess) {
    toast.success("Canteen Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateCanteen, isLoading };
};

