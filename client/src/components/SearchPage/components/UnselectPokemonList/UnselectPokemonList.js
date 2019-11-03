import React from 'react';
import PropTypes from 'prop-types';
import {
  setHappy,
  renderHappy
} from '../../../../util/calculator';
import ProgressBar from 'react-bootstrap/ProgressBar';

const onHandleAdd = (props, id) => {
  props.onHandleAdd(id)
}

const UnselectPokemonList = (props) => {
  const {
    list
  } = props;
  // const {
  //   allList,
  //   searchList
  // } = props;
  // console.log(`allList: `,allList,`searchList: `, searchList);
  // const list = allList ? allList : searchList;

  return (
    <div className="modal__container-pokedex">
      {
        list.length > 0 ? list.map((item, i) => {
          const {
            id,
            name,
            image,
            hp,
            attacks,
            weaknesses,
          } = item;
          return <div className="card__container-pokedex" key={i}>
            <div className="card__img-wrap">
              <img src={image} alt="_pikachu" />
            </div>
            <div className="item__card">
              <div className="text__item">
                <p className="toUppercase">{name}</p>
              </div>
              <div className="text__item">
                <label>HP</label>
                <p>{hp}</p>
              </div>
              <div className="text__item">
                <label>STR</label>
                <ProgressBar now={attacks.length >= 2 ? 100 : (attacks.length === 1 ? 50 : 0)} />
              </div>
              <div className="text__item">
                <label>WEAK</label>
                <ProgressBar now={weaknesses.length >= 1 ? 100 : 0} />
              </div>
              <div className="text__item">
                <ul className="format-img">
                  {
                    renderHappy(setHappy(attacks, weaknesses, hp)).map((item, i) => <li key={i}>
                      <img src={item} alt="_happy" />
                    </li>
                    )
                  }
                </ul>
              </div>
            </div>
            <button className="button-pokedex btn-add" onClick={() => onHandleAdd(props, id)}>ADD</button>
          </div>
        }) : ''
      }
    </div>
  )
};

UnselectPokemonList.propTypes = {
  list: PropTypes.array,
};

UnselectPokemonList.defaultProps = {
  // bla: 'test',
};

export default UnselectPokemonList;
