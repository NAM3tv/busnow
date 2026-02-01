function getUserLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let loadingScreen = document.querySelector('.loadingScreen');
        loadingScreen.style.display = 'none';
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let map = L.map('map').setView([lat, lon], 13);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© CartoDB'
        }).addTo(map);

        const userIcon = L.icon({
          iconUrl: '/img/vigno.webp',
          iconSize: [38, 38],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
          className: 'profileImgMap'
        });
        const startIcon = L.icon({
        iconUrl: '/img/fermataIcon.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
        });
        const endIcon  = L.icon({
        iconUrl: '/img/fermataIcon.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
        });
        const busStationIcon  = L.icon({
        iconUrl: '/img/fermataIcon.svg',
        iconSize: [18, 18],
        iconAnchor: [16, 32],
        className: 'busStationIcon'
        });
        let userMarker = L.marker([lat, lon], { icon: userIcon }).addTo(map);
        
        let control = L.Routing.control({
          waypoints: [L.latLng(lat, lon)],
          routeWhileDragging: true,
          createMarker: () => null,
          lineOptions: {
            styles: [
              {
                color: '#2985e1',
                weight: 4,
                opacity: 0.7
              }
            ]
          }
        }).addTo(map);

        let busMarker = null;

        function animateBus(routeCoords, totalDistance, totalTime) {
          let index = 0;
          const speedKmh = 80;
          const speedMps = (speedKmh * 1000) / 3600;
          let coveredDistance = 0;

          const busIcon = L.icon({
            iconUrl: '/img/busIcon.webp',
            iconSize: [40, 40],
            iconAnchor: [10, 20],
            className: 'pulsating-img'
          });

          if (busMarker) map.removeLayer(busMarker);
          busMarker = L.marker(routeCoords[0], { icon: busIcon }).addTo(map);

          function moveSegment() {
            if (index >= routeCoords.length - 1) return;

            const from = L.latLng(routeCoords[index]);
            const to = L.latLng(routeCoords[index + 1]);
            const distance = from.distanceTo(to);
            const duration = distance / speedMps * 1000;
            const startTime = performance.now();

            function animate(time) {
              const elapsed = time - startTime;
              const t = Math.min(elapsed / duration, 1);
              const lat = from.lat + (to.lat - from.lat) * t;
              const lng = from.lng + (to.lng - from.lng) * t;
              busMarker.setLatLng([lat, lng]);

              const currentCovered = coveredDistance + distance * t;
              const remainingDistance = (totalDistance - currentCovered) / 1000; // in km
              const remainingTime = (remainingDistance * 1000) / speedMps / 60; // in min

              document.getElementById('distance').textContent = '(' + remainingDistance.toFixed(0) + ' Km)';
              document.getElementById('time').textContent = remainingTime.toFixed(0);

              if (t < 1) {
                requestAnimationFrame(animate);
              } else {
                coveredDistance += distance;
                index++;
                moveSegment();
              }
            }

            requestAnimationFrame(animate);
          }

          moveSegment();
        }

        control.on('routesfound', function (e) {
          let routes = e.routes;
          let summary = routes[0].summary;
          let totalDistance = summary.totalDistance;
          let totalTime = summary.totalTime;

          const routeCoords = routes[0].coordinates;
          animateBus(routeCoords, totalDistance, totalTime);
        });
