import { adminAuth } from '$lib/server/firebaseAdmin';

export const handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const sessionCookie = cookies.get('__session');
	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);

		event.locals.userId = decodedClaims.uid;
	} catch (e) {
		event.locals.userId = null;

		return resolve(event);
	}

	return resolve(event);
};
