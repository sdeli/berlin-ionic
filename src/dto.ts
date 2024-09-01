export interface WordMeta {
  uploadError?: string;
}

export enum WordSources {
  youtube = 'youtube',
  facebookReels = 'facebookReels',
  facebookVideos = 'facebookVideos',
  tiktok = 'tiktok',
  dailymotion = 'dailymotion',
}


export interface WordDTO {
  ID: string;
  source: WordSources;
  originalUrl: string;
  text: string;
  meta: WordMeta;
  senses: SenseDTO[];
  updatedAt: Date;
}

export interface SenseDTO {
  ID: string;
  line: LineValue;
  lines: SenseLineDTO[];
  updatedAt: Date;
}

export interface SenseLineDTO {
  ID: string;
  source: LineValue;
  target: LineValue;
  updatedAt: Date;
}

export interface LineValue {
  html: string;
  text: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface TokensDto {
  access_token: string;
  refresh_token: string;
}

export interface AccessTokenDto {
  access_token: string;
  refresh_token: string;
}

interface UserDataDto {
  username: string;
  id: string;
}

export interface LoggedInUserDto {
  user: UserDataDto;
  tokens: TokensDto;
  text: string;
  meta: WordMeta | null;
  updatedAt: Date;
}

export interface SenseListDto {
  ID: string;
  title: string;
  senseLines: SenseLineDTO[];
  belongsTo: UserDataDto;
  updatedAt: Date;
}

export interface CreateSenseListDto {
  title: string;
  senseLines?: SenseLineDTO[];
  userId: string;
}

export interface FetchSenseListByUserIdDto {
  userId: string;
}