import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { Test } from './SearchPage.styles';

import {
  setHappy,
  renderHappy
} from '../../util/calculator';

import ProgressBar from 'react-bootstrap/ProgressBar'

import {
  reqSearchPokemon,
  reqAddPokemon
} from '../../actions/pokedesk/pokedeskActions';

class SearchPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      valueSearch: ''
    };
    
  }

  componentDidMount = () => {
  }

  handleAdd = (id) => {
    const params = {
      id
    }
    this.props.reqAddPokemon(params);
  }

  handleInputSeach = (e) => {
    const inputText = e.target.value;
    if (e.target.value.length > 0) {
      this.setState(() => {
        return {
          valueSearch: inputText
        }
      }, () => {
        const {
          valueSearch
        } = this.state;
        const params = {
          search_text: valueSearch
        }
        this.props.reqSearchPokemon(params)
      })
    } else {
      this.setState(() => {
        return {
          valueSearch: ''
        }
      }, () => {
        const {
          valueSearch
        } = this.state;
        const params = {
          search_text: valueSearch
        }
        this.props.reqSearchPokemon(params)
      })
    }
  }

  render() {
    const {
      valueSearch
    } = this.state;
    const {
      searchList,
      active
    } = this.props;
    const loading = searchList && searchList.loading;
    const isLoaded = searchList && searchList.isLoaded;
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className={`search-page ${active ? 'active' : ''}`}>
        <div className="searchWrap">
          <input placeholder="Find pokemon" type="text" onChange={(e) => this.handleInputSeach(e)} value={valueSearch} />
          <i className="fa fa-search pokedesk-search-icon"></i>
          <div className="searchWrap__seachModal">
            {(!loading && isLoaded) ?
              <div className="modal__container-pokedex">
                {
                  searchList && searchList.data && searchList.data.search_result &&
                  searchList.data.search_result.length > 0 &&
                  searchList.data.search_result.map((item, i) => {
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
                      <button className="button-pokedex btn-add" onClick={() => this.handleAdd(id)}>ADD</button>
                    </div>
                  })
                }
              </div>
              : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  // bla: PropTypes.string,
};

SearchPage.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => {
  const { reqSearchPokemon } = state;
  return {
    searchList: reqSearchPokemon
  }
}

const mapDispatchToProps = dispatch => ({
  reqSearchPokemon: (params) => dispatch(reqSearchPokemon(params)),
  reqAddPokemon: (params) => dispatch(reqAddPokemon(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
