import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEventHandler, useState, useMemo } from 'react';
import { debounce } from '@mui/material/utils';  // or lodash
import './WordFuzzySearch.module.scss';
import style from './WordFuzzySearch.module.scss';
import reactLogo from '../assets/react.svg';

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
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const debouncedOnTypeEv = useMemo(() => debounce(onTypeEv, 300), [onTypeEv]);
  const debouncedOnChangeEv = useMemo(() => debounce(onChangeEv, 300), [onChangeEv]);

  const handleType: FormEventHandler<HTMLDivElement> = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    debouncedOnTypeEv(inputValue);
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
      debouncedOnChangeEv(chosenWord.label);
    }
  }

  return (
    <div className={style.main}>
      <div className={style.center}>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={"logo react " + style.logo} alt="React logo" />
        </a>
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
    </div>
  )
}
