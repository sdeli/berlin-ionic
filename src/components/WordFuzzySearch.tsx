import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './WordFuzzySearch.module.scss';
import { useAppDispatch } from '../redux/hooks';
import { selectChosenWord, selectWords } from '../redux/wordSlice';
import './WordFuzzySearch.module.scss'
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fetchChosenWordAction, fetchWordsAction } from '../redux/wordActions';
import { selectUser } from '../redux/authSlice';

export default function WordFuzzySearch() {
  const chosenWord = useSelector(selectChosenWord);
  const user = useSelector(selectUser);

  const defaultInputValue = chosenWord ? chosenWord.text : '';
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const dispatch = useAppDispatch();

  const words = useSelector(selectWords)
  const wordsItems = words.map((word) => {
    return {
      label: word.text, 
    }
  });
  
  const handleInputChange: FormEventHandler<HTMLDivElement> = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(event.target.value);
    dispatch(fetchWordsAction(inputValue));
  };

  const onChangeHandler =  (
    event: React.SyntheticEvent<Element, Event>,
    value: { label: string; id: number } | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<{ label: string; id: number }>
  )  => {
    const chosenWord = words.find((word) => word.text === value?.label)
    if (chosenWord) {
      setInputValue(chosenWord.text);
      const userId = user ? user.id : null;
      dispatch(fetchChosenWordAction(chosenWord.text, userId));
    }
  }

  return (
  <div>
    <Autocomplete
      disablePortal
      onChange={onChangeHandler}
      onInput={handleInputChange}
      //@ts-ignore
      options={wordsItems}
      //@ts-ignore
      value={inputValue}
      sx={{ width: 300 }}
      renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label="Search" />}
    />
  </div>
  )
}
