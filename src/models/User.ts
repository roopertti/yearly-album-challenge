import mongoose, { Schema, Document } from 'mongoose';

import { ListedAlbumSchema, CompletedAlbumSchema, IListedAlbum, ICompletedAlbum } from './Spotify';

export interface IUser extends Document {
    spotifyId: string;
    username: string;
    displayName?: string;
    listedAlbums: IListedAlbum[];
    completedAlbums: ICompletedAlbum[];
    accessToken?: string;
    refreshToken?: string;
    refreshTokenExpires?: Date;
    created?: Date;
    modified?: Date;
    lastActive?: Date;
}

const UserSchema: Schema = new Schema({
    spotifyId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    displayName: { type: String },
    listedAlbums: [ ListedAlbumSchema ],
    completedAlbums: [ CompletedAlbumSchema ],
    accessToken: { type: String, unique: true },
    refreshToken: { type: String, unique: true },
    refreshTokenExpires: { type: Date, unique: true },
    created: Date,
    modified: Date,
    lastActive: Date,
});

export default mongoose.model<IUser>('User', UserSchema);