import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './WordFuzzySearch.module.scss';
import { useAppDispatch } from '../redux/hooks';
import { fetchWordsAction } from '../actions';
import { selectWords } from '../redux/wordSlice';

export default function WordFuzzySearch() {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWordsAction())
  }, [])

  const words = useSelector(selectWords);
  
  const wordsList = words.words.map((word) => {
    return <li key={word.ID}>{word.text} -- {word.source}</li>
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(event.target.value);
    dispatch(fetchWordsAction(inputValue));
  };

  // useEffect(() => {
  // }, [inputValue, dispatch]);

  return (
  <div>WordFuzzySearch: 
    <input type="text"
        value={inputValue}
        onChange={handleInputChange} />
    <p>Variable value: {inputValue}</p>
    <ul className={styles['ul-basic']}>
      {wordsList}
    </ul>
  </div>
  )
}
