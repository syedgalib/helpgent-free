import 'CoreCSS/core-public.scss';

// Testing Rest API
function rest_test() {
	console.log("start");
	fetch("http://localhost/Video-M/wp-json/wpwax-vm/v1/messages", {
		method: "GET",
		headers: { "X-WP-Nonce": wpWaxCustomerSupportApp_CoreScriptData.apiNonce },
	})
		.then((response) => response.json())
		.then((result) => {
			console.log(result);
			console.log("end");
		});
}
// rest_test();