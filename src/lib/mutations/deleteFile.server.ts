import { db, storage } from '$lib/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

async function deleteFile(id: string, uid: string) {
	if (id === '') throw new Error('no file selected');
	if (uid === '') throw new Error('user not found');
	await deleteDoc(doc(db, 'files', id));

	const fileRef = ref(storage, `user/${uid}/files/${id}`);

	await deleteObject(fileRef);
}
export default deleteFile;
