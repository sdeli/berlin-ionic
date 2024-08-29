import { PostSenseListDto, SenseListDto } from '../dto';
import axios from 'axios';

const url = 'http://localhost:3000/wordword-lists';

export async function fetchAllWordLists() {
  const response = await axios.get<SenseListDto[]>(url)
  const wordsLists = response.data;
  return wordsLists;
}

export async function postWordList(title: string, userid: string) {
  const data: PostSenseListDto = { title, userid };
  const response = await axios.post<SenseListDto>(url, data)
  const wordsLists = response.data;
  return wordsLists;
}