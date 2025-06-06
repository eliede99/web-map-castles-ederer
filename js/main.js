// Initialize map
var map = L.map("map", {
  center: [47.5, 13.05],
  zoom: 8,
});

// Base map
var osmap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// #scale bar
L.control.scale({ position: "topleft", imperial: false }).addTo(map);

let allCastleFeatures = castlesJson.features;

let filteredCastleLayer = L.layerGroup().addTo(map);

function updateCastleFilter() {
  const checkedTypes = Array.from(document.querySelectorAll("#filter-controls input:checked")).map((input) => input.value);
  filteredCastleLayer.clearLayers();

  allCastleFeatures.forEach((feature) => {
    if (checkedTypes.includes(feature.properties.castle_type)) {
      let layer = L.geoJson(feature, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: castleIcon });
        },
        // dynamic pop up content
        onEachFeature: function (feature, layer) {
          let props = feature.properties;
          let popupContent = `<b>${props.name}</b><br>Castle Type: ${props.castle_type}`;

          if (props.wikipedia) {
            let [, title] = props.wikipedia.split(":");
            title = title.replace(/ /g, "_");
            popupContent += `<br><a href="https://de.wikipedia.org/wiki/${title}" target="_blank">Wikipedia</a>`;
          }

          if (props.website) {
            popupContent += `<br><a href="${props.website}" target="_blank">Website</a>`;
          }

          layer.bindPopup(popupContent);

          //dynamic castle icon
          var castleIcon = L.icon({
            iconUrl: `css/images/${props.castle_type}.png`,
            iconSize: [32, 32],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12],
          });

          let center = layer.getBounds().getCenter();
          let marker = L.marker(center, { icon: castleIcon }).bindPopup(popupContent);
          filteredCastleLayer.addLayer(marker);
        },
      });
      filteredCastleLayer.addLayer(layer);
    }
  });
}

// Listen for checkbox changes
document.querySelectorAll("#filter-controls input").forEach((checkbox) => {
  checkbox.addEventListener("change", updateCastleFilter);
});

// // Layer control
// L.control.layers(null, { Castles: filteredCastleLayer }, { position: "topleft" }).addTo(map);

// Initial filter
updateCastleFilter();
