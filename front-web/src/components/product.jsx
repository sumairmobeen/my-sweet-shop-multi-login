import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
// import("./Dashboard");
import "./product"
function App() {


  const [cart, setCart] = useState([]);
  const [item, setItem] = useState([{
    CarName: "Audi",
    amount: 12000000,
    quantity: 1,
    image:
      "https://freepngimg.com/thumb/car/11-2-car-picture.png",
    id: 7001,
    lessThanZero: false,
  },

  {
    CarName: "Suzuki",
    amount: 1720000,
    quantity: 1,
    image:
      "http://www.pngmart.com/files/10/Suzuki-Car-PNG-Photos.png",
    id: 8532,
    lessThanZero: false,
  },
  {
    CarName: "ISUZU",
    amount: 4920000,
    quantity: 1,
    image:
      "http://pngimg.com/uploads/isuzu/isuzu_PNG32.png",
    id: 7632,
    lessThanZero: false,
  },
  ]);

  // const [cart, setCart] = useState(0);

  // function Add(value) {
  //   setCart([...cart,value])

  // return console.log(value)

  // add() {
  //   this.setState({
  //     qty: this.state.qty + 1
  //   });
  //   this.props.handleTotal(this.props.price);
  // }

  // subtract() {
  //   this.setState({
  //     qty: this.state.qty - 1
  //   });
  //   this.props.handleTotal(-this.props.price);
  // }

  // showInfo() {
  //   this.props.handleShow(this.props.info);
  // }




  function addItem(product) {
    const exist = cart.find((eachproduct) => eachproduct.id === product.id)
    if (exist === undefined) {
      setCart([...cart, product])
    }

  }



  return (


    <div className="main">

      {item.map((product, index) => (
        <div key={index}>

          <div className="container">
          <img src={product.image}></img>
            <div></div>

          <p>{product.CarName}</p>
          <p>{product.amount}</p>
          <p>{product.quantit}</p>
          <p>{product.id}</p>

          <button onClick={() => {
            addItem(product)
          }}>Add To Cart</button>
          </div>

        </div>

      ))}

      <div className="main2">

      {cart.map((product, index) => (
        <div key={index}>

          <div className="container2">

          <img src={product.image}></img>
          <p>{product.CarName}</p>
          <p>{product.amount}</p>
          <p>{product.quantit}</p>
          <p>{product.id}</p>
          {/* <div className="but1">
          <button>+</button>
          </div>
          <div className="but2">
          <button>-</button>
          </div> */}


<button onClick={item}>
              +1
            </button>
            <button onClick={item}>
              1
            </button>



          </div>

         
        </div>

      ))}

      </div>

    </div>
  )
}
export default Product;







// function AddToCart(value) {
  //   const exist = cart.find((x) => x._id === value._id)
  //   if (exist) {
  //     setCart(
  //       cart.map((x) =>
  //         x._id === value._id ? { ...exist, stock: exist.stock + 1 } : x
  //       )
  //     )
  //     var prevProducts = [...cartItem];
  //     prevProducts[index].stock =  prevProducts[index].stock + 1;
  //     setCartItem(prevProducts);


  //   } else {
  //     setCart([...cart, { ...value, stock: 1 }])
  //     console.log(value)
  //   }

  // }


