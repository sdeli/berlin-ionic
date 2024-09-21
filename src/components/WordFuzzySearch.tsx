import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEventHandler, useState } from 'react';
import './WordFuzzySearch.module.scss';
import { WordDTO } from '../dto';
import style from './WordFuzzySearch.module.scss';
import reactLogo from '../assets/react.svg';

// import { debounce } from '@mui/material/utils'

export interface WordsItems {
  label: string,
  id: number
}

export interface WordFuzzySearchProps {
  chosenWord: string | null;
  words: WordsItems[];
  onChangeEv: (chosenWordsText: string) => void;
  onTypeEv: (inputValue: string) => void
}

export default function WordFuzzySearch({ chosenWord, words, onChangeEv, onTypeEv }: WordFuzzySearchProps) {
  const defaultInputValue = chosenWord || '';
  // akarunk erre itt mindig renderelni
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleType: FormEventHandler<HTMLDivElement> = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(event.target.value);
    onTypeEv(inputValue)
  };

  const onChangeHandler = (
    event: React.SyntheticEvent<Element, Event>,
    value: { label: string; id: number } | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<{ label: string; id: number }>
  ) => {
    const chosenWord = words.find((word) => word.label === value?.label)
    if (chosenWord) {
      setInputValue(chosenWord.label);
      onChangeEv(chosenWord.label);
    }
  }

  return (
    <div className={style.main}>
      <div className={style.logo}>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <Autocomplete
        disablePortal
        onChange={onChangeHandler}
        onInput={handleType}
        options={words}
        //@ts-ignore
        value={inputValue}
        sx={{ width: 300 }}
        renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label="Search" />}
      />
    </div>
  )
}
