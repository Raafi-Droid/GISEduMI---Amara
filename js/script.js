// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
});
// Hero Carousel
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle("active", idx === i);
  });
}
prev.addEventListener("click", () => {
  index = (index === 0) ? slides.length - 1 : index - 1;
  showSlide(index);
});
next.addEventListener("click", () => {
  index = (index === slides.length - 1) ? 0 : index + 1;
  showSlide(index);
});

// Auto Slide setiap 5 detik
setInterval(() => {
  index = (index + 1) % slides.length; // geser ke slide berikutnya
  showSlide(index);
}, 5000); // 5000 milidetik = 5 detik

// Optional: search functionality inside sidebar
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  document.querySelectorAll(".nav-links li a").forEach(link => {
    const text = link.textContent.toLowerCase();
    link.parentElement.style.display = text.includes(filter) ? "block" : "none";
  });
});

// Chart instances holder
const charts = {
  sd: null,
  smp: null,
  sma: null
};

function openModal(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (!modal) return;

  // Tampilkan modal
  modal.style.display = 'flex';

  // Render chart jika belum ada
  if (!charts[type]) {
    const ctx = document.getElementById(`${type}Chart`).getContext('2d');

    // Data dan label khusus tiap jenjang
    let labels, data;

    if (type === 'sd') {
      labels = ['SD Negeri', 'Guru Tetap', 'Siswa Aktif', 'Kelulusan', 'Internet', 'Lab Komputer'];
      data = [150, 4500, 60000, 95, 75, 80];
    } else if (type === 'smp') {
      labels = ['SMP Negeri', 'Guru Tetap', 'Siswa Aktif', 'Kelulusan', 'Internet', 'Lab Komputer'];
      data = [96, 2800, 35000, 97, 80, 85];
    } else if (type === 'sma') {
      labels = ['SMA Negeri', 'Guru Tetap', 'Siswa Aktif', 'Kelulusan', 'Internet', 'Lab Komputer'];
      data = [38, 1100, 28000, 98, 85, 92];
    }

    charts[type] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Data Statistik',
          data: data,
          backgroundColor: [
            '#004080', '#0059b3', '#0073e6', '#3399ff', '#66b3ff', '#99ccff'
          ],
          borderColor: '#000',
          borderWidth: 0,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: type === 'sd' ? 10000 : 5000
            }
          }
        }
      }
    });
  }
}

function closeModal(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (!modal) return;
  modal.style.display = 'none';
}

// Tutup modal jika klik di luar konten modal
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
};

