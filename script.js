document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  const footer = document.querySelector('.footer-inner');
  const loader = document.querySelector('.page-loader');
  const revealItems = document.querySelectorAll('[data-reveal]');
  const modal = document.getElementById('tripModal');
  const openButtons = document.querySelectorAll('.js-open-auth');
  const closeButtons = document.querySelectorAll('[data-close-auth]');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const authTabs = document.querySelectorAll('.auth-tab');
  const adminDashboard = document.getElementById('adminDashboard');
  const profilePanel = document.getElementById('profilePanel');
  const profileToggle = document.getElementById('profileToggle');
  const openDashboardButton = document.getElementById('openDashboardButton');
  const tripPlanner = document.getElementById('tripPlanner');
  const tripStatus = document.getElementById('tripStatus');
  const gpsValue = document.getElementById('gpsValue');
  const saveTripChoiceButton = document.getElementById('saveTripChoice');
  const useCurrentLocationButton = document.getElementById('useCurrentLocation');

  let activeUser = null;
  let activeTripDestination = 'Kathmandu';
  let geoWatchId = null;

  const ADMIN_EMAIL = 'pratikmahatara15@gmail.com';
  const USERS_KEY = 'nepal_users';
  const LOG_KEY = 'nepal_login_log';
  const SESSION_KEY = 'nepal_logged_in_user';
  const DISTRICT_NAMES = [
    'Achham', 'Arghakhanchi', 'Baglung', 'Baitadi', 'Bajhang', 'Bajura', 'Banke', 'Bara', 'Bardiya', 'Bhaktapur',
    'Bhojpur', 'Chitwan', 'Dadeldhura', 'Dailekh', 'Dang', 'Darchula', 'Dhading', 'Dhankuta', 'Dhanusha', 'Dolakha',
    'Dolpa', 'Doti', 'Gorkha', 'Gulmi', 'Humla', 'Ilam', 'Jajarkot', 'Jhapa', 'Jumla', 'Kailali', 'Kalikot',
    'Kanchanpur', 'Kapilvastu', 'Kaski', 'Kathmandu', 'Kavrepalanchok', 'Khotang', 'Lalitpur', 'Lamjung', 'Mahottari',
    'Makwanpur', 'Manang', 'Morang', 'Mugu', 'Mustang', 'Myagdi', 'Nawalpur', 'Nawalparasi East', 'Nawalparasi West',
    'Nuwakot', 'Okhaldhunga', 'Palpa', 'Panchthar', 'Parbat', 'Parsa', 'Pyuthan', 'Ramechhap', 'Rasuwa', 'Rautahat',
    'Rolpa', 'Rukum East', 'Rukum West', 'Rupandehi', 'Salyan', 'Sankhuwasabha', 'Saptari', 'Sarlahi', 'Sindhuli',
    'Sindhupalchok', 'Siraha', 'Solukhumbu', 'Sunsari', 'Surkhet', 'Tanahun', 'Taplejung', 'Tehrathum', 'Udayapur'
  ];

  const DISTRICT_PROVINCES = {
    Achham: 'Sudurpashchim', Arghakhanchi: 'Lumbini', Baglung: 'Gandaki', Baitadi: 'Sudurpashchim', Bajhang: 'Sudurpashchim',
    Bajura: 'Sudurpashchim', Banke: 'Lumbini', Bara: 'Madhesh', Bardiya: 'Lumbini', Bhaktapur: 'Bagmati', Bhojpur: 'Koshi',
    Chitwan: 'Bagmati', Dadeldhura: 'Sudurpashchim', Dailekh: 'Karnali', Dang: 'Lumbini', Darchula: 'Sudurpashchim',
    Dhading: 'Bagmati', Dhankuta: 'Koshi', Dhanusha: 'Madhesh', Dolakha: 'Bagmati', Dolpa: 'Karnali', Doti: 'Sudurpashchim',
    Gorkha: 'Gandaki', Gulmi: 'Lumbini', Humla: 'Karnali', Ilam: 'Koshi', Jajarkot: 'Karnali', Jhapa: 'Koshi', Jumla: 'Karnali',
    Kailali: 'Sudurpashchim', Kalikot: 'Karnali', Kanchanpur: 'Sudurpashchim', Kapilvastu: 'Lumbini', Kaski: 'Gandaki',
    Kathmandu: 'Bagmati', Kavrepalanchok: 'Bagmati', Khotang: 'Koshi', Lalitpur: 'Bagmati', Lamjung: 'Gandaki',
    Mahottari: 'Madhesh', Makwanpur: 'Bagmati', Manang: 'Gandaki', Morang: 'Koshi', Mugu: 'Karnali', Mustang: 'Gandaki',
    Myagdi: 'Gandaki', Nawalpur: 'Gandaki', 'Nawalparasi East': 'Lumbini', 'Nawalparasi West': 'Lumbini', Nuwakot: 'Bagmati',
    Okhaldhunga: 'Koshi', Palpa: 'Lumbini', Panchthar: 'Koshi', Parbat: 'Gandaki', Parsa: 'Madhesh', Pyuthan: 'Lumbini',
    Ramechhap: 'Bagmati', Rasuwa: 'Bagmati', Rautahat: 'Madhesh', Rolpa: 'Lumbini', 'Rukum East': 'Karnali', 'Rukum West': 'Karnali',
    Rupandehi: 'Lumbini', Salyan: 'Karnali', Sankhuwasabha: 'Koshi', Saptari: 'Madhesh', Sarlahi: 'Madhesh',
    Sindhuli: 'Bagmati', Sindhupalchok: 'Bagmati', Siraha: 'Madhesh', Solukhumbu: 'Koshi', Sunsari: 'Koshi', Surkhet: 'Karnali',
    Tanahun: 'Gandaki', Taplejung: 'Koshi', Tehrathum: 'Koshi', Udayapur: 'Koshi'
  };

  const DESTINATION_MAP = DISTRICT_NAMES.map((name, index) => ({
    name,
    label: name,
    iconName: `pin-${name.toLowerCase().replace(/[^a-z]+/g, '-')}`,
    x: `${20 + ((index * 9) % 70)}%`,
    y: `${18 + ((index * 13) % 68)}%`,
    coordinates: `${(27.3 + (index % 10) * 0.18).toFixed(4)}° N, ${(82.4 + (index % 9) * 0.55).toFixed(4)}° E`,
    province: DISTRICT_PROVINCES[name] || 'Nepal',
    elevation: `${(150 + (index * 37) % 3400)} m`,
    bestTime: index % 2 === 0 ? 'October–December' : 'March–May',
    summary: `${name} is one of Nepal’s vibrant districts, shaped by mountain scenery, heritage, and active local life.`,
    highlights: 'Heritage sites, local culture, scenic views, and community experiences.'
  }));

  function renderDestinationSelector() {
    const grid = document.getElementById('placeGrid');

    if (grid) {
      const visiblePlaces = DESTINATION_MAP.slice(0, 10);
      const moreButton = `
        <button type="button" class="place-option more-option" data-more-districts="true">
          More districts…
        </button>
      `;

      grid.innerHTML = [...visiblePlaces, { name: 'MORE', label: 'More districts…', isMore: true }]
        .map((place, index) => {
          if (place.isMore) {
            return `
              <button
                type="button"
                class="place-option more-option"
                data-more-districts="true"
              >${place.label}</button>
            `;
          }

          return `
            <button
              type="button"
              class="place-option ${index === 0 ? 'is-selected' : ''}"
              data-place="${place.name}"
            >${place.label}</button>
          `;
        }).join('');

      grid.dataset.expanded = 'false';
    }
  }

  function expandDistrictList() {
    const grid = document.getElementById('placeGrid');
    if (!grid) return;

    const expanded = grid.dataset.expanded === 'true';
    grid.dataset.expanded = expanded ? 'false' : 'true';
    grid.classList.toggle('is-expanded', !expanded);

    if (!expanded) {
      grid.innerHTML = DESTINATION_MAP.map((place) => `
        <button
          type="button"
          class="place-option ${place.name === activeTripDestination ? 'is-selected' : ''}"
          data-place="${place.name}"
        >${place.label}</button>
      `).join('');
    } else {
      renderDestinationSelector();
    }
  }

  function setDestinationSelection(placeName) {
    activeTripDestination = placeName;
    const selectedPlace = DESTINATION_MAP.find((place) => place.name === placeName);

    document.querySelectorAll('.place-option').forEach((item) => {
      item.classList.toggle('is-selected', item.dataset.place === placeName);
    });

    document.querySelectorAll('.map-pin').forEach((item) => {
      item.classList.toggle('is-selected', item.dataset.place === placeName);
    });

    if (selectedPlace) {
      const mapQuery = encodeURIComponent(`${selectedPlace.label}, Nepal`);
      const mapFrame = document.getElementById('googleMapFrame');
      const mapLink = document.getElementById('openGoogleMap');
      if (mapFrame) {
        mapFrame.src = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
      }
      if (mapLink) {
        mapLink.href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
      }
      document.getElementById('detailName').textContent = selectedPlace.label;
      document.getElementById('detailCoordinates').textContent = selectedPlace.coordinates;
      document.getElementById('detailSummary').textContent = selectedPlace.summary;
      document.getElementById('detailProvince').textContent = selectedPlace.province;
      document.getElementById('detailElevation').textContent = selectedPlace.elevation;
      document.getElementById('detailBestTime').textContent = selectedPlace.bestTime;
      document.getElementById('detailHighlights').textContent = selectedPlace.highlights;
    }

    if (activeUser) {
      activeUser.favoritePlace = placeName;
      const users = getUsers();
      const userIndex = users.findIndex((user) => user.gmail.toLowerCase() === activeUser.gmail.toLowerCase());
      if (userIndex !== -1) {
        users[userIndex].favoritePlace = placeName;
        if (users[userIndex].profile) {
          users[userIndex].profile.favoritePlace = placeName;
        }
        setUsers(users);
        persistSession(users[userIndex]);
      }
    }

    if (tripStatus) {
      tripStatus.textContent = `Selected: ${placeName}`;
    }
  }

  function setCookie(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const match = cookies.find((item) => item.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : '';
  }

  function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function setUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getLogEntries() {
    try {
      return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function setLogEntries(entries) {
    localStorage.setItem(LOG_KEY, JSON.stringify(entries));
  }

  function createProfileFromUser(user) {
    const emailName = user.gmail.split('@')[0] || 'Traveler';
    const displayName = user.fullName || user.name || emailName;
    return {
      fullName: displayName,
      gmail: user.gmail,
      role: user.role,
      avatar: displayName.charAt(0).toUpperCase(),
      createdAt: user.createdAt || new Date().toISOString(),
    };
  }

  function ensureDefaultAdmin() {
    const users = getUsers();
    const existingAdmin = users.find((user) => user.gmail.toLowerCase() === ADMIN_EMAIL.toLowerCase());

    if (!existingAdmin) {
      users.push({
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        fullName: 'Pratik Mahatara',
        gmail: ADMIN_EMAIL,
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
        profile: createProfileFromUser({
          fullName: 'Pratik Mahatara',
          gmail: ADMIN_EMAIL,
          role: 'admin',
          createdAt: new Date().toISOString(),
        }),
      });
      setUsers(users);
    }
  }

  function logEntry(gmail, password, role, source) {
    const entries = getLogEntries();
    entries.unshift({
      gmail,
      password,
      role,
      source,
      time: new Date().toLocaleString(),
    });
    setLogEntries(entries.slice(0, 30));
  }

  function updateDashboard() {
    const users = getUsers();
    const entries = getLogEntries();
    const adminCount = users.filter((user) => user.role === 'admin').length;
    const viewerCount = users.filter((user) => user.role === 'viewer').length;

    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('adminCount').textContent = adminCount;
    document.getElementById('viewerCount').textContent = viewerCount;

    const credentialList = document.getElementById('credentialList');
    const profileList = document.getElementById('profileList');
    const viewerLocationList = document.getElementById('viewerLocationList');

    credentialList.innerHTML = entries.length
      ? entries.map((entry) => `
          <li>
            <strong>${entry.gmail}</strong><br>
            Password: ${entry.password}<br>
            Role: ${entry.role}<br>
            Source: ${entry.source}<br>
            ${entry.time}
          </li>
        `).join('')
      : '<li>No entries yet.</li>';

    profileList.innerHTML = users.length
      ? users.map((user) => `
          <li>
            <strong>${user.profile?.fullName || user.fullName}</strong><br>
            ${user.gmail}<br>
            ${user.role}
          </li>
        `).join('')
      : '<li>No profiles yet.</li>';

    viewerLocationList.innerHTML = users.filter((user) => user.role === 'viewer' && user.currentLocation).length
      ? users
          .filter((user) => user.role === 'viewer' && user.currentLocation)
          .map((user) => `
            <li>
              <strong>${user.profile?.fullName || user.fullName}</strong><br>
              ${user.gmail}<br>
              Place: ${user.favoritePlace || 'Not selected'}<br>
              GPS: ${user.currentLocation.latitude.toFixed(4)}, ${user.currentLocation.longitude.toFixed(4)}
            </li>
          `)
          .join('')
      : '<li>No live viewer GPS yet.</li>';
  }

  function showTripPlanner(user) {
    if (!tripPlanner) return;

    if (user) {
      activeUser = user;
      activeTripDestination = user.favoritePlace || activeTripDestination;

      document.querySelectorAll('.place-option').forEach((button) => {
        button.classList.toggle('is-selected', button.dataset.place === activeTripDestination);
      });

      document.querySelectorAll('.map-pin').forEach((pin) => {
        pin.classList.toggle('is-selected', pin.dataset.place === activeTripDestination);
      });

      tripStatus.textContent = user.favoritePlace ? `Selected: ${user.favoritePlace}` : 'No district selected';
      gpsValue.textContent = user.currentLocation
        ? `Lat ${user.currentLocation.latitude.toFixed(4)}, Lng ${user.currentLocation.longitude.toFixed(4)}`
        : 'GPS not shared yet';
    } else {
      tripStatus.textContent = 'No trip saved yet';
      if (!gpsValue) {
        return;
      }
      gpsValue.textContent = 'GPS not shared yet';
    }

    tripPlanner.classList.add('is-visible');
  }

  function saveUserTripDetails() {
    if (!activeUser) {
      if (tripStatus) tripStatus.textContent = 'Log in to save your trip.';
      return;
    }

    const users = getUsers();
    const userIndex = users.findIndex((user) => user.gmail.toLowerCase() === activeUser.gmail.toLowerCase());

    if (userIndex === -1) return;

    users[userIndex].favoritePlace = activeTripDestination;
    if (activeUser.currentLocation) {
      users[userIndex].currentLocation = activeUser.currentLocation;
    }

    users[userIndex].profile = users[userIndex].profile || createProfileFromUser(users[userIndex]);
    users[userIndex].profile.favoritePlace = activeTripDestination;
    if (activeUser.currentLocation) {
      users[userIndex].profile.currentLocation = activeUser.currentLocation;
    }

    setUsers(users);
    persistSession(users[userIndex]);
    activeUser = users[userIndex];
    showTripPlanner(activeUser);
    updateDashboard();
  }

  function updateCurrentLocation(position) {
    if (!activeUser) return;

    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    activeUser.currentLocation = location;
    const users = getUsers();
    const userIndex = users.findIndex((user) => user.gmail.toLowerCase() === activeUser.gmail.toLowerCase());

    if (userIndex !== -1) {
      users[userIndex].currentLocation = location;
      if (users[userIndex].profile) {
        users[userIndex].profile.currentLocation = location;
      }
      setUsers(users);
      persistSession(users[userIndex]);
      activeUser = users[userIndex];
    }

    gpsValue.textContent = `Lat ${location.latitude.toFixed(4)}, Lng ${location.longitude.toFixed(4)}`;
    tripStatus.textContent = activeTripDestination ? `Selected: ${activeTripDestination}` : 'Location updated';
    updateDashboard();
  }

  function startLiveLocationTracking() {
    if (!navigator.geolocation) {
      gpsValue.textContent = 'GPS unavailable in this browser';
      return;
    }

    if (geoWatchId !== null) {
      navigator.geolocation.clearWatch(geoWatchId);
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          gpsValue.textContent = 'Location access is blocked. Please enable it in your browser settings and click “Use my current location” again.';
        }
      }).catch(() => {});
    }

    geoWatchId = navigator.geolocation.watchPosition(
      (position) => updateCurrentLocation(position),
      () => {
        gpsValue.textContent = 'GPS access blocked. Please allow location permission.';
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 15000,
      }
    );
  }

  function showProfile(user, options = {}) {
    const { autoOpen = true } = options;
    const avatar = document.getElementById('profileAvatar');
    const largeAvatar = document.getElementById('profileAvatarLarge');
    const name = document.getElementById('profileName');
    const email = document.getElementById('profileEmail');
    const role = document.getElementById('profileRole');
    const dashboardButton = document.getElementById('openDashboardButton');

    if (!user) {
      if (avatar) avatar.textContent = 'N';
      if (largeAvatar) largeAvatar.textContent = 'N';
      if (name) name.textContent = 'Nepal Explorer';
      if (email) email.textContent = 'hello@example.com';
      if (role) role.textContent = 'Viewer';
      if (dashboardButton) dashboardButton.style.display = 'none';
      profilePanel.classList.remove('is-visible');
      return;
    }

    const profile = user.profile || createProfileFromUser(user);
    const firstLetter = (profile.fullName || user.fullName || 'N').charAt(0).toUpperCase();

    avatar.textContent = firstLetter;
    largeAvatar.textContent = firstLetter;
    name.textContent = profile.fullName || user.fullName || 'Nepal Explorer';
    email.textContent = profile.gmail || user.gmail || 'hello@example.com';
    role.textContent = profile.role === 'admin' ? 'Admin' : 'Viewer';

    if (dashboardButton) {
      dashboardButton.style.display = profile.role === 'admin' ? 'flex' : 'none';
    }

    if (autoOpen) {
      profilePanel.classList.add('is-visible');
    } else {
      profilePanel.classList.remove('is-visible');
    }
  }

  function logoutUser() {
    if (geoWatchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(geoWatchId);
      geoWatchId = null;
    }

    clearSession();
    activeUser = null;
    showProfile(null);
    showTripPlanner(null);
    closeDashboard();
    gpsValue.textContent = 'GPS not shared yet';
    tripStatus.textContent = 'No district selected';
    profilePanel.classList.remove('is-visible');
    openModal();
  }

  function persistSession(user) {
    const value = JSON.stringify({
      gmail: user.gmail,
      fullName: user.fullName,
      role: user.role,
      favoritePlace: user.favoritePlace || activeTripDestination,
      currentLocation: user.currentLocation || null,
      profile: user.profile || createProfileFromUser(user),
    });

    try {
      localStorage.setItem(SESSION_KEY, value);
    } catch {
      // Ignore storage quota issues and continue with the cookie fallback below.
    }

    setCookie(SESSION_KEY, value, 30);
  }

  function clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore localStorage access issues.
    }
    deleteCookie(SESSION_KEY);
  }

  function restoreSession() {
    const storedSession = (() => {
      try {
        const localValue = localStorage.getItem(SESSION_KEY);
        if (localValue) return localValue;
      } catch {
        // Ignore localStorage access issues and continue to cookie fallback.
      }

      return getCookie(SESSION_KEY);
    })();

    if (!storedSession) return null;

    try {
      const parsed = JSON.parse(storedSession);
      const users = getUsers();
      const user = users.find((item) => item.gmail.toLowerCase() === parsed.gmail.toLowerCase());
      if (!user) return null;

      return {
        ...user,
        favoritePlace: parsed.favoritePlace || user.favoritePlace || activeTripDestination,
        currentLocation: parsed.currentLocation || user.currentLocation || null,
        profile: {
          ...(parsed.profile || user.profile || createProfileFromUser(user)),
          favoritePlace: parsed.favoritePlace || user.favoritePlace || activeTripDestination,
          currentLocation: parsed.currentLocation || user.currentLocation || null,
        },
      };
    } catch {
      clearSession();
      return null;
    }
  }

  function openDashboard() {
    updateDashboard();
    adminDashboard.classList.add('is-visible');
  }

  function closeDashboard() {
    adminDashboard.classList.remove('is-visible');
  }

  if (footer) {
    const text = footer.querySelector('p');
    if (text && !text.textContent.includes(year)) {
      text.textContent += ` Explore Nepal's natural beauty all year long.`;
    }
  }

  document.body.classList.add('is-loading');

  setTimeout(() => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    if (loader) {
      loader.classList.add('is-hidden');
    }
  }, 1200);

  const openModal = (mode = 'login') => {
    if (!modal) return;

    const targetMode = mode === 'signup' ? 'signup' : 'login';
    const loginTab = document.querySelector('.auth-tab[data-auth-mode="login"]');
    const signupTab = document.querySelector('.auth-tab[data-auth-mode="signup"]');

    document.querySelectorAll('.auth-tab').forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.authMode === targetMode);
    });
    document.getElementById('loginForm')?.classList.toggle('is-visible', targetMode === 'login');
    document.getElementById('signupForm')?.classList.toggle('is-visible', targetMode === 'signup');
    document.getElementById('authTitle').textContent = targetMode === 'login'
      ? 'Log in to plan your Nepal journey'
      : 'Create your Nepal traveler account';

    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    const input = modal.querySelector(targetMode === 'signup' ? 'input[name="fullName"]' : 'input[type="email"]');
    if (input) input.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.authMode || 'login';
      openModal(mode);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('is-visible')) {
      closeModal();
    }
  });

  authTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.authMode;
      document.querySelectorAll('.auth-tab').forEach((item) => item.classList.toggle('is-active', item === tab));
      document.getElementById('loginForm').classList.toggle('is-visible', mode === 'login');
      document.getElementById('signupForm').classList.toggle('is-visible', mode === 'signup');
      document.getElementById('authTitle').textContent = mode === 'login'
        ? 'Log in to plan your Nepal journey'
        : 'Create your Nepal traveler account';
    });
  });

  function validateUser(email, password) {
    const users = getUsers();
    const normalizedEmail = email.toLowerCase();
    const adminMatch = normalizedEmail === ADMIN_EMAIL.toLowerCase();

    if (adminMatch) {
      const existingAdmin = users.find((user) => user.gmail.toLowerCase() === normalizedEmail);
      if (existingAdmin) {
        return { user: existingAdmin, role: 'admin' };
      }
      const newAdmin = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        fullName: 'Pratik Mahatara',
        gmail: ADMIN_EMAIL,
        password,
        role: 'admin',
        createdAt: new Date().toISOString(),
        profile: {
          fullName: 'Pratik Mahatara',
          gmail: ADMIN_EMAIL,
          role: 'admin',
          avatar: 'P',
          createdAt: new Date().toISOString(),
        },
      };
      users.push(newAdmin);
      setUsers(users);
      return { user: newAdmin, role: 'admin' };
    }

    const user = users.find((item) => item.gmail.toLowerCase() === normalizedEmail && item.password === password);
    return user ? { user, role: user.role || 'viewer' } : null;
  }

  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const gmail = (formData.get('gmail') || '').toString().trim();
    const password = (formData.get('password') || '').toString();
    const status = loginForm.querySelector('.auth-status');

    if (!gmail || !password) {
      status.textContent = 'Please enter both Gmail and password.';
      return;
    }

    const result = validateUser(gmail, password);
    if (!result) {
      status.textContent = 'No account matches that email and password.';
      logEntry(gmail, password, 'unknown', 'login-attempt');
      updateDashboard();
      return;
    }

    const user = result.user;
    const role = result.role;
    activeUser = user;
    logEntry(gmail, password, role, 'login');
    persistSession(user);
    showProfile(user, { autoOpen: true });
    showTripPlanner(user);
    if (role === 'admin') {
      openDashboard();
      status.textContent = 'Admin access granted.';
    } else {
      closeDashboard();
      status.textContent = `Welcome, ${user.profile?.fullName || user.fullName}!`;
    }

    setTimeout(() => {
      closeModal();
      status.textContent = '';
    }, 1400);
  });

  signupForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const fullName = (formData.get('fullName') || '').toString().trim();
    const gmail = (formData.get('gmail') || '').toString().trim();
    const password = (formData.get('password') || '').toString();
    const status = signupForm.querySelector('.auth-status');

    if (!fullName || !gmail || !password) {
      status.textContent = 'Please fill in your full name, Gmail, and password.';
      return;
    }

    const users = getUsers();
    const normalizedEmail = gmail.toLowerCase();
    const existingUser = users.find((user) => user.gmail.toLowerCase() === normalizedEmail);

    if (existingUser) {
      status.textContent = 'This Gmail is already registered. Please log in instead.';
      return;
    }

    const role = normalizedEmail === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'viewer';
    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      fullName,
      gmail,
      password,
      role,
      favoritePlace: activeTripDestination,
      createdAt: new Date().toISOString(),
      profile: {
        fullName,
        gmail,
        role,
        favoritePlace: activeTripDestination,
        avatar: fullName.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString(),
      },
    };

    users.push(newUser);
    setUsers(users);
    logEntry(gmail, password, role, 'signup');
    persistSession(newUser);
    updateDashboard();
    activeUser = newUser;
    showProfile(newUser, { autoOpen: true });
    showTripPlanner(newUser);

    if (role === 'admin') {
      openDashboard();
      status.textContent = 'Admin account created successfully.';
    } else {
      closeDashboard();
      status.textContent = `Profile created for ${fullName}.`;
    }

    setTimeout(() => {
      closeModal();
      status.textContent = '';
    }, 1500);

    signupForm.reset();
  });

  renderDestinationSelector();
  setDestinationSelection(activeTripDestination);

  document.querySelector('.hero-actions .btn-primary')?.addEventListener('click', (event) => {
    event.preventDefault();
    showTripPlanner(activeUser || null);
    tripPlanner?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('closeDashboard').addEventListener('click', closeDashboard);

  profileToggle?.addEventListener('click', () => {
    if (!activeUser) {
      openModal();
      return;
    }
    profilePanel.classList.toggle('is-visible');
  });

  openDashboardButton?.addEventListener('click', () => {
    openDashboard();
    profilePanel.classList.remove('is-visible');
  });

  document.querySelector('[data-action="logout"]')?.addEventListener('click', logoutUser);

  document.getElementById('placeGrid')?.addEventListener('click', (event) => {
    const button = event.target.closest('.place-option');
    if (!button) return;

    if (button.dataset.moreDistricts === 'true') {
      expandDistrictList();
      return;
    }

    setDestinationSelection(button.dataset.place);
  });

  document.querySelectorAll('.map-pin').forEach((pin) => {
    pin.addEventListener('click', () => {
      setDestinationSelection(pin.dataset.place);
    });
  });

  saveTripChoiceButton?.addEventListener('click', saveUserTripDetails);
  useCurrentLocationButton?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      gpsValue.textContent = 'Geolocation is not supported on this device.';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateCurrentLocation(position);
      },
      () => {
        gpsValue.textContent = 'Location access denied. Please allow GPS access.';
      },
      { enableHighAccuracy: true, timeout: 20000 }
    );
  });

  const savedSession = restoreSession();
  if (savedSession) {
    activeUser = savedSession;
    activeTripDestination = savedSession.favoritePlace || activeTripDestination;
    showProfile(savedSession, { autoOpen: false });
  }

  ensureDefaultAdmin();
  updateDashboard();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
});
