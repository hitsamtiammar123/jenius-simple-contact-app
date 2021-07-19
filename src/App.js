import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {TableContent, FormContent} from './components/index';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <nav class="nav nav-tabs">
          <Link class="nav-link" to="/">Home</Link>
          <Link class="nav-link" to="/create">Create New Contact</Link>
        </nav>
        <div className="container">
            <Switch>
              <Route path={["/create","/edit/:id"]}>
                <FormContent/>
              </Route>
              <Route path="/">
                <TableContent/>
              </Route>
            </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
