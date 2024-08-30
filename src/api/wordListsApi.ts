import { CreateSenseListDto, SenseListDto } from '../dto';
import axios from 'axios';

const url = 'http://localhost:3000/sense-list';

export async function fetchAllWordLists() {
  const response = await axios.get<SenseListDto[]>(url)
  const wordsLists = response.data;
  return wordsLists;
}

export async function postWordList(title: string, userId: string) {
  const data: CreateSenseListDto = { title, userId };
  const response = await axios.post<SenseListDto>(url, data)
  const wordsLists = response.data;
  return wordsLists;
}