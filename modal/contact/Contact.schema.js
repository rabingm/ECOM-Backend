import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			default: "",
		},
		email: {
			type: String,
			require: true,
			default: "",
		},
		phone: {
			type: Number,
			require: false,
			default: "",
		},
		text: {
			type: String,
			require: true,
			default: "",
		},
	},
	{
		timestamp: true,
	}
);

const ConSchema = mongoose.model("Contact", ContactSchema);

export default ConSchema;
