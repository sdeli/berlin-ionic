import { useSelector } from 'react-redux';
import "./SensesTable.scss";
import { selectChosenWord, selectWords } from '../redux/wordSlice';
import { IonIcon } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
// const words = useSelector(selectWords);


export const SensesTable = () => {
  const chosenWord = useSelector(selectChosenWord);
  if (!chosenWord) {
    return '';
  }
  
  if (!chosenWord.senses.length) return '';

  const meaningTables = chosenWord.senses.map((sense) => {
    if (!sense.lines.length) return '';

    const lines = sense.lines.map((line) => {
      return (
        <div key={line.ID} className="senses-table-row">		
          <div className="senses-table-data" style={{paddingLeft: '10px'}}>{line.source.text}</div>
          <div className="senses-table-data">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <span style={{width: '85%'}}> 
              {line.target.text}
            </span>
            <span style={{
              width: '15%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <IonIcon style={{ fontSize: '24px' }} icon={addCircle} />
            </span>

            </div>
          </div>
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