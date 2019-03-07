var apiRequest = {
  auth: {
    login: {
      url: "/user/login",
      vFlag: 0,
      mandatory: []
    },
    logout: {
      url: "/user/logout",
      vFlag: 0,
      mandatory: []
    }
  },
  put: {
    updateUser: {
      url: "/user/:id",
      vFlag: 0,
      mandatory: []
    },
    updateRecord: {
      url: "/record/:id",
      vFlag: 0,
      mandatory: []
    }
  },
  post: {
    createCompany: {
      url: "/company",
      vFlag: 0,
      mandatory: []
    }
  },
  get: {
    helloRequest: {
      url: "/hello",
      vFlag: 0,
      mandatory: []
    }
  }
};

module.exports = apiRequest;