// Definisikan koordinat Home - Sesuaikan sesuai lokasi Anda
// Contoh: Koordinat pusat Kota Garut
const homeCoordinates = { lat: -6.927, lng: 106.924, zoom: 13 };

  // Inisialisasi peta - Pastikan ID 'map' sesuai dengan id div di HTML
  const map = L.map('map').setView([homeCoordinates.lat, homeCoordinates.lng], homeCoordinates.zoom);

  // --- Basemap Layers ---
  const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  const baseMapGoogle = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: 'Map by <a href="https://maps.google.com/">Google</a>',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  const baseMapSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      attribution: 'Satellite by <a href="https://maps.google.com/">Google</a>',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  // Tambahkan salah satu basemap secara default
  basemapOSM.addTo(map);

  // Daftar semua pilihan basemap
  const baseMaps = {
      "OpenStreetMap": basemapOSM,
      "Google Maps": baseMapGoogle,
      "Google Satellite": baseMapSatellite
  };
    // --- Marker Sekolah ---
    const educationalPoints = [
                     // SD Negeri di Kabupaten Sukabumi
                     { name: "SD Negeri Cikole 1", lat: -6.9200, lon: 106.9250, type: "SD" }, // Kota Sukabumi
                     { name: "SD Negeri Cibadak 1", lat: -6.7900, lon: 106.8150, type: "SD" }, // Cibadak
                     { name: "SD Negeri Parungkuda 1", lat: -6.7500, lon: 106.8000, type: "SD" }, // Parungkuda (ditambahkan)
                     { name: "SD Negeri Palabuhanratu 1", lat: -7.0000, lon: 106.5500, type: "SD" }, // Palabuhanratu
                     { name: "SD Negeri Cisaat 1", lat: -6.8800, lon: 106.9400, type: "SD" }, // Cisaat
                     { name: "SD Negeri Sukaraja 1", lat: -6.9050, lon: 106.9000, type: "SD" }, // Sukaraja
                     { name: "SD Negeri Warudoyong 1", lat: -6.9250, lon: 106.9300, type: "SD" }, // Warudoyong (Kota Sukabumi)
                     { name: "SD Negeri Surade 1", lat: -7.2200, lon: 106.4000, type: "SD" }, // Surade
                     { name: "SD Negeri Jampang Kulon 1", lat: -7.2800, lon: 106.6200, type: "SD" }, // Jampang Kulon
                     { name: "SD Negeri Purabaya 1", lat: -7.1500, lon: 106.9000, type: "SD" }, // Purabaya
                    { name: "SD Negeri Cikole 1", lat: -6.9200, lon: 106.9250, type: "SD" },
                // SMP Negeri di Kabupaten Sukabumi
                { name: "SMP Negeri Cibadak 1", lat: -6.7950, lon: 106.8100, type: "SMP" }, // Cibadak (ditambahkan)
                { name: "SMP Negeri Palabuhanratu 1", lat: -7.0050, lon: 106.5400, type: "SMP" }, // Palabuhanratu
                { name: "SMP Negeri Cisaat 1", lat: -6.8750, lon: 106.9450, type: "SMP" }, // Cisaat
                { name: "SMP Negeri Sukaraja 1", lat: -6.9000, lon: 106.9050, type: "SMP" }, // Sukaraja
                { name: "SMP Negeri Parungkuda 1", lat: -6.7450, lon: 106.7950, type: "SMP" }, // Parungkuda
                { name: "SMP Negeri Jampang Kulon 1", lat: -7.3000, lon: 106.6000, type: "SMP" }, // Jampang Kulon
                { name: "SMP Negeri Surade 1", lat: -7.2100, lon: 106.3900, type: "SMP" }, // Surade
                { name: "SMP Negeri Gunungguruh 1", lat: -6.9800, lon: 106.9000, type: "SMP" }, // Gunungguruh
                    // SMA Negeri di Kabupaten Sukabumi
                    { name: "SMA Negeri Palabuhanratu", lat: -7.0000, lon: 106.5500, type: "SMA" }, // Palabuhanratu (sudah ada)
                    { name: "SMA Negeri 1 Cibadak", lat: -6.7920, lon: 106.8120, type: "SMA" }, // Cibadak (ditambahkan)
                    { name: "SMA Negeri 1 Cisaat", lat: -6.8820, lon: 106.9380, type: "SMA" }, // Cisaat
                    { name: "SMA Negeri 1 Sukabumi", lat: -6.9180, lon: 106.9280, type: "SMA" }, // Kota Sukabumi
                    { name: "SMA Negeri 1 Sukaraja", lat: -6.9020, lon: 106.9020, type: "SMA" }, // Sukaraja
                    { name: "SMA Negeri 1 Cikembar", lat: -6.9000, lon: 106.9800, type: "SMA" }, // Cikembar
                    { name: "SMA Negeri 1 Surade", lat: -7.2000, lon: 106.4000, type: "SMA" }, // Surade
                    { name: "SMA Negeri 1 Jampang Kulon", lat: -7.3100, lon: 106.6100, type: "SMA" }, // Jampang Kulon
                    { name: "SMA Negeri 1 Parungkuda", lat: -6.7600, lon: 106.8000, type: "SMA" }, // Parungkuda
                    { name: "SMA Negeri 1 Cibitung", lat: -7.2500, lon: 106.5000, type: "SMA" }, // Cibitung
                    { name: "SMA Negeri 1 Sukabumi", lat: -6.9180, lon: 106.9280, type: "SMA" }
  ];

// Definisi warna untuk setiap tipe sekolah
const schoolColors = {
  "SD": "red",
  "SMP": "#00008B", // Biru Tua untuk SMP (DarkBlue)
  "SMA": "gray"
};

// Fungsi untuk membuat ikon penanda kustom dengan warna yang berbeda
function createColoredMarkerIcon(color) {
  return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white;"></div>`,
      iconSize: [30, 30], // Sesuaikan ukuran sesuai kebutuhan
      iconAnchor: [15, 30], // Tengah bawah pin
      popupAnchor: [0, -25] // Sesuaikan popup agar di atas pin
  });
}

// --- Buat Layer Group untuk setiap tipe sekolah ---
const sdMarkers = L.layerGroup();
const smpMarkers = L.layerGroup();
const smaMarkers = L.layerGroup();
const adminsukabumiGeoJSONLayer = L.layerGroup(); // Layer Group untuk GeoJSON

// Tambahkan marker ke layer group yang sesuai
educationalPoints.forEach(point => {
  const markerColor = schoolColors[point.type] || 'blue';
  const icon = createColoredMarkerIcon(markerColor);

  const marker = L.marker([point.lat, point.lon], { icon: icon })
      .bindPopup(`<b>${point.name}</b><br>Jenis: ${point.type}`);

  if (point.type === "SD") {
      sdMarkers.addLayer(marker);
  } else if (point.type === "SMP") {
      smpMarkers.addLayer(marker);
  } else if (point.type === "SMA") {
      smaMarkers.addLayer(marker);
  }
});

// --- Memuat file GeoJSON Administrasi Sukabumi ---
fetch('asset/Administrasi Sukabumi.geojson') // Pastikan nama file sesuai dan ada di direktori proyek
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      // Tambahkan layer GeoJSON dengan style garis putus-putus
      L.geoJSON(data, {
          style: function (feature) {
              return {
                  color: "#ff7800", // Warna garis
                  weight: 2, // Ketebalan garis
                  dashArray: "5, 5" // Pola putus-putus
              };
          },
          onEachFeature: function (feature, layer) {
              // Contoh: Menambahkan popup dengan nama jika ada properti 'name'
              if (feature.properties && feature.properties.name) {
                  layer.bindPopup(feature.properties.name);
              }
          }
      }).addTo(adminsukabumiGeoJSONLayer); // Tambahkan ke layer group GeoJSON
      
      // Tambahkan layer GeoJSON ke peta secara default setelah dimuat
      adminsukabumiGeoJSONLayer.addTo(map);

      // --- Sekarang, inisialisasi kontrol layer setelah semua layer siap ---
      setupLayerControl();
  })
  .catch(error => {
      console.error("Gagal memuat GeoJSON:", error);
      // Penting: Jika GeoJSON gagal dimuat, tetap inisialisasi kontrol layer
      // agar layer lain masih bisa diatur.
      setupLayerControl();
  });


