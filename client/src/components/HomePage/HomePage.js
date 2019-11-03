import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { Test } from './HomePage.styles';
import {
  setHappy,
  renderHappy
} from '../../util/calculator';

import Loading from '../Loading';
import SearchPage from '../SearchPage';
import ProgressBar from 'react-bootstrap/ProgressBar'

import {
  reqPokedesk,
  reqRemovePokemon,
  reqProcessLocal
} from '../../actions/pokedesk/pokedeskActions';

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pokedex: [],
      activeModal: false,
    };
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside, false);
    const params = {
      limit: 20
    }
    this.props.reqPokedesk(params);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = (e) => {
    if (this.node.contains(e.target)) {
      this.setState({
        activeModal: false
      })
    }
  }

  openModal = () => {
    this.setState({
      activeModal: true
    })
  }
  closeModal = () => {
    this.setState({
      activeModal: false
    })
  }

  handleRemove = (id) => {
    // PROCESS LOCAL
    const { pokemonList } = this.props;
    const pokedex = pokemonList.data && pokemonList.data.pokedesk
    const localParams = {
      data: pokedex,
      type: 'remove/wasPicked',
      id
    }
    this.props.reqProcessLocal(localParams);
    // SAVE DATABASE
    const params = {
      id
    }
    this.props.reqRemovePokemon(params);
  }

  render() {
    const { activeModal } = this.state;
    const { pokemonList } = this.props;
    const loading = pokemonList && pokemonList.loading;
    const isLoaded = pokemonList && pokemonList.isLoaded;
    if (loading !== false || isLoaded !== true) {
      return <Loading />
    }
    
    return (
      <div>
        <SearchPage active={activeModal} />
        <div className="home-page" ref={node => this.node = node}>
          <div className={`container-pokedex ${activeModal ? 'active-modal' : ''}`}>
            <h1>My pokedex</h1>
            {
              pokemonList && pokemonList.data && pokemonList.data.pokedesk
              && pokemonList.data.pokedesk.length > 0
              && pokemonList.data.pokedesk.map((item, i) => {
                const {
                  id,
                  hp,
                  name,
                  image,
                  attacks,
                  weaknesses,
                } = item;
                return <div className="card__container-pokedex" key={i}>
                  <div className="card__img-wrap">
                    <img src={image} alt="_pikachu" />
                  </div>
                  <div className="item__card">
                    {id}
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
                  <button className="button-pokedex btn-remove" onClick={() => this.handleRemove(id)}>x</button>
                </div>
              })
            }
            <div className="add-wrapper">
              <button className="button-pokedex btn-open" onClick={() => this.openModal()}>+</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  // bla: PropTypes.string,
};

HomePage.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => {
  const {
    reqPokedesk,
  } = state
  return {
    pokemonList: reqPokedesk,
  }
}

const mapDispatchToProps = dispatch => ({
  reqPokedesk: (params) => dispatch(reqPokedesk(params)),
  reqRemovePokemon: (params) => dispatch(reqRemovePokemon(params)),
  reqProcessLocal: (params) => dispatch(reqProcessLocal(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
