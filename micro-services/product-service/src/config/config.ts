// Config — Demo
// Central place for service settings. In a real app these come from .env.

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3001,
  mongoUrl: process.env.MONGO_URL || 'demo://in-memory',
  serviceName: 'product-service',
};
