import { db } from '$lib/firebaseConfig';
import type { TFiles } from '$lib/types';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
async function getUserFiles(uid: string): Promise<TFiles[]> {
	const q = query(collection(db, 'files'), where('uid', '==', uid), orderBy('timestamp', 'desc'));
	const querySnapshot = await getDocs(q);
	const results: TFiles[] = [];

	querySnapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			downloadUrl: doc.data().downloadUrl,
			fileName: doc.data().fileName,
			size: doc.data().size,
			type: doc.data().type,
			uid: doc.data().uid,
			timestamp: doc.data().timestamp.toDate()
		});
	});

	return results;
}

export default getUserFiles;
