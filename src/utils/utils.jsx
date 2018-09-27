const injectStyle = (style) => {
  const styleElement = document.createElement('style');
  let styleSheet = null;

  document.head.appendChild(styleElement);

  styleSheet = styleElement.sheet;

  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

const isAuthenticated = () =>
  localStorage.getItem('accessToken') !== null ? true : false;
const logout = () =>
  localStorage.removeItem('accessToken');
const getToken = () =>
  localStorage.getItem('accessToken');
const setToken = token =>
  localStorage.setItem('accessToken', token);


export {
  injectStyle,
  isAuthenticated,
  setToken,
  getToken,
  logout
}
