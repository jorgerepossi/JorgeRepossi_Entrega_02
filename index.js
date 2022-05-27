/*
Entrega 02 - Clase 02
Alumno: Jo Repossi
Backend: NodeJS
Comisión 30995
Profesor: Diego Jofre
Fecha: Jueves 26 Mayo 2022
**/

import fs from 'fs';

const baseProd = JSON.parse( fs.readFileSync( './productos.json' ) )
const jsonFile = 'productos.json';

class Productos
{
  constructor ( prodcutos )
  {
    this.productosArray = prodcutos;
  }

  async write ( params )
  {
    const nuevoProducto = JSON.stringify( params, null, 2 )
    await fs.promises.writeFile( jsonFile, nuevoProducto, 'utf8' );
  }

  /**
   * SAVE function()
   * It reads the file, parses the JSON, adds the new object to the array, and then writes the array
   * back to the file
   * @param obj - The object to be saved.
   */
  async save ( obj )
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( 'productos.json', 'utf8' ) )
      const productosArray = data;
      productosArray.push( obj );
      let id = 0

      /* It's iterating over the array of products and checking if the id of the product is greater than
      the id variable. If it is, it assigns the id of the product to the id variable. */
      productosArray.forEach( ( producto ) =>
      {
        if ( producto.id > id ) id = producto.id

      } )

      obj.id = id + 1
      await fs.promises.writeFile( jsonFile, JSON.stringify( productosArray, null, 2 ) );

    } catch ( err ) {
      console.log( err )
    }
  }

  /**
   * GET BY ID function()
   * It reads the file, parses it, and then searches for the product with the id number that was passed
   * as an argument
   * @param idNumber - The id of the product you want to find.
   */
  async getById ( idNumber )
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( jsonFile, 'utf8' ) )
      this.productosArray = data;
      const producto = this.productosArray.find( ( producto ) => producto.id === idNumber )
      if ( producto ) console.log( producto )
      else console.log( 'No se encontro el producto' )
    } catch ( err ) {
      console.log( err )
    }

  }

  /**
   * GET ALL function()
   * It reads the file, parses the JSON, and then maps the array of products to a new array
   */
  async getAll ()
  {
    const data = await fs.promises.readFile( jsonFile )
    const productos = JSON.parse( data )
    if ( productos.length ) {
      const todosLosProductos = productos.map( ( producto ) => producto )
      console.log( todosLosProductos )
    } else {
      console.log( 'No hay productos' )
    }
  }


  async deleteById ( idNumber )
  {
    try {
      const data = await fs.promises.readFile( jsonFile )
      this.productosArray = JSON.parse( data )

      const newData = this.productosArray.findIndex( ( producto ) => producto.id === idNumber ? true : false )
      if ( newData !== -1 ) {
        this.productosArray.splice( newData, 1 )
        this.write( this.productosArray )
        console.log( 'Producto borrado' )
      } else {
        console.log( 'No se encontro el producto' )
      }

    } catch ( err ) {
      console.log( err )
    }


  }

  /**
   * DELETE ALL function()
   * It reads the file, parses the JSON, checks if there are any products, and if there are, it writes
   * an empty array to the file
   */
  async deleteAll ()
  {
    try {
      const data = JSON.parse( await fs.promises.readFile( jsonFile, 'utf8' ) )
      if ( data.length ) {
        this.write( [] )
        console.log( 'Todos los archivos fueron borrados ' )
      } else {
        console.log( 'No hay productos para borrar' )
      }

    } catch ( err ) {
      console.log( err )
    }
  }


  async createNewProdTxt ()
  {
    try {
      const data = await fs.promises.readFile( jsonFile, 'utf8' )
      this.productosArray = JSON.parse( data )
      const newProductTxt = fs.promises.writeFile( './productos.txt', JSON.stringify( this.productosArray, null, 2 ) )
      return newProductTxt;

    } catch ( err ) {
      console.log( err )
    }
  }
}


const productos = new Productos( baseProd );
const newProduct_1 = {
  title: 'Apple Watch Series 7',
  price: 70000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-s7-digitalmat-gallery-2-202203_GEO_ES?wid=364&hei=333&fmt=png-alpha&.v=1646033515724'
}
const newProduct_2 = {
  title: 'iPhone 12',
  price: 15000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone12-digitalmat-gallery-2-202111?wid=364&hei=333&fmt=png-alpha&.v=1635178709000'
}
const newProduct_3 = {
  title: 'iMac de 24 pulgadas',
  price: 230000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/imac24-digitalmat-gallery-2-202111?wid=364&hei=333&fmt=png-alpha&.v=1635186198000'
}
const newProduct_4 = {
  title: 'Apple TV 4K',
  price: 80000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-tv-4k-hero-select-202104?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1619139498000'
}
const newProduct_5 = {
  title: 'iPhone 11',
  price: 15000,
  thumbnail:
    'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone12-digitalmat-gallery-2-202111?wid=364&hei=333&fmt=png-alpha&.v=1635178709000'
}
await productos.save( newProduct_5 );
//await productos.getById( 1 )
//productos.getAll()
// productos.deleteAll()
//await productos.deleteById( 3 )
await productos.createNewProdTxt()