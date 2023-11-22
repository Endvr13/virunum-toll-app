import { useState } from 'react'
import TollItem from './TollItem'
import PaymentForm from './PaymentForm';

function App() {
  const [items] = useState([
    {
      id: 1,
      toll_image: './src/assets/single_light.svg',
      toll_vehicle: 'Single person, light load',
      price_1: 1,
      denomination_1: 'As',
      cost: 0.1,
    },

    {
      id: 2,
      toll_image: './src/assets/single_heavy.svg',
      toll_vehicle: 'Single person, heavy load',
      price_1: 2,
      denomination_1: 'As',
      cost: 0.2,
    },

    {
      id: 3,
      toll_image: './src/assets/single_cart.svg',
      toll_vehicle: 'Single person, hand-drawn cart',
      price_1: 1,
      denomination_1: 'Dupondius',
      price_2: 1,
      denomination_2: 'As',
      cost: 0.3,
    },

    {
      id: 4,
      toll_image: './src/assets/horse_rider.svg',
      toll_vehicle: '1 horse + rider',
      price_1: 2,
      denomination_1: 'Dupondius',
      cost: 0.4,
    },

    {
      id: 5,
      toll_image: './src/assets/horse_cart.svg',
      toll_vehicle: 'Horse-drawn cart, 1 horse',
      price_1: 3,
      denomination_1: 'Dupondius',
      cost: 0.6,
    },
    {
      id: 6,
      toll_image: './src/assets/horse_cart.svg',
      toll_vehicle: 'Horse-drawn cart, 2-3 horses',
      price_1: 4,
      denomination_1: 'Dupondius',
      cost: 0.8
    },
    {
      id: 7,
      toll_image: './src/assets/horse_cart.svg',
      toll_vehicle: 'Horse-drawn cart, 4-5 horses',
      price_1: 1,
      denomination_1: 'Denarius',
      cost: 1
    },
    {
      id: 8,
      toll_image: './src/assets/horse_cart.svg',
      toll_vehicle: 'Horse-drawn cart, 6 horses',
      price_1: 1,
      denomination_1: 'Denarius',
      price_2: 2,
      denomination_2: 'Sestertius',
      cost: 1.5,
    },

  ] as Toll[]);

  const [cartItems, setCartItems] = useState([])
  
  //Function to handle adding items to the cart when the TollItem component is clicked 
  const addToCart = (toll: { id: any; }, isActive: any) => {
    if (isActive) {
      const existingItemIndex = cartItems.findIndex((item) => item.id === toll.id);

      if(existingItemIndex !== -1) {

        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, {...toll, quantity: 1}]);
      }
    } else {
      const updatedCartItems = cartItems.filter((item) => item.id !== toll.id);
      setCartItems(updatedCartItems);
    }
  };

  //Function to handle changing the quantity of a specific item in the cart
  const updateQuantity = (tollId: any, quantityChange: number) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === tollId);
    //if the item exist in the cart, the quantity of that item is changed based on the value of 'quantityChange'
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantityChange;
      
      //if there is less than 1 item quantity, the item is removed from the cart
      if (updatedCartItems[existingItemIndex].quantity < 1) {
        updatedCartItems[existingItemIndex].quantity = 1;
        const tollToRemove = updatedCartItems[existingItemIndex];
        setCartItems(updatedCartItems);
        removeFromCart(tollToRemove)
      } else {
        setCartItems(updatedCartItems);
      }
      
    }
  };

  //Function to handle removing items from the cart
  const removeFromCart = (tollToRemove: { id: any; }) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== tollToRemove.id);
    setCartItems(updatedCartItems);
  }
  //Calculates the total cost of all selected items in the cart
  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
  };

  //converts the decimal cost into Roman currency
  const convertToRoman = (cost: number) => {
    let costInteger = Math.floor(cost);
    let costDecimal = (Math.round((cost - Math.floor(cost)) * 10) / 10);
    let denomination = '';

    const decimalToDenomination = {
      0.1: "1 As",
      0.2: "1 Dupondius",
      0.3: "1 Dupondius 1 As",
      0.4: "2 Dupondius",
      0.5: "2 Sesterius",
      0.6: "3 Dupondius",
      0.7: "3 Dupondius 1 As",
      0.8: "4 Dupondius",
      0.9: "4 Dupondius 1 As"
    };

   denomination = decimalToDenomination[costDecimal] || '';

    if(costInteger !== 0 && costDecimal !== 0) {
      return `${costInteger} Denarius ${denomination}`;  
    } else if (costInteger === 0) {
      return denomination;
    } else if ( costInteger !== 0 && costDecimal === 0) {
      return `${costInteger} Denarius`;
    }

  };

  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);
  
  
  const handleCheckout = () => {
    setIsPaymentFormVisible(true);
  };
  
  const handleSavePaymentData = (paymentData: PaymentData) => {
    // Perform actions with the saved payment data, such as passing to a backend API, for demonstration, displays the payment data in console
    paymentData.totalCost = (Math.round(calculateTotalCost()* 100) /100);

    console.log('Payment data saved:', paymentData);
    setIsPaymentFormVisible(false);
    };

  
  return (
    <div className="max-w-full min-h-screen bg-old-lace font-sans">
      <main className="">
        <header className="">
          <h1 className="bg-gradient-to-r from-antique-ruby/80 via-antique-ruby/100 to-antique-ruby/80 text-4xl font-bold p-4 text-center text-dutch-white">
            City of Virunum Council
          </h1>
          <p className="bg-gradient-to-r from-dark-vanilla/80 via-dark-vanilla/100 to-dark-vanilla/80 text-black font-bold p-2 text-2xl text-center">
            Toll Collection Services
          </p>
        </header>
        <div className="flex flex-col items-center min-w-full ">
          <p className="text-antique-ruby text-center text-xl p-3">
            All travellers and goods transports passing through Virunum are required to pay a toll to enter our fine city
          </p>
          <p className="text-amaranth-red font-bold text-center text-xl p-3">
            Before entering, please ensure that you have paid the correct toll in advance, as entry may be refused
          </p>
          <div className="p-3 m-2">
            <p className=" text-center bg-gradient-to-r from-antique-ruby/80 via-antique-ruby/100 to-antique-ruby/80 text-dutch-white rounded-t-xl font-bold text-3xl p-4">
              Toll Prices
            </p>
            <p className="text-center text-lg mt-3">
              Please select the appropriate toll for your entry below 
            </p>
            {/*Creates the required number of TollItem components based on the data stored in 'items[]', allowing for extension of the application with more toll categories*/}
            <div className="grid md:grid-cols-4 grid-cols-2 items-center justify-items-center rounded-b-xl bg-gradient-to-t from-dark-vanilla/50 to-old-lace/75">
              {items.map((toll) => {
                return <TollItem 
                  key={toll.id} 
                  toll={toll} 
                  onAddToCart={addToCart} 
                  isActive={cartItems.some((item) => item.id === toll.id)}
                />
                })}
            </div>
            <p className="text-center bg-gradient-to-r from-antique-ruby/80 via-antique-ruby/100 to-antique-ruby/80 text-dutch-white rounded-t-xl font-bold text-3xl p-4 mt-3 ">Selected Tolls to pay</p> 
            <div className='justify-center'>        
              <ul>
                {/* Displays the Toll items added to cart*/}
                {cartItems.map((item) => (
                  <li key={item.id} className='flex items-center justify-between h-16 rounded-lg text-center mt-2 mb-2 bg-gradient-to-r from-dark-vanilla/80 via-dark-vanilla/100 to-dark-vanilla/80 text-black' >
                    <div>
                      <span className="items-start m-3">
                        {/*Increase or decreases the items in the cart when the appropriate button is clicked */}
                        <button className="text-center text-sm h-4 lg:h-8 w-4 lg:w-8 rounded-md bg-antique-ruby text-dutch-white font-bold lg:text-xl mr-2" aria-label="Decrease by 1" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span className="font-bold text-xl w-16">
                          {item.quantity}
                          </span>
                        <button className="text-center text-sm h-4 lg:h-8 w-4 lg:w-8 rounded-md bg-green-800 text-dutch-white font-bold lg:text-xl ml-2 mr-2 " aria-label="Increase by 1"onClick={() => updateQuantity(item.id, 1)}>+</button> 
                      </span>
                      <span className="whitespace-nowrap md:font-bold text-xs md:text-xl">
                        {item.toll_vehicle}
                      </span>
                    </div>
                    <div className="whitespace-nowrap md:font-bold text-xs md:text-xl mr-3">
                      {convertToRoman((Math.round((item.cost * item.quantity) * 10) / 10))}
                    </div>
                  </li>
                ))}
                <div className="flex flex-cols-2 justify-between text-end bg-gradient-to-r from-antique-ruby/80 via-antique-ruby/100 to-antique-ruby/80 text-dutch-white rounded-b-xl font-bold text-3xl p-4 mt-3 ">
                  <p>Total Cost:</p>{convertToRoman((Math.round(calculateTotalCost() * 10) /10))}
                </div>
              </ul>

            </div>              
            <div className="flex justify-center mt-5">
              <button onClick={handleCheckout} className="w-1/4 bg-antique-ruby font-bold text-xl text-dutch-white p-2 rounded-full hover:bg-antique-ruby/75 hover:text-black">Checkout</button>
            </div>
            {isPaymentFormVisible && (<PaymentForm isVisible onSave={handleSavePaymentData} totalCost={calculateTotalCost()} />)}
          </div>

        </div>
      </main>
    </div>
  )
}

export default App