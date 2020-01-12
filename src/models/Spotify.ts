import mongoose, { Document, Schema } from 'mongoose';

interface SpotifyProfileEmail {
    value: string;
    type: string;
}

export interface SpotifyProfile {
    provider: string;
    id: string;
    username: string;
    displayName: string;
    profileUrl: string;
    photos: string[];
    country: string;
    followers: number;
    product: string;
    _raw: JSON;
    _json: JSON;
    emails: SpotifyProfileEmail[];
}

export interface IArtist extends Document{
    spotifyId?: string;
    name?: string;
}

export interface IListedAlbum extends Document {
    spotifyId: string;
    name: string;
    artists: IArtist[],
    type: string[],
    genres: string[],
    imageSrc?: string;
    releaseYear?: number;
    listed?: Date;
}

export interface ICompletedAlbum extends IListedAlbum {
    rating: number;
    completed: Date;
}

export const ArtistSchema = new Schema({
    spotifyId: String,
    name: String
});

export const ListedAlbumSchema = new Schema({
    spotifyId: { type: String, required: true, unique: true },
    name: String,
    artists: [ ArtistSchema ],
    type: [ String ],
    genres: [ String ],
    imageSrc: String,
    releaseYear: Number,
    listed: Date
});

export const CompletedAlbumSchema = new Schema({
    spotifyId: { type: String, required: true, unique: true },
    name: String,
    artists: [ ArtistSchema ],
    type: [ String ],
    genres: [ String ],
    imageSrc: String,
    releaseYear: Number,
    listed: Date,
    rating: Number,
    completed: Date
})