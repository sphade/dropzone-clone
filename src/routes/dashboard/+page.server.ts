import deleteFile from '$lib/mutations/deleteFile.js';
import editFileName from '$lib/mutations/editFileName.js';
import getFilesCount from '$lib/queries/getFilesCount.js';
import getUser from '$lib/queries/getUser.js';
import getUserFiles from '$lib/queries/getUserFiles.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { userId } = locals;
	if (!userId) {
		throw redirect(303, '/');
	}
	return {
		user: getUser(userId),
		files: getUserFiles(userId),
		count: getFilesCount(userId)
	};
};

export const actions = {
	editFileName: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const fileName = data.get('fileName') as string;
		if (!id) {
			return fail(422, { editFileNameError: 'the file id is required' });
		}
		if (fileName === '') {
			return fail(422, { editFileNameError: 'name cannot be empty' });
		}
		try {
			editFileName(id, fileName);
		} catch (error) {
			const errorMessage = (error as Error).message;
			return fail(422, { error: errorMessage });
		}
		return { editFileNameSuccess: 'edited successfully' };
	},
	deleteFile: async ({ locals, request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		const { userId } = locals;
		if (!userId) {
			return fail(404, { deleteFileError: 'user not found' });
		}
		if (id === '') {
			return fail(422, { deleteFileError: 'no file selected' });
		}
		await deleteFile(id, userId);
		return { deleteFileSuccess: 'deleted successfully' };

	}
};
