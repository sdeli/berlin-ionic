import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectLists } from '../redux/wordListsSlice';

const SenseListPage = () => {
  const { id: activeListId } = useParams<{ id: string }>();
  const wordLists = useSelector(selectLists);
  const activeList = wordLists.find((list => list.ID === activeListId));
  if (!activeList) return (<></>);

  const lines = activeList.senseLines.map((line) => {
      // const highlightedWord = `<strong>${line.source.text}</strong>`;
      const sourceText = line.source.text;

      return (
        <div key={line.ID} className="senses-table-row">		
          <div  className="senses-table-data" style={{
                width: '15%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
          }} dangerouslySetInnerHTML={{__html: sourceText}}>
          </div>

          <div className="senses-table-data">
              <span style={{width: '85%'}}> 
                {line.target.text}
              </span>
          </div>
        </div>
      )
  })

  return (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>List</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px'

        }}
      >
        <div key={activeList.ID} className="senses-table">
          <div className="senses-table-header">
            <div className="header__item"><a id="name" className="filter__link" href="#">{activeList.title}</a></div>
          </div>

          <div className="senses-table-content">	
            {lines}
          </div>
        </div>
      </div>
    </IonContent>
  </>
);
}

export default SenseListPage;
