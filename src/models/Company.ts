import {Schema, Document,models,model} from "mongoose";

const companySchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        description: { type: String, required: true },
        logo: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        content: { type: Object, required: true },
    },{
        timestamps: true
    }
)

const Company = models.Company || model<Document>("Company", companySchema);
export default Company;