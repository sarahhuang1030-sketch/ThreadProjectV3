export default function CustomerList({ customers = [], showActions = false  }) {
    //display customers in a grid
    const customerList = customers; 
    const key = customerList.CustomerId;
    if (!customerList[key]) customerList[key] = [];
    customerList[key].push(customerList);   

    
    return (
  <div className="text-center space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
            <div key={customer.CustEmail}
                className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-gray-600 mb-1">
                    <strong>Customer ID:</strong> {customer.CustomerId}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                    {customer.CustFirstName} {customer.CustLastName}            
                </div>
                <p className="text-gray-600 mb-1">
                    <strong>Address:</strong> {customer.CustAddress}, {customer.CustCity}, {customer.CustProv}, {customer.CustPostal}           
                </p>

                <p className="text-gray-600 mb-1">
                    <strong>Country:</strong> {customer.CustCountry}
                </p>
                <p className="text-gray-600 mb-1">
                    <strong>Phone:</strong> {customer.CustHomePhone}
                </p>
                <p className="text-gray-600 mb-1">
                    <strong>Email:</strong> {customer.CustEmail}
                </p>
            </div>
        ))}
  </div>
  </div>
);
}
  
  
        