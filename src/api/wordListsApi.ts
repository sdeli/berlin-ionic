import { AddSenseToWordlistsDto, AddWordToSearchHistoryDto, CreateSenseListDto, SenseListDto } from '../dto';
import httpClient from './httpClient';

const url = 'http://localhost:3000/sense-list';

export async function fetchAllWordLists() {
  const response = await httpClient.get<SenseListDto[]>(url)
  const wordsLists = response.data;
  return wordsLists;
}

export async function fetchWordListsByuserId(userId: string) {
  const specUrl = url + '/' + 'by-user';
  const config = {
    params: {
      userId, // Pass the userId as a query parameter
    },
  };
  const response = await httpClient.get<SenseListDto[]>(specUrl, config)
  const wordsLists = response.data;
  return wordsLists;
}

export async function putWordList(list: SenseListDto) {
  const response = await httpClient.put<SenseListDto>(url, list)
  const wordsLists = response.data;
  return wordsLists;
}

export async function postWordList(title: string, userId: string) {
  const data: CreateSenseListDto = { title, userId };
  const response = await httpClient.post<SenseListDto>(url, data)
  const wordsLists = response.data;
  return wordsLists;
}

export async function deleteWordList(listId: string) {
  const deleteUrl = url + '/' + listId
  return await httpClient.delete<void>(deleteUrl)
}

export async function addSenseToWordlists(dto: AddSenseToWordlistsDto) {
  const addurl = url + '/add-sense'
  const response = await httpClient.post<SenseListDto>(addurl, dto)
  const wordsLists = response.data;
  return wordsLists;
}

export async function addWordToSearchHistory(dto: AddWordToSearchHistoryDto) {
  const addurl = url + '/history'
  const response = await httpClient.post<SenseListDto>(addurl, dto)
  const wordsLists = response.data;
  return wordsLists;
}

export async function removeSenseFromWordlist(lineId: string, listId: string) {
  const addurl = url + '/remove-sense'
  const data: AddSenseToWordlistsDto = { lineId, listId };
  const response = await httpClient.post<SenseListDto>(addurl, data)
  const wordsLists = response.data;
  return wordsLists;
}