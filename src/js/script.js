

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  let latitude = 0;
  let longitude = 0;

  function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  
    // Сохраняем координаты в переменную
    const coordinates = { latitude, longitude };
  
    // Теперь вы можете использовать переменную coordinates
    document.getElementById('coords').innerHTML = `
    Ваши координаты: 
    Широта ${coordinates.latitude}
    Долгота ${coordinates.longitude}
      `
    console.log("Ваши координаты:", coordinates);
    // Пример сохранения в localStorage (не рекомендуется для больших объемов данных)
    localStorage.setItem("coordinates", JSON.stringify(coordinates));
    console.log(`Информация из LocalStorage ${localStorage.getItem()}`)
    // Или другое действие с координатами
  }

  console.log(latitude)
  console.log(longitude)
  
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
  


function init() {

  let myMap = new ymaps.Map("map-test", {
    center: [latitude, longitude],
    zoom: 10,
    controls: ["routePanelControl"],
  });

  myMap.events.add('click', function (e) {
    const coords = e.get('coords'); // Получаем координаты клика
  
    // Создаем метку
    const myPlacemark = new ymaps.Placemark(coords, {
      // Свойства метки
      balloonContent: `Широта: ${coords[0]}, Долгота: ${coords[1]}` // Контент балуна
    }, {
      // Опции метки
      preset: 'islands#redDotIcon', // Иконка метки.
      draggable: true // Возможность перетаскивать метку
    });
  
    // Добавляем метку на карту
    myMap.geoObjects.add(myPlacemark);
  
    // Обработка перетаскивания метки (опционально)
    myPlacemark.events.add('dragend', function (e) {
      const newCoords = e.get('target').geometry.getCoordinates();
      myPlacemark.balloon.setContent(`Широта: ${newCoords[0]}, Долгота: ${newCoords[1]}`);
    });
  });


  let control = myMap.controls.get("routePanelControl");
  let location = ymaps.geolocation.get();

  location.then(function (res) {
    let locationText = res.geoObjects.get(0).properties.get("text");
    console.log(locationText);

    control.routePanel.state.set({
      type: "masstransit",
      fromEnabled: true,
      from: locationText,
      toEnabled: true,
    });
  });
}
ymaps.ready(init);

