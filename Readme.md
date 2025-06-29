# Castles in Salzburg 🏰

## Link

https://salzburg-castles-elias.netlify.app/

## Topic

My map focuses on castles in Salzburg and the surrounding region. I chose this topic because Salzburg has a rich history and many interesting castles, and I thought it would be fun to explore and present them in an interactive way.

## Target Users

The map is meant for tourists, history fans, and anyone interested in exploring castles in the Salzburg area.

## Data Sources

I got the data from overpass turbo using this code:

`[out:json][timeout:25];
nwr["historic"="castle"]({{bbox}});
out geom;`

I exported the GeoJSON and imported into my castles.js. I had to fix some of the data. There were some castles which were declared as points. To keep it consistent I changed them all to Polygons. There are some issues with the data set like missing names and broken links.

## Methodology

I used the Leaflet JavaScript library to build the interactive map. I created a base map using OpenStreetMap tiles and added a custom layer to show the castles from the GeoJSON file. I also added checkboxes to filter castles by type, and styled them with matching icons and descriptions.

## Interactive Features

- Popups on each castle marker showing name, type, wikipedia link, website (if available in dataset)
- Filter function using checkboxes to filter castle types
- Custom icons based on castle type

## Design Choices

The design is nothing too fancy, but I tried to give it a bit of a medieval feel. I tried some different basemaps and decided on a simple and clean one. Icons and cards with a short description were used to represent different types of castles. I also added a scale bar and zoom buttons

## Analysis

The filtering works well and helps users focus on specific types of castles. The popups are informative and give quick access to external resources. The icons make it visually easy to understand the map.

## Potential Improvements

- Add more info to each popup like year built, photos, etc. (I was limited by the data I got)
- Add a search bar to find specific castles faster

## Critical Reflection

The hardest part was getting the dynamic markers and popups to work together with the filtering. The different geometry types confused me at the beginning. The icons showed up for some and for some they didn't. I also had some trouble positioning the map properly. But overall, it was a fun project and I learned more about Leaflet and working with GeoJSON.

## Key Takeaways

- Leaflet is a powerful and flexible tool for web mapping
- GeoJSON is a useful format for storing spatial data
- Even small interactive features like filters and popups can make a map more useful and engaging
