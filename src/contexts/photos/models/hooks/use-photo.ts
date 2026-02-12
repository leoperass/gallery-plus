import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../../helpers/api";
import type { Photo } from "../photo";

interface PhotoDatailResponse extends Photo {
    nextPhotoId?: string;
    previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
    const {data, isLoading} = useQuery<PhotoDatailResponse>({
        queryKey: ["photo", id],
        queryFn: () => fetcher(`/photos/${id}`),
        enabled: !!id
    });

    return {
        photo: data,
        nextPhotoId: data?.nextPhotoId,
        previousPhotoId: data?.previousPhotoId,
        isLoadingPhoto: isLoading,
    }
}