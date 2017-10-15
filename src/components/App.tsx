import * as React from 'react';
import { Switch, Route } from 'react-router';
import { Home } from './Home/index';
import { Page } from './SiteTemplates/Page';
import { Header } from './SiteTemplates/Header';
// import { Draw } from './Draw/index';
import { Ping } from './Ping/index';
import Draw from '../containers/Draw';

class MainContainer extends React.Component {
    render() {
        return (
            <div className="container content">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        {/*<div className="col-12 mt-0 mt-sm-3">*/}
                            {this.props.children}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}
const Main = () => (
        <MainContainer>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/draw" component={Draw} />
                <Route exact path="/ping" component={Ping} />
            </Switch>
        </MainContainer>
);
const App = () => (
    <Page>
        <Header />
        <Main />
    </Page>
);
export default App;
