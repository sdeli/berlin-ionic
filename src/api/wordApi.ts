import { WordDTO } from '../dto';
import axios from 'axios';

interface WordFilter {
  text: string,
  limit: number
}

export async function fetchAllWords(filter?: WordFilter) {
  const url = filter ? `http://localhost:3000/word?${createQueryString(filter)}` : 'http://localhost:3000/word';
  const response = await axios.get<WordDTO[]>(url)
  const words = response.data;
  return words;
}