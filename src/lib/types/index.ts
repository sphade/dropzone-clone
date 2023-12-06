export type TUser = {
	name: string;
	email: string;
	profilePic: string;
	uid: string;
};
export type TFiles = {
	downloadUrl: string;
	fileName: string;
	size: number;
	uid: string;
	type: string;
	timestamp: Date;
	id:string
};