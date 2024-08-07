let URL;
if (!PROXY_URI) {
  URL = "http://0.0.0.0:8001/";
} else {
  URL = PROXY_URI.replace("{{port}}", 8001);
}
export let APIURL = URL;
