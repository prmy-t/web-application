import Vue from "vue";
import axios from "axios";
import Cookie from "js-cookie";
const SimpleCrypto = require("simple-crypto-js").default;
const myCrypto = new SimpleCrypto("myKey");

Vue.prototype.$updateUser = async userId => {
  const student = await axios.post("http://localhost:3000/student/getstudent", {
    userId
  });
  if (student) {
    const encryptedUser = myCrypto.encrypt(JSON.stringify(student.data));
    localStorage.setItem("activeUser", encryptedUser);
    return student.data;
  } else return null;
};
Vue.prototype.$encrypt = data => {
  return myCrypto.encrypt(data);
};
Vue.prototype.$decrypt = data => {
  return myCrypto.decrypt(data);
};
Vue.prototype.$setCookie = (key, value) => {
  Cookie.set(key, value);
};

Vue.prototype.$getCookie = key => {
  return Cookie.get(key);
};

Vue.prototype.$removeCookie = key => {
  return Cookie.remove(key);
};
