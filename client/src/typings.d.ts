export type TCategory = {
	_id: string;
	category: string;
	contacts: Contact[];
};

export type Contact = {
	_id: string;
	name: string;
	description: string;
	number: string;
};
