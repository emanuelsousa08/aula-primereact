import React, { useState, useEffect} from 'react';
import 'primeflex/primeflex.css';
import 'primeflex/themes/primeone-light.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import { api } from '../services';

const Home = () => {
const [produtos, setProdutos] = useState([]);

useEffect(() =>{
  const buscarProdutos = async () => {
    try{
      const resposta = await api.get('/products');
      setProdutos(resposta.data);
    }catch(erro){
      console.error('Erro ao buscar produtos:', erro);
    }
  };

  buscarProdutos();

},[]);

return (
    <>
    <section className='overflow-hidden px-5'>
      <h1>Lista de Produtos</h1>
      <ul className='grid list-none p-0'>
          {produtos.map(produto => (
          <li key={produto.id} className='col-12 md:col-3 shadow-4 p-3 border-round-md'>
              <div className='relative'>
                <img src={produto.image} alt={produto.title} style={{ width: '100%', height: '180px', objectFit: 'contain' }} />
                <div className='absolute top-0 right-0 card-rating text-white py-1 px-2 border-round  bg-green-700 text-bold'>
                  <i className='text-sm pi pi-star-fill'/> {produto.rating.rate}
                </div>
              </div>
            <h3 className='mb-0 card-title white-space-nowrap overflow-hidden text-overflow-ellipsis'>{produto.title}</h3>
            <h6 className='mb-0 card-category uppercase text-orange-500 uppercase'>{produto.category}</h6>
            <h2 className='mb-0 card-price'>${produto.price}</h2>
          </li>
        ))}
      </ul>
    </section>
    </>
  );
};

export default Home;
