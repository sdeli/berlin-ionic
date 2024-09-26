import { AxiosResponse } from 'axios';
import { AddWordDto, deleteWordDto, WordDTO } from '../dto';
import { createQueryString } from '../libs/utils';
import httpClient from './httpClient';
import { isUUID } from '../data/utils';

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

export async function deleteWordByLine(dto: deleteWordDto) {
  const url = '/word';
  const response = await httpClient.delete<deleteWordDto, AxiosResponse<string>>(url, { data: dto })
  const isValid = typeof response.data === 'string';
  if (isValid && isUUID(response.data)) {
    return response.data;
  } else {
    throw new Error('invalid response')
  }
}