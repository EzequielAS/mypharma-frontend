import { Routes as Switch, Route } from 'react-router-dom'
// import { PrivateRoute } from './privateRoute'

import { Login } from '../pages/Login'

const Routes = () => (
    <Switch>
         <Route path='/' element={<Login />}/>
    </Switch>
);

export default Routes