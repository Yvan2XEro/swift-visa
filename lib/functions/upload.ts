import { storage } from "../firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

export async function uploadFileAndGetUrl(file: File): Promise<string> {
    try {
        const imageRef = ref(storage, `images/${v4() + file.name}`);
        const snapshot = await uploadBytes(imageRef, file)
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return downloadUrl;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}
