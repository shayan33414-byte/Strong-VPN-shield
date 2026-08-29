const STORAGE_KEY = "strongVpnShieldDemo";

const defaults = {
  server: "United States",
  autoConnect: false,
  killSwitch: false,
  darkMode: true,
  notifications: true,
};

function loadState() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return { ...defaults };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function applyTheme(state) {
  document.body.classList.toggle("theme-light", !state.darkMode);
}

function setupDashboard(state) {
  const status = document.getElementById("status");
  const connectButton = document.getElementById("connectBtn");
  const disconnectButton = document.getElementById("disconnectBtn");
  const selectedServer = document.getElementById("selectedServer");

  if (!status || !connectButton || !disconnectButton || !selectedServer) return;

  selectedServer.textContent = state.server;

  function render(isRunning) {
    status.classList.toggle("status--on", isRunning);
    status.classList.toggle("status--off", !isRunning);
    status.innerHTML = isRunning
      ? '<span class="status__dot" aria-hidden="true"></span><div><strong>Demo connected</strong><span>Visual simulation only — your traffic is unchanged.</span></div>'
      : '<span class="status__dot" aria-hidden="true"></span><div><strong>Demo disconnected</strong><span>No network settings have been changed.</span></div>';
    connectButton.disabled = isRunning;
    disconnectButton.disabled = !isRunning;
  }

  connectButton.addEventListener("click", () => render(true));
  disconnectButton.addEventListener("click", () => render(false));
  render(Boolean(state.autoConnect));
}

function setupServers(state) {
  const serverList = document.getElementById("serverList");
  if (!serverList) return;

  const buttons = [...serverList.querySelectorAll("[data-server]")];

  function render() {
    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.server === state.server),
      );
    });
  }

  serverList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-server]");
    if (!button) return;
    state.server = button.dataset.server;
    saveState(state);
    render();
  });

  render();
}

function setupSettings(state) {
  const inputs = [...document.querySelectorAll("[data-setting]")];
  const notice = document.getElementById("settingsNotice");
  if (!inputs.length) return;

  inputs.forEach((input) => {
    input.checked = Boolean(state[input.dataset.setting]);
    input.addEventListener("change", () => {
      state[input.dataset.setting] = input.checked;
      saveState(state);
      applyTheme(state);
      if (notice) notice.textContent = "Demo preference saved in this browser.";
    });
  });
}

function setupSpeedSimulation() {
  const button = document.getElementById("speedTestBtn");
  const result = document.getElementById("speedStatus");
  if (!button || !result) return;

  button.addEventListener("click", () => {
    button.disabled = true;
    result.textContent = "Generating sample values…";

    window.setTimeout(() => {
      const download = Math.floor(120 + Math.random() * 380);
      const upload = Math.floor(40 + Math.random() * 180);
      const ping = Math.floor(18 + Math.random() * 65);
      result.innerHTML = `<strong>Example result</strong><br>Download: ${download} Mbps<br>Upload: ${upload} Mbps<br>Ping: ${ping} ms<br><small>Not measured from your connection.</small>`;
      button.disabled = false;
    }, 700);
  });
}

const state = loadState();
applyTheme(state);
setupDashboard(state);
setupServers(state);
setupSettings(state);
setupSpeedSimulation();
