module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '611a84f41e040887dcf5495ff9bd96dc'),
  },
});
