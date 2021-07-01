import CategorySchema from "./Category.schema.js";
import ProductSchema from "../product/Product.schema.js";

export const getCategories =() => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await CategorySchema.find();

			resolve(result);
			
		} catch (error) {
			console.log(error)
		}
	});
};
export const getCategoriesById = catObj => {
	console.log(catObj)
	return new Promise(async (resolve, reject) => {
		try {
			const result = await ProductSchema.find({
				categories: {
					$in: [catObj],
				},
			});

			resolve(result);

			console.log("FROM MODAL", result)
			
		} catch (error) {
			console.log(error)
		}
	});
};

