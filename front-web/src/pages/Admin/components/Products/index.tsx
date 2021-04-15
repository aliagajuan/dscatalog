import React from 'react';
import { Link,Route, Switch } from 'react-router-dom';
import List from './List/'
import Form from './Form';

const Products = () =>{
    return (
        <div>
            <Switch>
                <Route path="/admin/products" exact>
                    <List></List>
                </Route>
                <Route path="/admin/products/:productId">
                    <Form/>
                </Route>
            </Switch>
        </div>
    );
}

export default Products;