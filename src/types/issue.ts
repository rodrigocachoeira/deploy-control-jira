export type Issue = {
	id: number,
	title: string,
	summary?: string;
	description: string,
	priority: string,
	resolutionDate: Date,
	repositories?: String[],
	epic?: {
		id: number;
		title: string;
	},
	assignee: {
		name: string,
		image: string
	}
}