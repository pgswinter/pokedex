import Loadable from 'react-loadable';

import LoadableLoading from './components/LoadableLoading';

export const HomePageLoader = Loadable({
    loader: () => import(/* webpackChunkName: "home_page" */'~/components/HomePage'),
    loading: LoadableLoading,
    delay: 50
});