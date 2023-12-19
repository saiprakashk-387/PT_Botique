export const baseUrl = `http://localhost:5000/api`;
export const registerUrl = `${baseUrl}/register`;
export const loginUrl = `${baseUrl}/login`;
export const Url = `${baseUrl}/myuser`;

export const ACCESS_TOKEN = () => sessionStorage.getItem("access_token");
export const RazorpayApiKey = "rzp_test_e9kPsrUOUZxrFE";
export const debounce = (fn, delay) => {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
