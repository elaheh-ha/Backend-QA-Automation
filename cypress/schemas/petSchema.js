// petSchema.js
const petSchema = {
    type: 'object',
    required: ['id', 'category', 'name', 'photoUrls', 'tags', 'status'],
    properties: {
      id: { type: 'number' },
      category: {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' }
        }
      },
      name: { type: 'string' },
      photoUrls: {
        type: 'array',
        items: { type: 'string' }
      },
      tags: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: { type: 'number' },
            name: { type: 'string' }
          }
        }
      },
      status: { type: 'string' }
    }
  };
  
  export default petSchema;
  