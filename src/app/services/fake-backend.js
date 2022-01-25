export function configureFakeBackend() {
    let users = [
      {
        id: 1,
        email: "user1@mail.com",
        firstname: "user",
        lastname: "Test",
        phone: "Test",
        status: "Test",
        role: "User"
      },
      {
        id: 1,
        email: "admin@mail.com",
        firstname: "admin",
        lastname: "Test",
        phone: "Test",
        status: "Test",
        role: "Admin"
      }
    ];
    let items = getItems(1, 41);
    let roles = getRoles(1, 11);
    let travelers = getTravelers(1, 41);
    let organizations = getOrganizations(1, 41);
    let organizationTypes = getOrganizationTypes(1, 41);
    let recordCountPerPage = 10;
  
    function getDataByEntity(entity) {
      if (entity === "users") return items;
      if (entity === "roles") return roles;
      if (entity === "organizations") return organizations;
      if (entity === "organization-types") return organizationTypes;
      else if (entity === "travelers") return travelers;
    }
  
    function getUrlEntity(url) {
      var reUrlPath = /(?:\w+:)?\/\/[^/]+([^?#]+)/;
      var path = url.match(reUrlPath).pop();
      var pathArray = path.split("/");
      return pathArray;
    }
  
    function getItems(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          firstname: "first" + no,
          lastname: "last" + no,
          email: "email1@yahoo.com" + no,
          phone: "00000000" + no,
          address: "location" + no,
          state: "state" + no,
          country: "country" + no,
          zip: "zip" + no,
          role: Math.round(Math.random() * getRoles(1,10).length),
          status: i % 2 === 0 ? "active" : "inactive"
        });
      }
      return tempItems;
    }
  
    function getOrganizations(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          type: Math.round(Math.random() * getOrganizationTypes(1,10).length),
          name: "Company " + no,
          email: "company"+no+"@mail.com",
          address: "Company Address "+no,
          phone: "000000000"+no,
          primary_contact: "111111111"+no,
          billing_contact: "222222222"+no,
          account_manager: "Manager "+no,
          membership_number: "MEMBERSHIPNO"+no,
          onboarding_date: "2019-10-"+((no < 10) ? "0"+no : no),
          countries: ['US'],
          membership_start_date: "2019-10-"+((no < 10) ? "0"+no : no),
          membership_end_date: "2019-10-"+((no < 10) ? "0"+no : no),
          status: i % 2 === 0 ? "active" : "inactive"
        });
      }
      return tempItems;
    }
  
    function getRoles(pageNo, count) {
      let tempItems = [
        {
          id: 1,
          name: 'Administrator',
          status: true
        },
        {
          id: 2,
          name: 'Travel Manager',
          status: false
        },
        {
          id: 3,
          name: 'Division Manager',
          status: false
        },
        {
          id: 4,
          name: 'CSR',
          status: true
        },
        {
          id: 5,
          name: 'Manager',
          status: true
        },
        {
          id: 6,
          name: 'Traveler',
          status: true
        }
      ];
      return tempItems;
    }
  
    function getOrganizationTypes(pageNo, count) {
      let tempItems = [
        {
          id: 1,
          name: 'B2B',
          status: false
        },
        {
          id: 2,
          name: 'Reseller',
          status: true
        },
        {
          id: 3,
          name: 'Hybrid',
          status: true
        }
      ];
      return tempItems;
    }
  
    function getTravelers(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          first: "Traveler" + no,
          last: "last" + no,
          email: "email1@yahoo.com" + no,
          phone: "phone" + no,
          location: "location" + no,
          status: i % 2 === 0 ? "active" : "inactive"
        });
      }
      return tempItems;
    }
  
    function getItemsByPage(pageNo, count, entity) {
      let data = getDataByEntity(entity);
      return data.slice((pageNo - 1) * count, pageNo * count);
    }
  
    window.fetch = function(url, opts) {
      return new Promise((resolve, reject) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
          let pathArray = getUrlEntity(url);
          let entity = "";
          if (pathArray.length >= 2) {
            entity = pathArray[1];
          }
          
         /*  if(url.endsWith("/forgot-password")){
            let responseJson = {
                success: true,
                message: 'Email sent',
                status: 200
              };
            resolve(responseJson);
            return;
          } */
  
          if(url.endsWith("/reset-password")){
            let responseJson = {
                success: true,
                message: 'Password updated successfully. You can login with your newly set password!',
                status: 200
              };
            resolve(responseJson);
            return;
          }
  
          if (entity === "users" || entity === "travelers" || entity === "roles" || entity === "organizations" || entity === "organization-types") {
            if (url.indexOf("/" + entity + "/") !== -1 && opts.method === "GET") {
              let parts = url.split("/" + entity + "/");
              resolve(getDataByEntity(entity)[parts[1] - 1]);
              return;
            } else if (url.indexOf("/" + entity) !== -1 && opts.method === "GET") {
              let request = {};
              try {
                request = JSON.parse(opts.body);
              } catch (e) {}
              let page =
                request && request.pagination && request.pagination.page
                  ? request.pagination.page
                  : 1;
  
              let pageSize =
                request && request.pagination && request.pagination.pageSize
                  ? request.pagination.pageSize
                  : recordCountPerPage;
  
              let data = getItemsByPage(page, pageSize, entity);
              console.log("fake response:", data)
              resolve({
                data: data,
                paging: {
                  totalRecords: getDataByEntity(entity).length,
                  currentPage: page,
                  pageSize: pageSize
                }
              });
              //resolve(data);
              return;
            }
            if (url.indexOf("/" + entity) !== -1 && opts.method === "POST") {
              let item = JSON.parse(opts.body);
              item.id = getDataByEntity(entity).length + 1;
              getDataByEntity(entity).push(item);
              // items.push[opts.body];
              resolve([item]);
              return;
            }
            if (url.indexOf("/" + entity) !== -1 && opts.method === "PUT") {
              let tempItem = JSON.parse(opts.body);
  
              if (tempItem.id && tempItem.id > 0) {
                getDataByEntity(entity)[tempItem.id - 1] = tempItem;
              } else {
                tempItem.id = getDataByEntity(entity).length + 1;
                getDataByEntity(entity).push(tempItem);
              }
              resolve([JSON.parse(opts.body)]);
              return;
            }
            if (url.indexOf("/" + entity + "/") && opts.method === "DELETE") {
  
              let parts = url.split("/" + entity + "/");
                getDataByEntity(entity).splice(parts[0] - 1, 1);
  
              resolve(parts[0]);
              return;
            }
            // authenticate
  
            // get users
            if (url.endsWith("/users") && opts.method === "GET") {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              if (
                opts.headers &&
                opts.headers.Authorization === "Bearer fake-jwt-token"
              ) {
                resolve({
                  ok: true,
                  text: () => Promise.resolve(JSON.stringify(users))
                });
              } else {
                // return 401 not authorised if token is null or invalid
                reject("Unauthorised");
              }
  
              return;
            }
          }
          if (url.endsWith("/login")) {
            // get parameters from post request
            let params = JSON.parse(opts.body);
  
            // find if any user matches login credentials
            let filteredUsers = users.filter(user => {
              return (
                user.username === params.username &&
                user.password === params.password
              );
            });
  
            if (filteredUsers.length) {
              // if login details are valid return user details and fake jwt token
              let user = filteredUsers[0];
              let responseJson = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.lastName,
                token: user.lastName,
                result: true,
                redirect: "/" + user.username
              };
              resolve(responseJson);
            } else {
              // else return error
              reject("Username or password is incorrect");
            }
  
            return;
          }
          if (url.endsWith("/validateToken")) {
            // get parameters from post request
            let params = JSON.parse(opts.body);
  
            // find if any user matches login credentials
            let filteredUsers = users.filter(user => {
              return user.lastName === params.token;
            });
  
            if (filteredUsers.length) {
              // if login details are valid return user details and fake jwt token
              let user = filteredUsers[0];
              let responseJson = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.lastName,
                token: user.lastName,
                result: true,
                redirect: "/" + user.username + "/"
              };
              resolve(responseJson);
            } else {
              // else return error
              reject("Username or password is incorrect");
            }
  
            return;
          }
  
          // pass through any requests not handled above
          //if(opts.method == "GET" || opts.method == "HEAD") delete opts.body
          //realFetch(url, opts).then(response => resolve(response));
        }, 500);
      });
    };
  }
  