import { AddSenseToWordlistsDto, CreateSenseListDto, FetchSenseListByUserIdDto, SenseListDto } from '../dto';
import axios, { AxiosRequestConfig } from 'axios';

const url = 'http://localhost:3000/sense-list';

export async function fetchAllWordLists() {
  const response = await axios.get<SenseListDto[]>(url)
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
  const response = await axios.get<SenseListDto[]>(specUrl, config)
  const wordsLists = response.data;
  return wordsLists;
}

export async function putWordList(list: SenseListDto) {
  const response = await axios.put<SenseListDto>(url, list)
  const wordsLists = response.data;
  return wordsLists;
}

export async function postWordList(title: string, userId: string) {
  const data: CreateSenseListDto = { title, userId };
  const response = await axios.post<SenseListDto>(url, data)
  const wordsLists = response.data;
  return wordsLists;
}

export async function deleteWordList(listId: string) {
  const deleteUrl = url + '/' + listId
  return await axios.delete<void>(deleteUrl)
}

export async function addSenseToWordlists(lineId: string, listId: string) {
  const addurl = url + '/add-sense'
  const data: AddSenseToWordlistsDto = { lineId, listId };
  console.log('data')
  console.log(data);
  const response = await axios.post<SenseListDto>(addurl, data)
  const wordsLists = response.data;
  return wordsLists;
}

export async function removeSenseFromWordlist(lineId: string, listId: string) {
  const addurl = url + '/remove-sense'
  const data: AddSenseToWordlistsDto = { lineId, listId };
  const response = await axios.post<SenseListDto>(addurl, data)
  const wordsLists = response.data;
  return wordsLists;
}