import { Loader } from "@googlemaps/js-api-loader";

let Hooks = {}
const apiKey = "your api key"
Hooks.Map = {
  mounted() {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places"]
    })

    loader.load().then(() => {
      const map = new google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: 33.30639, lng: 130.41806 },
          zoom: 9
        }
      );
      const service = new google.maps.places.PlacesService(map);
      window.map = map;
      window.service = service
    })

    this.handleEvent("search", ({keyword}) => {
      const that = this
      const request = {
        query: keyword
      };
      window.service.textSearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let result = results.map((r) => { 
            return {
              name: r.name,
              address: r.formatted_address.split(/\s/).pop(),
              location: r.geometry.location,
              icon: r.icon,
              place_id: r.place_id
            };
          })
          that.pushEvent("search_result" , {result: result});
        }
      });
    })

    this.handleEvent("add_marker", ({location}) => {
      let marker = new google.maps.Marker({position: location})
      marker.setMap(window.map)
      window.map.setCenter(location)
    })
  }
}

export default Hooks;