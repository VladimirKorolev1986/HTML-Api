function init() {
  let map = new ymaps.Map("map-test", {
    center: [55.751868057224556, 37.61887408245741],
    zoom: 10,
  });
  let placemark = new ymaps.Placemark(
    [55.751868057224556, 37.61887408245741],
    {},
    {}
  );
  map.geoObjects.add(placemark);
}
ymaps.ready(init);
