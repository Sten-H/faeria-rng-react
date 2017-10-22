import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home } from './Home/index';
import { Page } from './SiteTemplate';
import Draw from '../containers/Draw';
import Ping from '../containers/Ping';

class MainContainer extends React.Component {
    render() {
        return (
            <div className="container content">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8">
                            {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
export const routes = (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/draw" component={Draw} />
        <Route exact path="/ping" component={Ping} />
    </div>
);

const Main = () => (
        <MainContainer>
                {routes}
        </MainContainer>
);

const App = () => (
    <Page>
        <Main />
    </Page>
);
export default App;
