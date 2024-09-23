import { AddWordDto, WordDTO } from '../dto';
import { createQueryString } from '../libs/utils';
import httpClient from './httpClient';

interface WordFilterDto {
  text: string,
  limit: number,
  userId: string
}

export async function fetchAllWords(filter: WordFilterDto) {
  const url = filter ? `http://localhost:3000/word?${createQueryString(filter)}` : 'http://localhost:3000/word';
  const response = await httpClient.get<WordDTO[]>(url)
  const words = response.data;
  return words;
}

export async function addWord(dto: AddWordDto) {
  const url = '/word';
  await httpClient.post<void>(url, dto)
}

export async function fetchWord(filter: WordFilterDto) {
  const url = filter ? `http://localhost:3000/word?${createQueryString(filter)}` : 'http://localhost:3000/word';
  const response = await httpClient.get<WordDTO[]>(url)
  const word = response.data[0];
  return word;
}