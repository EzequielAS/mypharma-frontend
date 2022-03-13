import { Routes as Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

import { Login } from '../pages/Login'
import { Panel } from '../pages/Panel';

const Routes = () => (
    <Switch>
        <Route path='/' element={<Login />} />
        <Route 
            path='/panel' 
            element={<PrivateRoute component={Panel} />}
        />
    </Switch>
);

export default Routes