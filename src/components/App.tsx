import * as React from 'react';
import { Switch, Route } from 'react-router';
import { Home } from './Home/index';
import { Page, Header, Footer } from './SiteTemplates';
import Draw from '../containers/Draw';
import Ping from '../containers/Ping';

class MainContainer extends React.Component {
    render() {
        return (
            <div className="container content">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8">
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
        <Footer />
    </Page>
);
export default App;
