export type Issue = {
	id: number,
	title: string,
	description: string,
	priority: string,
	resolutionDate: Date,
	repositories?: String[],
	assignee: {
		name: string,
		image: string
	}
}