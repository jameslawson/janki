function makePreventDefaultDriver() {
  function preventDefaultDriver(event$) {
    return event$.map(event => {
      // console.log('hello!');
      event.preventDefault();
      return true;
    });
  }
  return preventDefaultDriver;
}

export default makePreventDefaultDriver;
