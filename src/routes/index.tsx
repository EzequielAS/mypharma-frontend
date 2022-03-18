import { Routes as Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Categories } from '../pages/Categories'
import { Brands } from '../pages/Brands'
import { Products } from '../pages/Products'

const Routes = () => (
    <Switch>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route 
            path='/categories' 
            element={<PrivateRoute component={Categories} />}
        />
        <Route 
            path='/brands' 
            element={<PrivateRoute component={Brands} />}
        />
        <Route 
            path='/products' 
            element={<PrivateRoute component={Products} />}
        />
        <Route path='*' element={<p>404</p>}/>
    </Switch>
);

export default Routes