// --- Fungsi untuk setup kontrol layer ---
function setupLayerControl() {
  // Tambahkan layer group ke peta secara default (jika ingin terlihat saat awal)
  // Cek apakah sudah ditambahkan oleh fetch GeoJSON atau belum
  if (!map.hasLayer(sdMarkers)) sdMarkers.addTo(map);
  if (!map.hasLayer(smpMarkers)) smpMarkers.addTo(map);
  if (!map.hasLayer(smaMarkers)) smaMarkers.addTo(map);
  // adminsukabumiGeoJSONLayer sudah ditambahkan di .then() dari fetch

  // --- Buat daftar overlay (layer yang bisa dihidupkan/dimatikan) ---
  const overlayMaps = {
      "Titik SD": sdMarkers,
      "Titik SMP": smpMarkers,
      "Titik SMA": smaMarkers,
      "Administrasi Sukabumi": adminsukabumiGeoJSONLayer // Tambahkan layer GeoJSON ke kontrol
  };

  // --- Tambahkan kontrol layer ke peta ---
  // Parameter pertama: Base layers (opsional, jika ingin ada pilihan basemap di kontrol)
  // Parameter kedua: Overlay layers
  // Parameter ketiga: Opsi kontrol (misal: collapsed: false untuk langsung terbuka)
  L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
}




    // --- Custom Controls ---
  // Tombol "Home"
  const homeControl = L.control({ position: 'topleft' });
  homeControl.onAdd = function(mapInstance) {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      div.innerHTML = '🏠'; // Ikon rumah
      div.style.backgroundColor = 'white';
      div.style.width = '30px';
      div.style.height = '30px';
      div.style.lineHeight = '30px';
      div.style.fontSize = '20px';
      div.style.textAlign = 'center';
      div.style.cursor = 'pointer';
      div.title = 'Kembali ke Home';
      div.onclick = function() {
          mapInstance.setView([homeCoordinates.lat, homeCoordinates.lng], homeCoordinates.zoom);
      };
      return div;
  };
  homeControl.addTo(map);

  // Fitur "My Location"
  L.control.locate({
      position: 'topleft',
      flyTo: true,
      strings: {
          title: "Temukan lokasiku"
      },
      locateOptions: {
          enableHighAccuracy: true
      }
  }).addTo(map);

  // Tombol Fullscreen
  const fullscreenControl = L.control({ position: 'topleft' });
  fullscreenControl.onAdd = function(map) {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      div.innerHTML = '⛶'; // Ikon fullscreen
      div.style.backgroundColor = 'white';
      div.style.width = '30px';
      div.style.height = '30px';
      div.style.lineHeight = '30px';
      div.style.textAlign = 'center';
      div.style.cursor = 'pointer';
      div.title = 'Fullscreen';

      div.onclick = function() {
          const mapContainer = map.getContainer();
          if (!document.fullscreenElement &&
              !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
              if (mapContainer.requestFullscreen) { mapContainer.requestFullscreen(); }
              else if (mapContainer.mozRequestFullScreen) { mapContainer.mozRequestFullScreen(); }
              else if (mapContainer.webkitRequestFullscreen) { mapContainer.webkitRequestFullscreen(); }
              else if (mapContainer.msRequestFullscreen) { mapContainer.msRequestFullscreen(); }
          } else {
              if (document.exitFullscreen) { document.exitFullscreen(); }
              else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
              else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
              else if (document.msExitFullscreen) { document.msExitFullscreen(); }
          }
      };
      return div;
  };
  fullscreenControl.addTo(map);

  // Menangani event perubahan fullscreen untuk memperbarui ukuran peta
  document.addEventListener('fullscreenchange', () => map.invalidateSize());
  document.addEventListener('webkitfullscreenchange', () => map.invalidateSize());
  document.addEventListener('mozfullscreenchange', () => map.invalidateSize());
  document.addEventListener('MSFullscreenChange', () => map.invalidateSize());

  // --- Logika Tombol Kontrol Kustom (Stasiun Kualitas Udara, Kebakaran, dll.) ---
  document.querySelectorAll('.map-control-button').forEach(button => {
      button.addEventListener('click', function() {
          this.classList.toggle('active');
          // Logika untuk menampilkan/menyembunyikan lapisan lain dapat ditambahkan di sini
      });
  });

  // Variabel symbologyPoint (Jika Anda memiliki layer point yang akan menggunakan ini)
  var symbologyPoint = {
      radius: 5,
      fillColor: "#9dfc03",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };



  
      
