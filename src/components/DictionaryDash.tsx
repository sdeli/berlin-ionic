import React, { useState } from 'react';
import viteLogo from '../assets/vite.svg'
import reactLogo from '../assets/react.svg'
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/authSlice';
import WordFuzzySearch from './WordFuzzySearch';


const styles = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }
}
export function DictionaryDash() {
  const isAuth = useSelector(selectIsAuth);

  console.log('selectIsAuth MainPage')
  console.log(isAuth)
  return (
    <>
    <div style={styles.main}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <WordFuzzySearch></WordFuzzySearch>
    </div>
    </>
  )}
