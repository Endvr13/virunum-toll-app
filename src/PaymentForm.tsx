import { useState } from "react";

function PaymentForm({ isVisible, onSave, totalCost}: PaymentFormProps) {
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCVV] = useState('');
  
    const handleFormSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      // Integrate with a payment processing service
      // and use the payment information (cardNumber, cardholderName, expirationDate, cvv) for processing the payment.

      const paymentData: PaymentData = {
        cardNumber,
        cardholderName,
        expirationDate,
        cvv,
        totalCost,
      };

      onSave(paymentData);

      // Reset the form fields after processing the payment
      setCardNumber('');
      setCardholderName('');
      setExpirationDate('');
      setCVV('');
    };
  
    if (!isVisible) {
      return null;
    }
  
    return (
    <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto mt-8 p-4 rounded">
        <div className="mb-4">
            <label className="block text-black ml-2 font-bold mb-2" htmlFor="cardNumber">
            Card Number:
            </label>
            <input type="text" name="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
        </div>
        <div className="mb-4">
            <label className="block text-black ml-2 font-bold mb-2" htmlFor="cardholderName">
            Cardholder Name:
            </label>
            <input type="text" name="cardholderName"  value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
        </div>
        <div className="mb-4">
            <label className="block text-black ml-2 font-bold mb-2" htmlFor="expirationDate">
            Expiration Date:
            </label>
            <input type="text"  name="expirationDate" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
        </div>
        <div className="mb-4">
            <label className="block text-black ml-2 font-bold mb-2" htmlFor="cvv">
            CVV:
            </label>
            <input type="text" name="cvv" value={cvv} onChange={(e) => setCVV(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
        </div>
        <div className="flex justify-center w-full">
            <button type="submit" className="font-bold text-lg bg-green-800 text-white p-2 pl-5 pr-5 rounded-full hover:bg-green-700">
                Submit Payment
            </button>
        </div>
    </form>
    );
  }
  
  export default PaymentForm;