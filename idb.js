const database = indexedDB.open("currencyRate");

database.onupgradeneeded = ()=> {
    // The database did not previously exist, so create object stores and indexes.
    const db = database.result;
    const store = db.createObjectStore("rates", {keyPath: "from_to"});
    const rateIndex = store.createIndex("by_rate", "rate")
  };

  let currencyRate = ()=> {
    database.onsuccess = ()=> {
    db = database.result;
    let tx = db.transaction("rates", "readwrite");
    let store = tx.objectStore("rates");
    const fromCurrency = document.getElementById('from');
    const toCurrency = document.getElementById('to');
	const query = fromCurrency.value + '_' + toCurrency.value;
	const url = "https://free.currencyconverterapi.com/api/v5/convert?q="+ query + "&compact=ultra";
	fetch(url)
	    .then(response => {
        return response.json();
     }).then(data => {
			let oneUnit = data[query];
			store.put({from_to: query, rate: oneUnit});
		});
  };
}