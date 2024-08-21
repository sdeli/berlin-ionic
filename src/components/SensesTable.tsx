import { useSelector } from 'react-redux';
import "./SensesTable.scss";
import { selectWords } from '../redux/wordSlice';

// const words = useSelector(selectWords);


export const SensesTable = () => {
  const words = useSelector(selectWords);

  const chosenWord = words.words[0];
  if (!chosenWord) return '';
  if (!chosenWord.senses.length) return '';

  const meaningTables = chosenWord.senses.map((sense) => {
    if (!sense.lines.length) return '';

    const lines = sense.lines.map((line) => {
      return (
        <div key={line.ID} className="senses-table-row">		
          <div className="senses-table-data">{line.source.text}</div>
          <div className="senses-table-data">{line.target.text}</div>
        </div>
      )
    })

    return (
      <div key={sense.ID} className="senses-table">
        <div className="senses-table-header">
          <div className="header__item"><a id="name" className="filter__link" href="#">{sense.line.text}</a></div>
        </div>

        <div className="senses-table-content">	
          {lines}
        </div>
      </div>
    )
  })

  return (
    <div className="container">
      <div>
        <h2>{chosenWord.text}</h2>
      </div>

      {
        meaningTables
      }
    </div>
  )
}