import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { Test } from './SearchPage.styles';

import UnselectPokemonList from './components/UnselectPokemonList';

import {
  reqSearchLocal,
  reqProcessLocal,
  reqAllUnselectPokemon,
  reqSearchPokemon,
  reqAddPokemon,
} from '../../actions/pokedesk/pokedeskActions';

class SearchPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      valueSearch: '',
      // isSearching: false
    };

  }

  componentDidMount = () => {
    this.props.reqAllUnselectPokemon();
  }

  handleAdd = (id) => {
    // PROCESS LOCAL
    const {
      unselectPokemonList,
    } = this.props;
    const unselectList = unselectPokemonList && unselectPokemonList.data && unselectPokemonList.data.pokedesk;
    const localParams = {
      data: unselectList,
      type: 'remove/notPicked',
      id
    }
    this.props.reqProcessLocal(localParams);
    // const { isSearching } = this.state;
    // if(isSearching) {
    //   const {
    //     searchList,
    //   } = this.props;
    //   const unselectSearchList = searchList && searchList.data && searchList.data.search_result;
    //   const localParams = {
    //     data: unselectSearchList,
    //     type: 'remove/search/notPicked',
    //     id
    //   }
    //   this.props.reqProcessLocal(localParams);
    // } else {
    //   const {
    //     unselectPokemonList,
    //   } = this.props;
    //   const unselectList = unselectPokemonList && unselectPokemonList.data && unselectPokemonList.data.pokedesk;
    //   const localParams = {
    //     data: unselectList,
    //     type: 'remove/notPicked',
    //     id
    //   }
    //   this.props.reqProcessLocal(localParams);
    // }
    // SAVE DATABASE
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
          valueSearch: inputText,
        }
      }, () => {
        const {
          valueSearch
        } = this.state;
        this.props.reqSearchLocal(valueSearch)
      })
    } else {
      this.setState(() => {
        return {
          valueSearch: '',
          isSearching: false
        }
      }, () => {
        const {
          valueSearch
        } = this.state;
        this.props.reqSearchLocal(valueSearch)
      })
    }
    // const inputText = e.target.value;
    // if (e.target.value.length > 0) {
    //   this.setState(() => {
    //     return {
    //       valueSearch: inputText,
    //       isSearching: true
    //     }
    //   }, () => {
    //     const {
    //       valueSearch
    //     } = this.state;
    //     const params = {
    //       search_text: valueSearch
    //     }
    //     this.props.reqSearchPokemon(params)
    //   })
    // } else {
    //   this.setState(() => {
    //     return {
    //       valueSearch: '',
    //       isSearching: false
    //     }
    //   }, () => {
    //     const {
    //       valueSearch
    //     } = this.state;
    //     const params = {
    //       search_text: valueSearch
    //     }
    //     this.props.reqSearchPokemon(params)
    //   })
    // }
  }

  render() {
    const {
      valueSearch,
      // isSearching
    } = this.state;
    const {
      unselectPokemonList,
      // searchList,
      active
    } = this.props;

    const unselectListloading = unselectPokemonList && unselectPokemonList.loading;
    const unselectListIsLoaded = unselectPokemonList && unselectPokemonList.isLoaded;
    const unselectList = unselectPokemonList && unselectPokemonList.data && unselectPokemonList.data.pokedesk;

    // const loading = searchList && searchList.loading;
    // const isLoaded = searchList && searchList.isLoaded;
    // const unselectSearchList = searchList && searchList.data && searchList.data.search_result;

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className={`search-page ${active ? 'active' : ''}`}>
        <div className="searchWrap">
          <input placeholder="Find pokemon" type="text" onChange={(e) => this.handleInputSeach(e)} value={valueSearch} />
          <i className="fa fa-search pokedesk-search-icon"></i>
          <div className="searchWrap__seachModal">
            {(!unselectListloading && unselectListIsLoaded) ?
              <UnselectPokemonList
                list={unselectList}
                // allList={unselectList}
                onHandleAdd={this.handleAdd}
              />
              : ''
            }
            {/* {(!unselectListloading && unselectListIsLoaded && !isSearching) ?
              <UnselectPokemonList
                list={unselectList}
                // allList={unselectList}
                onHandleAdd={this.handleAdd}
              />
              : ''
            }
            {(!loading && isLoaded && isSearching) ?
              <UnselectPokemonList
                list={unselectList}
                // searchList={unselectSearchList}
                onHandleAdd={this.handleAdd}
              />
              : ''
            } */}
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
  const {
    reqSearchPokemon,
    reqAllUnselectPokemon
  } = state;
  return {
    unselectPokemonList: reqAllUnselectPokemon,
    searchList: reqSearchPokemon
  }
}

const mapDispatchToProps = dispatch => ({
  reqSearchPokemon: (params) => dispatch(reqSearchPokemon(params)),
  reqAddPokemon: (params) => dispatch(reqAddPokemon(params)),
  reqAllUnselectPokemon: () => dispatch(reqAllUnselectPokemon()),
  reqProcessLocal: (params) => dispatch(reqProcessLocal(params)),
  reqSearchLocal: (params) => dispatch(reqSearchLocal(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
