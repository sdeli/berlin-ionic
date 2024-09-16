import { useSelector } from 'react-redux';
import "./SensesTable.scss";
import { selectChosenWord, selectChosenWordIsLoading } from '../redux/wordSlice';
import { IonIcon } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import { AddSenseLineToListModal } from './AddSenseLineToListModal';
import { useState } from 'react';
import { SenseLineDTO } from '../dto';
import { DefaultDicDash } from './DefaultDicDash.tsx';
import { SensesTableSkeleton } from './SensesTableSkeleton';
// const words = useSelector(selectWords);


export const SensesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineIdToAdd, setLineIdToAdd] = useState<SenseLineDTO | null>(null);
  const chosenWord = useSelector(selectChosenWord);
  const chosenWordIsLoading = useSelector(selectChosenWordIsLoading);

  if (!chosenWord) {
    return <DefaultDicDash></DefaultDicDash>;
  }

  if (chosenWordIsLoading) {
    return <SensesTableSkeleton></SensesTableSkeleton>;
  }

  if (!chosenWord.senses.length) return '';

  const openModal = (line: SenseLineDTO) => {
    setLineIdToAdd(line);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setLineIdToAdd(null);
    setIsModalOpen(false);
  };

  const meaningTables = chosenWord.senses.map((sense) => {
    if (!sense.lines.length) return '';

    const lines = sense.lines.map((line) => {
      const highlightedChosenWord = `<strong>${chosenWord.text}</strong>`;
      const sourceText = line.source.text.replace(chosenWord.text, highlightedChosenWord)

      return (
        <div key={line.ID} className="senses-table-row">
          <div className="senses-table-data" style={{ paddingLeft: '10px' }} dangerouslySetInnerHTML={{ __html: sourceText }}></div>
          <div className="senses-table-data">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <span style={{ width: '85%' }}>
                {line.target.text}
              </span>
              <span style={{
                width: '15%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <IonIcon
                  onClick={() => { openModal(line) }}
                  style={{ fontSize: '24px', cursor: 'pointer' }}
                  icon={addCircle}
                />
              </span>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div key={sense.ID} className="senses-table" style={{ marginBottom: '50px' }}>
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
      <div>
        {
          meaningTables
        }
      </div>
      <div>
        {lineIdToAdd ? (
          <AddSenseLineToListModal isOpen={isModalOpen} onClose={closeModal} line={lineIdToAdd} />
        ) : (<></>)}
      </div>
    </div>
  )
}