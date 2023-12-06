import { db } from '$lib/firebaseConfig';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';

async function getFilesCount(uid: string) {
	const q = query(collection(db, 'files'), where('uid', '==', uid));

	const snapshot = await getCountFromServer(q);
	return snapshot.data().count;
}
export default getFilesCount;
