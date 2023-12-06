import { db } from '$lib/firebaseConfig';
import { fail } from '@sveltejs/kit';
import { doc, updateDoc } from 'firebase/firestore';

async function editFileName(id: string, fileName: string) {
	const docRef = doc(db, 'files', id);

	await updateDoc(docRef, {
		fileName
	});
}
export default editFileName;
