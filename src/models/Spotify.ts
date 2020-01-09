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