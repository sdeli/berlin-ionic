import React from 'react';

// import styles from './list.css';

interface User {
  name: string,
  age: number
}

interface ListProp {
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export function List({onClick}: ListProp) {
  const employes: User[] = [
    {name: 'sandor 33333', age: 1},
    {name: 'sandor 2', age: 12},
    {name: 'sandor 3', age: 13},
    {name: 'sandor 4', age: 14},
  ]

  const list = employes.map((item) => {
    return <li>{item.name}  {item.age}</li>
  })

  return (
    <>
    <ul>{list}</ul>
    <button onClick={onClick}>
        sannya
      </button>
    </>
  )
  ;
  
}
