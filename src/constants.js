const states = {
  INACTIVE: 0,
  ACTIVE: 10
}

const Constants = {
  // helpful shortcuts for HTTP response codes
  //  https://httpstatuses.com
  HTTP200: 200,
  HTTP201: 201,
  HTTP202: 202,
  HTTP204: 204,
  HTTP400: 400,
  HTTP401: 401,
  HTTP403: 403,
  HTTP404: 404,
  HTTP406: 406,
  HTTP422: 422,
  HTTP500: 500,
  HTTP502: 502,
  GRAVATAR_SIZE: 200,
  POSTAL_CODE_LENGTH: 5,
  SSN_LENGTH: 4,
  SMS: {
    VERIFICATION: {
      PLACES: 1000,
      MULTIPLE: 9000
    },
    MESSAGES: {
      VERIFICATION: 'Your MyApp  code:',
      CONTACT: 'Text 💸 or \'MyApp\' to receive free offers.  Remember to add us to your contacts! 🍪', // eslint-disable-line max-len
      CONTACT_ATTACHMENT: 'https://s3.amazonaws.com/MyApp/MyApp+.vcf'
    },
    ADMIN_MOBILE: '12345'
  },
  ENV_TYPES: {
    PROD: 'production',
    DEV: 'development',
    TEST: 'test'
  },
  NOTIFICATION_TYPES: {
    SMS: 'sms',
    APN: 'push',
    EMAIL: 'email'
  },
  SALT_FACTOR: 5,
  USER: {
    ROLES: {
      SUPERADMIN: 'superadmin',
      ADMIN: 'admin'
    },
    STATES: states
  },
  PAYMENT_METHODS: {
    TYPES: {
      CARD: 'card',
      BANK: 'bank_account'
    }
  },
  GEO_FENCE_TIMER: 10,
  TWILIO_ERROR_MISSING_TO: 21604,
  TWILIO_ERROR_MISSING_BODY: 21602,
  APN_BAD_DEVICE_TOKEN_STR: 'BadDeviceToken',
  APN_MISSING_DEVICE_TOKEN_STR: 'MissingDeviceToken',
  APN_UNREGISTERED: 'Unregistered',

  DAYS: {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
  },
  Status: {  // Product Status
    Deactive: 0,
    NewlyAdded: 1,
    WaitingForApproval: 2,
    Approved: 3,
    Rejected: 4,
    Deleted: 10
  },
  cartStatus: {
    Removed: 0,
    cart: 1,
    favourite: 2
  }
}

module.exports = Object.freeze(Constants)
