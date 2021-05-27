import CategorySchema from "./Category.schema.js";

export const getCategories = catObj => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await CategorySchema.find();

			resolve(result);
			
		} catch (error) {
			reject(error);
		}
	});
};

