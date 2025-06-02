var map = L.map("map", {
  center: [47.5, 13.05],
  zoom: 8,
});

var osmap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var baseMaps = {
  "Open Street Map": osmap,
};

L.control.scale({ position: "bottomright", imperial: false }).addTo(map);

var castleIcon = L.icon({
  iconUrl: "css/images/castle.png",
  iconSize: [32, 32],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

var castles = L.geoJson(castlesJson, {
  style: {
    color: "#5a3d85",
    weight: 2,
    fillOpacity: 0.6,
  },

  onEachFeature: function (feature, layer) {
    let props = feature.properties;
    let castleType = "";
    let wikiUrl = "";
    let websiteUrl = "";

    if (props.castle_type) {
      castleType = `Castle Type: ${props.castle_type}`;
    }

    if (props.wikipedia) {
      let [, title] = props.wikipedia.split(":");
      title = title.replace(/ /g, "_");

      wikiUrl = `<br><a href="https://de.wikipedia.org/wiki/${title}" target="_blank">Wikipedia</a>`;
    }

    if (props.website) {
      websiteUrl = `<br><a href="${props.website}" target="_blank">Website</a>`;
    }

    let popupContent = "<b>" + props.name + "</b><br>" + castleType + wikiUrl + websiteUrl;

    layer.bindPopup(popupContent);

    if (feature.geometry.type === "Polygon") {
      var center = layer.getBounds().getCenter();
      var marker = L.marker(center, { icon: castleIcon }).addTo(map);
      marker.bindPopup(popupContent);
    }

    layer.on({
      mouseover: function (e) {
        e.target.setStyle({
          weight: 4,
          color: "#333",
          fillOpacity: 0.9,
        });
      },
      mouseout: function (e) {
        castles.resetStyle(e.target);
      },
      click: function (e) {
        map.fitBounds(e.target.getBounds());
      },
    });
  },
});
castles.addTo(map);

var features = {
  Castles: castles,
};

L.control.layers(null, features, { position: "topleft" }).addTo(map);
