if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('sw.js', {scope : './'}).then(reg => {
    console.log('Service worker has been registered for scope:'+ reg.scope);
    });
  }

 
  const url = 'https://free.currencyconverterapi.com/api/v5/currencies';
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const myobj = data.results;
      const from = document.getElementById('from');
      const to = document.getElementById('to');
      let x = "<option value=\"\" selected> Currency" + "</option>";
      for(key in myobj){
        x += "<option value=\"" + myobj[key]['id'] + "\">" + myobj[key]['id'] + " (" + myobj[key]['currencyName'] + ")" + "</option>";
      }
      from.innerHTML = x;
      to.innerHTML = x;
    }); 

    let convertCurrency = ()=> {
    const fromCurrency = document.getElementById('from');
    const toCurrency = document.getElementById('to');
		const query = fromCurrency.value + '_' + toCurrency.value;
		const url = "https://free.currencyconverterapi.com/api/v5/convert?q="+ query + "&compact=ultra";
		fetch(url)
		.then(response => {
      return response.json();
  }).then(data => {
			let oneUnit = data[query];
			let amt = document.getElementById("fromAmount").value;
			document.getElementById("toAmount").value = (oneUnit*amt).toFixed(2);
		});
}
