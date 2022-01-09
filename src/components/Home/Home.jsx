import React, { useEffect, useState } from "react";
import axios from "axios"
//import { useDebounce } from 'use-debounce';
import Card from "../Card";
import '../Card'
import './Home.css'


const Home = () => {

  const [products, setProducts] = useState([]); //Objeto Products

  const [searchproduct, setSearchroduct] = useState(''); //Busca productos

  const [searchfab, setSearchfab] = useState(''); //Busca Fabricantes

  const [ordenarname, setOrdenarname] = useState(0); //Hook Para Ordenar comparando si es par/impar

  const [ordenarratio, setOrdenarratio] = useState(0); //Hook Para Ordenar comparando si es par/impar

  const [ordenarprecio, setOrdenarprecio] = useState(0); //Hook Para Ordenar comparando si es par/impar

  const [actualpage, setActualpage] = useState(1); //Hook Para Ordenar comparando si es par/impar

  const [limitporpage] = useState(10); //Hook Para Ordenar comparando si es par/impar

  //const [debouncedText] = useDebounce(search, 2000);

  useEffect(() => {

    const getproductbyfab = async () => {

      try {

        const getproductbyfab = await axios.get(`http://localhost:3000/api/sportbridge/?name=${searchproduct}&fab=${searchfab}`);
        const data = getproductbyfab.data

        const arrayProducts = data.map(e => {
          return {
            name: e.nombre,
            price: e.precio,
            rating: e.valoracion,
            img: e.img,
            categoria: e.categoria,
            fabricante : e.nombrefab,
            cif : e.cif,
            direccion : e.direccion
          }
        })

        setProducts(arrayProducts);
        console.log(arrayProducts)
      } catch (error) {
        console.log('error', error)
      }
    }
    getproductbyfab();
  }, [searchproduct, searchfab])


  // const hanledSubmit = (e) => {
  //   e.preventDefault()
  //   setSearch(e.target.name.value)
  //   setSearchfab(e.target.name.value)a
  // }


  const indiceitems = actualpage * limitporpage;

  const firstitems = indiceitems - limitporpage

  const limitshoes = products.slice(firstitems,indiceitems)

  const npages = []

  for( let i = 1 ;i <= Math.ceil(products.length/limitporpage); i++){
    npages.push(i)
  }
  const nextpage = page  => setActualpage(page)

  return <div>
    <p> </p>
    <div className="superform">
      <div className="divform" >
        <input type='button' className="btncat" value='Precio ↕' name='btnordena' onClick={(e) => {
          setOrdenarprecio(ordenarprecio + 1)
          products.sort((a, b) => { let n = (ordenarprecio % 2 == 0) ? b.price - a.price : a.price - b.price
            return n
          })
        }} />
        <input type='button' className="btncat" value='Relevancia ↕' name='btnordena' onClick={(e) => {
          setOrdenarratio(ordenarratio + 1)
          products.sort((a, b) => {let n = (ordenarratio % 2 == 0) ? b.rating - a.rating : a.rating - b.rating
            return n
          })
        }} />
        <input type='button' className="btncat" value='Nombre ↕' name='btnordena' onClick={(e) => {
          setOrdenarname(ordenarname + 1)
          products.sort((a, b) => {
            let n = (ordenarname % 2 == 0) ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            return n
          })
        }} />
        <div class="flex justify-center">
          <div class="mb-3 xl:w-96">
            <select class="form-select appearance-none
                              block
                              w-full
                              px-3
                              py-1.5
                              text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding bg-no-repeat
                              border border-solid border-gray-300
                              rounded
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(e) => { setSearchfab(e.target.value) }} name="fab" id="fab">
              <option selected  >Elije el fabricante</option>
              <option value="1">Nike</option>
              <option value="2">Adidas</option>
              <option value="3">Asics</option>
              <option value="">Todos</option>
            </select>
          </div>
        </div>
        <label htmlFor='name'><h4>Busca aqui tu Producto</h4></label><br />
        <input type="text" name="fab" id="fab" onChange={(e) => {setSearchroduct(e.target.value) }} placeholder="🔍" /><br /><br />
        {limitshoes.map((product, i) => <Card products={product} key={i} />)}
      </div>
    </div>
    <ul>
   {npages.map(number => (
     <li key={number} ><a href="#" onClick={()=>nextpage(number)}>Page {number} ➡</a></li>
   ))}
    </ul>
  </div>;
};

export default Home;
