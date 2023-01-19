import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PartDescriptor from '../components/PartDescriptor';
import { decrementPart, incrementPart, addPart } from '../actions/parts';
import { partsSelector } from '../selectors/local';

import './Home.sass';

const Home = () => {
  const [selectedPart, setSelectedPart] = useState<string>(null);
  const parts = useSelector(partsSelector);
  const [newPart, setNewPart] = useState('');
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    const listDom = ref.current;
    parts.map(part =>
      part.name === selectedPart
        ? (listDom.querySelector(`#${part.name}`).style.backgroundColor =
            '#42e9f5')
        : (listDom.querySelector(`#${part.name}`).style.backgroundColor = '')
    );
  }, [selectedPart]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const doesExist = parts.findIndex(part => part.name === newPart) !== -1;
    if (doesExist) {
      alert('duplicate new part name');
      return;
    }
    dispatch(addPart(newPart));
    setNewPart('');
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>Parts Counter</h1>
      <hr />
      <ul className="partsList" ref={ref}>
        {parts.map(part => (
          <li
            key={part.name}
            id={part.name}
            onClick={() => setSelectedPart(part.name)}
          >
            {part.name} {part.amount}
            <button
              onClick={e => {
                dispatch(incrementPart(part.name));
              }}
            >
              +
            </button>
            <button
              onClick={e => {
                decrementPart(part.name)(dispatch);
              }}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Add a new part</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={newPart}
          onChange={e => setNewPart(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">Add</button>
      </form>
      <hr />
      <h2>Part Info</h2>
      {selectedPart &&
        (() => {
          const part = parts.find(x => x.name === selectedPart);
          return <PartDescriptor name={part.name} amount={part.amount} />;
        })()}
    </div>
  );
};

export default Home;
