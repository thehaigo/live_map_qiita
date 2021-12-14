import { Loader } from "@googlemaps/js-api-loader";
let Hooks = {}
const apiKey = "your api key"
Hooks.Map = {
  mounted() {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    })

    loader.load().then(() => {
      const map = new google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: 33.30639, lng: 130.41806 },
          zoom: 9
        }
      );
      window.map = map;

    })
  }
}

export default Hooks;