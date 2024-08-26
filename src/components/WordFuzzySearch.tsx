import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './WordFuzzySearch.module.scss';
import { useAppDispatch } from '../redux/hooks';
import { fetchWordsAction } from '../actions';
import { selectChosenWordID, selectWords } from '../redux/wordSlice';
import './WordFuzzySearch.module.scss'
import { setChosenWordAction } from '../redux/wordActions';
export default function WordFuzzySearch() {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchWordsAction())
  // }, [])

  const words = useSelector(selectWords);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(event.target.value);
    dispatch(fetchWordsAction(inputValue));
  };

  const setChosenWord = (wordID: string) => {
    dispatch(setChosenWordAction(wordID));
  }

  const wordsList = words.map((word) => {
    return <li key={word.ID} onClick={() => {setChosenWord(word.ID)}}>{word.text} -- {word.source}</li>
  })


  const shouldDisplayDropdown = words.length ? 'block' : 'none';
  // const dropdownVisible = words.words.length ? ''
  // useEffect(() => {
  // }, [inputValue, dispatch]);

  return (
  <div>
    <div></div>
    <div>
      <input type="text"
        value={inputValue}
        onChange={handleInputChange} />
    </div>
    <div className="dropdown" style={{position: 'relative', background: 'black', display: shouldDisplayDropdown}}>
      <div className="dropdown-content" style={{position: 'absolute', top: '0px', background: 'black', zIndex: '100'}}>
        <ul className={styles['ul-basic']}>
          {wordsList}
        </ul>
      </div>
    </div>
  </div>
  )
}