let customPopup = `
                <div style="width: 260px; height: 190px; margin: 0; text-align: center; display: flex; align-items: center; flex-direction: column; justify-content: center; overflow: hidden; padding: 0;">
    <div class="swiper mySwiper" style="width: 100%; height: 100%; margin: 0;" position="relative">
        <div class="swiper-wrapper" style="margin: 0; padding: 0;">
            <div class="swiper-slide" style="margin: 0; padding: 0; width: 100%; height: 100%;">
                <img src="/ads/7fa912ec-52cd-4556-8671-888e3147724a.JPG" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
            </div>
            <div class="swiper-slide" style="margin: 0; padding: 0; width: 100%; height: 100%;">
                <img src="/ads/759c2a3e-24ae-4e33-853e-89e3a6ca4d2c.JPG" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
            </div>
            <div class="swiper-slide" style="margin: 0; padding: 0; width: 100%; height: 100%;">
                <img src="/ads/1401084c-a915-4e44-a98a-400f727484bd.JPG" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
            </div>
        </div>
        <div class="swiper-button-next btnSlider" id="swiper-button-next" style="margin-right: -5%;">
            <img src="/img/sliderIcon.svg" alt="Next" style="width: 100%;">
        </div>  
        <div class="swiper-button-prev btnSlider" style="margin-left: 5%;">
            <img src="/img/sliderIcon.svg" alt="Previous" style="width: 100%; transform: scaleX(-1);">
        </div>

    </div>
    <div class="footerPopUpAds">
        <div class="footerHeader">
            <p id="adsTitle">Dixie Pub</p>
            <img src="/img/starIcon.svg">
            <p id="adsRating">4,5</p>
        </div>
        <div class="hotDestinationContainer">
        <p id="typeOfBusiness">Pub</p>
        <img src="/img/hotIcon.svg">
        <p>Hot Destination</p>
        </div>
    </div>
    <script>
    function adsRedirect(){
        let adsPopUp = document.querySelector('.leaflet-popup-content-wrapper')
        adsPopUp.addEventListener('click', ()=> {
            window.open("https://www.tripadvisor.it/Restaurant_Review-g1786906-d10096461-Reviews-The_Dixie_Pub-Latisana_Province_of_Udine_Friuli_Venezia_Giulia.html", "_blank");
        });
    } 
    adsRedirect()
    </script>
</div>`

function adsRedirect(){
  let adsPopUp = document.querySelector('.leaflet-popup-content-wrapper')
  adsPopUp.addEventListener('click', ()=> {
      window.open("https://www.tripadvisor.it/Restaurant_Review-g1786906-d10096461-Reviews-The_Dixie_Pub-Latisana_Province_of_Udine_Friuli_Venezia_Giulia.html", "_blank");
  });
} 

        function changeDestination(sLat, sLon, newLat, newLon, stops = []) {
          let waypoints = [L.latLng(sLat, sLon), L.latLng(newLat, newLon)];
          map.setZoom(10);
          control.setWaypoints(waypoints);
          map.fitBounds(L.latLngBounds(waypoints), { padding: [20, 20] });

          if (window.destinationMarker) map.removeLayer(window.destinationMarker);

          // Aggiungi marker partenza
            window.startMarker = L.marker([sLat, sLon], { icon: startIcon }).addTo(map);

            // Aggiungi marker destinazione
            window.destinationMarker = L.marker([newLat, newLon], { icon: endIcon }).addTo(map);
            window.destinationMarker.bindPopup(customPopup, {
                    closeButton: false
                }).openPopup();

            // Aspetta che il popup venga creato, poi inizializza Swiper
    setTimeout(() => {
        new Swiper(".mySwiper", {
            navigation: { 
                nextEl: ".swiper-button-next", 
                prevEl: ".swiper-button-prev" 
            },
            spaceBetween: 10,
            loop: true // Permette lo scorrimento infinito
        });
        adsRedirect()
    }, 500);


    
             // Aggiungi marker per le fermate intermedie
            stops.forEach(stop => {
                let marker = L.marker([stop.lat, stop.lng], {
                icon: busStationIcon // icona per le fermate, definiscila tu
                }).addTo(map);

              //  window.stopMarkers.push(marker);
            });
        }

        function changeLineBannerData() {
          let LineBannerName = document.getElementById('Line');
          let positionBtns = document.querySelectorAll('.positionBtn');

          positionBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
              let lineName = this.closest('.busSearchInfos').querySelector('p').textContent;
              LineBannerName.textContent = lineName;

              if (lineName === 'LINE 450') {
                changeDestination(45.651110, 13.101301);
              }
              if (lineName === 'LINE 500') {
                //changeDestination(45.686232842039516, 13.132079650930851,46.05728071459339, 13.242775365932388);
                let stops = [
                { lat: 45.68597197798403, lng: 13.072051232910848},
                { lat: 45.69776018581137, lng: 13.059405287711272},
                { lat: 45.72391158158022, lng: 13.047662656106928},
                { lat: 45.75128407432334, lng: 13.033769093273072},
                ];
                changeDestination(
                45.686232842039516,
                13.132079650930851,
                46.05728071459339,
                13.242775365932388,
                stops
                );
              }
            });
          });
        }

        changeLineBannerData();
      },
      function (error) {
        console.log("Errore nella geolocalizzazione:", error);
      }
    );
  } else {
    console.log("Geolocalizzazione non supportata dal browser.");
  }
}

setTimeout(() => {
  getUserLocation();
}, 1500);
