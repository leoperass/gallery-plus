import Button from "../../../../../components/button";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../../../components/dialog";
import InputText from "../../../../../components/input-text";
import Text from "../../../../../components/text";
import type { Photo } from "../../photo";
import SelectCheckBoxIllustration from "../../../../../assets/images/select-checkbox.svg?react";
import Skeleton from "../../../../../components/skeleton";
import ImagePreview from "../../../../../components/image-preview";
import PhotoImageSelectable from "../../components/photo-image-selectable";
import { useQuery } from "@tanstack/react-query";
import usePhotos from "../../hooks/use-photos";

interface AlbumNewDialogProps {
    trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
    
    const {photos, isLoadingPhotos} = usePhotos();

    function handleTogglePhoto(selected: boolean, photoId: string) {
        console.log(selected, photoId)
    }
    

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Criar álbum</DialogHeader>

                <DialogBody className="flex flex-col gap-6">
                    <InputText placeholder="Adicione um título" />

                    <div className="space-y-6">

                        <Text as="div" variant="label-small">Fotos cadastradas</Text>

                        {!isLoadingPhotos && photos.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {photos.map((photo) => (
                                    <PhotoImageSelectable 
                                        key={photo.id}
                                        src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                                        title={photo.title}
                                        imageClassName="w-20 h-20"
                                        onSelectImage={(selected) => handleTogglePhoto(selected,photo.id)}
                                    />
                                ))}
                            </div>
                        )}

                        {isLoadingPhotos &&
                            <div className="flex flex-wrap gap-3">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Skeleton
                                        key={`photo-loading-${index}`}
                                        className="w-20 h-20 rounded-lg"
                                    />
                                ))}
                            </div>
                        }


                        {!isLoadingPhotos && photos.length === 0 && (
                            <div className="flex flex-col justify-center items-center gap-6">
                                <SelectCheckBoxIllustration />
                                <Text variant="paragraph-medium" className="text-center">Nenhuma foto disponível para seleção</Text>
                            </div>
                        )}
                    </div>
                </DialogBody>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>

                    <Button>Criar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}