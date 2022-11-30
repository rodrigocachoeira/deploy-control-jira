export type Issue = {
    id: number,
	title: string,
	description: string,
	priority: string,
	assignee: {
        name: string,
	 	image: string
    }
}