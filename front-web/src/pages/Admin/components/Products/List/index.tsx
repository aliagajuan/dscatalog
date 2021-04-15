import Pagination from 'core/components/Pagination';
import ProductFilters from 'core/components/ProductFilters';
import {Category, ProductsResponse } from 'core/types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import CardLoader from '../Loaders/ProductCardLoader'

const List = () =>{
    const history = useHistory();

    const handleCreate = () => {
        history.push('/admin/products/create');
    }

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading]= useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name,setName] = useState('');
    const [category,setCategory] = useState<Category>();
    console.log(productsResponse);

    const getProducts = useCallback(() => {
        const params ={
            page:activePage,
            linesPerPage:4,
            direction: 'DESC',
            orderBy:'id',
            name:name,
            categoryId:category?.id
        }

        setIsLoading(true);
        makeRequest({url: '/products', params})
            .then(response => setProductsResponse(response.data))
            .finally(() =>{
                setIsLoading(false);
            })
    },[activePage,name,category])
    //quando o componente iniciar, busca a lista de proudutos
    // quando a lista de produtos estiver disponivel,
    //popular um estado no componente, e listar os produtos dinamicamente

    useEffect(()=>{
       getProducts();
    },[getProducts]);

    const onRemove = (productId: number)=>{
        const confirm = window.confirm('Deseja realmente excluir esse produto?');
        
        if(confirm){
            makePrivateRequest({
                url:`/products/${productId}`,
                method: 'DELETE'
            })
            .then(()=>{
                toast.info('Produto removido com sucesso');
                getProducts();
            })
            .catch(()=>{
                toast.error('Erro ao remover produto');
            })
        }
    }

    const handleChangeName = (name:string) =>{
        setActivePage(0);
        setName(name);
    }

    const handleChangeCategory= (category:Category)=>{
        setActivePage(0);
        setCategory(category);
    }

    const clearFilters = ()=>{
        setActivePage(0);
        setCategory(undefined);
        setName('');
    }

    return (
        <div className="admin-products-list">
            <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleCreate}>
                ADICIONAR
            </button>
            <ProductFilters name={name} category={category} handleChangeCategory={handleChangeCategory} handleChangeName={handleChangeName} clearFilters={clearFilters}/>
            </div>
        <div className="admin-list-container">
            {isLoading ? <CardLoader/> : productsResponse?.content.map(product => (
                <Card product={product} key={product.id} onRemove={onRemove}/>
                )
                )
            }
        </div>
        {productsResponse && (
       <Pagination 
       totalPages={productsResponse?.totalPages}
       activePage={activePage}
       onChange={page => setActivePage(page)}
       />
       )}
        </div>
    )
}

export default List;
