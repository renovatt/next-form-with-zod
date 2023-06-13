import { AvatarImageProps } from "@/@types"
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage"
import { storage } from "@/firebase"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const getAll = async () => {
    const list: AvatarImageProps[] = []
    const imagensFolder = ref(storage, "avatars")
    const photoList = await listAll(imagensFolder)

    for (let i in photoList.items) {
        const photoUrl = await getDownloadURL(photoList.items[i])
        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        })
    }
    return list;
}

export const Insert = async (file: File, username: string) => {
    if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        const newFileRef = ref(storage, `avatars/${username}`)
        const upload = await uploadBytes(newFileRef, file)
        const photoUrl = await getDownloadURL(upload.ref)
        return { name: upload.ref.name, url: photoUrl } as AvatarImageProps
    } else {
        return new Error('Arquivo não suportado.')
    }
}