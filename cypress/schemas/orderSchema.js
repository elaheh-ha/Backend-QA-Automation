// orderSchema.js
const orderSchema = {
    type: 'object',
    required: ['id', 'petId', 'quantity', 'shipDate', 'status', 'complete'],
    properties: {
      id: { type: 'number' },
      petId: { type: 'number' },
      quantity: { type: 'number' },
      shipDate: { type: 'string', format: 'date-time' },
      status: { type: 'string' },
      complete: { type: 'boolean' }
    }
  };
  
  export default orderSchema;
  