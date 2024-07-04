import mongoose, { Document, Schema } from 'mongoose';

export interface IUserPublication extends Document {
    userId: number;
    description: string;
    multimedia: string;
    multimediaStorageType: 'aws' | 'firebase' | 'local';
}

export const UserPublicationSchema: Schema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    multimedia: {
        type: String,
        required: true
    },
    multimediaStorageType: {
        type: String,
        required: true,
        enum: ['aws', 'firebase', 'local']
    }
}, {
    timestamps: true
});

export const UserPublication = mongoose.model<IUserPublication>('UserPublication', UserPublicationSchema);
