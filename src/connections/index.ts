import { PhotoProps } from "@/@types"
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage"
import { storage } from "@/firebase"

export const getAll = async () => {
    const list: PhotoProps[] = []
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
    if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        const newFileRef = ref(storage, `avatars/${username}`)
        const upload = await uploadBytes(newFileRef, file)
        const photoUrl = await getDownloadURL(upload.ref)
        return { name: upload.ref.name, url: photoUrl } as PhotoProps
    } else {
        return new Error('Arquivo não suportado.')
    }
}