import { Document, Model, model, Schema } from "mongoose"
import mongoose from "../config/mongoose"

// Schema
const Sessions = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true
    }
})

export interface ISession {
    refreshToken: string;
}

// Not directly exported because it is not recommanded to
// use this interface direct unless necessarys since the 
// type of `company` field is not deterministic
interface SessionsDocument extends ISession, Document {
    refreshToken: string;
}

// For model
export interface SessionModel extends Model<SessionsDocument> {
    refreshToken: string;
}

// Default export
export default mongoose.model<SessionsDocument, SessionModel>("Sessions", Sessions)