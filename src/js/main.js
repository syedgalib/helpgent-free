import "../apps/chatbox/index.js";

// Testing Rest API
function rest_test() {
	console.log("start");
	fetch("http://localhost/Video-M/wp-json/wpwax-vm/v1/get_forms", {
		method: "GET",
		headers: { "X-WP-Nonce": vmApi.nonce },
	})
		.then((response) => response.json())
		.then((result) => {
			console.log(result);
			console.log("end");
		});
}
// rest_test();
