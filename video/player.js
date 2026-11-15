const video = document.querySelector('#video');
const quality = document.querySelector('#quality');
const toolbar = document.querySelector('#toolbar');
const status = document.querySelector('#status');
const empty = document.querySelector('#empty');

const Hls = window.Hls;
const nativeHls = video.canPlayType('application/vnd.apple.mpegurl')
  || video.canPlayType('application/x-mpegURL');
const supportsHlsJs = Hls?.isSupported();
let pendingPlayback;

function report(message = '') {
  status.textContent = message;
  status.hidden = !message;
}

function populateQualities(levels, switchQuality) {
  quality.length = 1;
  quality.value = 'auto';
  toolbar.hidden = levels.length < 2;
  if (toolbar.hidden) return;

  const sortedLevels = [...levels].sort((a, b) => b.height - a.height || b.bitrate - a.bitrate);
  for (const level of sortedLevels) {
    const duplicateHeight = sortedLevels.some(other => other !== level && other.height === level.height);
    const resolution = level.height ? level.height + 'p' : '';
    const bitrate = level.bitrate ? (level.bitrate / 1_000_000).toFixed(1) + ' Mbps' : '';
    const label = resolution && duplicateHeight && bitrate
      ? resolution + ' · ' + bitrate
      : resolution || bitrate || 'Variant ' + (level.id + 1);
    quality.add(new Option(label, level.id));
  }

  quality.onchange = () => {
    report();
    switchQuality(quality.value);
  };
}

function parseVariants(playlist, baseUrl) {
  const levels = [];
  let attributes;
  for (const line of playlist.split(/\r?\n/).map(line => line.trim())) {
    if (line.startsWith('#EXT-X-STREAM-INF:')) {
      attributes = line.slice('#EXT-X-STREAM-INF:'.length);
    } else if (attributes && line && !line.startsWith('#')) {
      const variant = new URL(line, baseUrl);
      if (variant.protocol === 'https:' && !variant.username && !variant.password) {
        levels.push({
          id: levels.length,
          url: variant.href,
          height: Number(attributes.match(/(?:^|,)RESOLUTION=\d+x(\d+)/)?.[1] ?? 0),
          bitrate: Number(attributes.match(/(?:^|,)BANDWIDTH=(\d+)/)?.[1] ?? 0),
          linkedTracks: /(?:^|,)(?:AUDIO|VIDEO|SUBTITLES)=/.test(attributes),
        });
      }
      attributes = undefined;
    }
  }
  return levels;
}

async function discoverVariants(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(source, { signal: controller.signal, credentials: 'omit' });
    if (response.ok) return parseVariants(await response.text(), response.url || source);
  } catch {
    // Safari can still try native playback when playlist discovery fails.
  } finally {
    clearTimeout(timeout);
  }
  return [];
}

function getPlaybackState() {
  return { time: video.currentTime, playing: !video.paused && !video.ended };
}

function setNativeSource(source, playback) {
  pendingPlayback = playback;
  video.src = source;
  if (playback?.playing) video.play().catch(() => {});
}

async function attachNativeHls(source, playback) {
  video.disableRemotePlayback = false;
  toolbar.hidden = true;
  report();
  setNativeSource(source, playback);

  const levels = await discoverVariants(source);
  // Native playback needs the master playlist to retain linked tracks.
  if (levels.some(level => level.linkedTracks)) return;

  populateQualities(levels, selected => {
    const nextSource = selected === 'auto' ? source : levels[Number(selected)].url;
    if (nextSource === video.src) return;
    setNativeSource(nextSource, pendingPlayback ?? getPlaybackState());
  });
}

function attachHls(source) {
  // Managed Media Source needs remote playback disabled when there is no AirPlay source.
  video.disableRemotePlayback = true;
  const hls = new Hls({ enableWorker: true, lowLatencyMode: true, backBufferLength: 90 });
  let attemptedMediaRecovery = false;
  hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
    populateQualities(data.levels.map((level, id) => ({
      id,
      height: level.height || 0,
      bitrate: level.bitrate || 0,
    })), selected => {
      hls.nextLevel = selected === 'auto' ? -1 : Number(selected);
    });
  });
  hls.on(Hls.Events.ERROR, (_event, error) => {
    if (!error.fatal) return;
    if (error.type === Hls.ErrorTypes.MEDIA_ERROR && video.error && !attemptedMediaRecovery) {
      attemptedMediaRecovery = true;
      hls.recoverMediaError();
      return;
    }

    const playback = getPlaybackState();
    hls.destroy();
    if (nativeHls) {
      attachNativeHls(source, playback);
    } else {
      toolbar.hidden = true;
      report('This stream could not be played. Check the video URL and try again.');
    }
  });
  hls.loadSource(source);
  hls.attachMedia(video);
}

video.addEventListener('loadedmetadata', () => {
  report();
  if (!pendingPlayback) return;
  const { time } = pendingPlayback;
  pendingPlayback = undefined;
  if (time > 0) video.currentTime = Math.min(time, video.duration || time);
});

video.addEventListener('error', () => {
  pendingPlayback = undefined;
  report('This video or quality is unavailable on this device.');
});

function start() {
  const rawSource = new URLSearchParams(location.search).get('src');
  if (!rawSource) {
    empty.hidden = false;
    return;
  }

  let source;
  try {
    source = new URL(rawSource);
    if (source.protocol !== 'https:' || source.username || source.password) throw new Error('Invalid source');
  } catch {
    empty.hidden = false;
    report('Use a complete HTTPS video URL in ?src=.');
    return;
  }

  video.hidden = false;
  if (/\.(mp4|m4v|mov|webm|ogg|ogv)$/i.test(source.pathname)) {
    video.src = source.href;
  } else if (supportsHlsJs) {
    attachHls(source.href);
  } else if (nativeHls) {
    attachNativeHls(source.href);
  } else {
    report('This browser cannot play this HLS stream.');
  }
}

start();
