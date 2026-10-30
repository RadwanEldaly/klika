/**
 * KLIKA DIGITAL — Hero 3D Sequential Canvas & Scroll-Driven Brand Experience
 * Coordinates 143 WebP frames, Lenis smooth scrolling, GSAP ScrollTrigger,
 * HUD telemetry, interactive scrubber, and ambient soundscape.
 */

window.Hero3DExperience = {
  TOTAL_FRAMES: 143,
  FRAME_PATH: (i) => `klika_frames/frame_${String(i).padStart(4, '0')}.webp`,
  frames: [],
  loadedCount: 0,
  currentIndex: 0,
  isPlaying: false,
  playInterval: null,
  scrollTriggerInstance: null,
  canvas: null,
  ctx: null,
  audio: null,
  isAudioPlaying: false,

  async init() {
    this.canvas = document.getElementById('hero-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.audio = document.getElementById('brand-audio');

    this.bindScrubberControls();
    this.bindAudioToggle();
    this.bindReassembleButtons();
    window.addEventListener('resize', () => this.handleResize());

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Start progressive loading
    await this.loadFrames(prefersReducedMotion);
  },

  async loadFrames(prefersReducedMotion) {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderCount = document.getElementById('preloader-frame-count');
    const preloaderPct = document.getElementById('preloader-percent');

    this.frames = new Array(this.TOTAL_FRAMES);

    // Load first frame immediately for instant first paint
    const firstImg = await this.preloadSingleFrame(0);
    this.renderFrame(0);

    // If reduced motion, load key frame 0 and dismiss preloader early
    if (prefersReducedMotion) {
      if (preloader) preloader.classList.add('loaded');
      this.initScrollSync();
      return;
    }

    // Load in fast concurrent chunks of 12
    const chunkSize = 12;
    for (let i = 0; i < this.TOTAL_FRAMES; i += chunkSize) {
      const chunk = [];
      for (let j = i; j < Math.min(i + chunkSize, this.TOTAL_FRAMES); j++) {
        chunk.push(this.preloadSingleFrame(j).then(() => {
          this.loadedCount++;
          const pct = Math.floor((this.loadedCount / this.TOTAL_FRAMES) * 100);
          if (preloaderBar) preloaderBar.style.width = `${pct}%`;
          if (preloaderCount) preloaderCount.textContent = `FRAME ${String(this.loadedCount).padStart(3, '0')} / ${this.TOTAL_FRAMES}`;
          if (preloaderPct) preloaderPct.textContent = `${pct}%`;
        }));
      }
      await Promise.all(chunk);
    }

    // Finish preloader
    setTimeout(() => {
      this.handleResize();
      this.renderFrame(0);
      if (preloader) preloader.classList.add('loaded');
      this.initScrollSync();
    }, 250);
  },

  preloadSingleFrame(index) {
    return new Promise((resolve) => {
      const img = new Image();
      const num = index + 1;
      img.src = this.FRAME_PATH(num);

      const done = () => {
        this.frames[index] = img;
        resolve(img);
      };

      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(done).catch(done);
        } else {
          done();
        }
      };

      img.onerror = () => {
        console.warn(`[Frame Warning] Frame ${num} failed to load.`);
        done();
      };
    });
  },

  handleResize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
    const h = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;

    // Cap at native 1080p resolution (1920x1080) to avoid GPU fill-rate bottleneck
    this.canvas.width = Math.min(1920, Math.round(w * dpr));
    this.canvas.height = Math.min(1080, Math.round(h * dpr));
    this.renderFrame(this.currentIndex, true);
  },

  renderFrame(index, force = false) {
    if (!this.ctx || !this.canvas) return;
    const targetIndex = Math.max(0, Math.min(this.TOTAL_FRAMES - 1, index));
    if (!force && targetIndex === this.currentIndex && this._hasRendered) return;
    this.currentIndex = targetIndex;
    this._hasRendered = true;

    const img = this.frames[this.currentIndex] || this.frames[0];
    if (!img) return;

    const cw = this.canvas.width;
    const ch = this.canvas.height;

    // Fill studio void obsidian matte
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, cw, ch);

    // Compute aspect-ratio contain with safe margin
    const imgAspect = 1920 / 1080;
    const canvasAspect = cw / ch;

    let dw, dh, dx, dy;
    if (canvasAspect > imgAspect) {
      dh = ch;
      dw = ch * imgAspect;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / imgAspect;
      dx = 0;
      dy = (ch - dh) / 2;
    }

    try {
      this.ctx.drawImage(img, dx, dy, dw, dh);
    } catch (e) {
      // Ignore transient draw error if frame decoded partially
    }

    // Update HUD & Chapters
    this.updateHudTelemetry(this.currentIndex);
  },

  updateHudTelemetry(frameIndex) {
    const frameNum = frameIndex + 1;

    // Cache elements for instant access
    if (!this.scrubberEl) this.scrubberEl = document.getElementById('frame-scrubber');
    if (!this.readoutEl) this.readoutEl = document.getElementById('scrubber-readout');
    if (!this.hudStatusEl) this.hudStatusEl = document.getElementById('hud-status-text');
    if (!this.hudDotEl) this.hudDotEl = document.getElementById('hud-dot');

    // Scrubber update
    if (this.scrubberEl && document.activeElement !== this.scrubberEl) {
      if (this.scrubberEl.value != frameNum) {
        this.scrubberEl.value = frameNum;
      }
    }
    if (this.readoutEl) {
      this.readoutEl.textContent = `${String(frameNum).padStart(3, '0')} / ${this.TOTAL_FRAMES}`;
    }

    // Determine Chapter
    let chapter = 1;
    let dotColor = '#1ea6f6';

    if (frameNum <= 35) {
      chapter = 1;
      dotColor = '#1ea6f6';
    } else if (frameNum <= 70) {
      chapter = 2;
      dotColor = '#7f52f5';
    } else if (frameNum <= 105) {
      chapter = 3;
      dotColor = '#16e4cb';
    } else {
      chapter = 4;
      dotColor = '#ffffff';
    }

    // Only update chapter and status pill if chapter has changed
    if (this._activeChapter !== chapter) {
      this.activateChapter(chapter);
      const lang = window.KLIKA_LANG || 'ar';
      const dict = window.KLIKA_TRANSLATIONS[lang] || window.KLIKA_TRANSLATIONS.ar;
      const stateTexts = {
        1: dict.hudAssembled,
        2: dict.hudTransforming,
        3: dict.hudStratified,
        4: dict.hudExploded
      };
      if (this.hudStatusEl) this.hudStatusEl.textContent = stateTexts[chapter] || dict.hudAssembled;
      if (this.hudDotEl) {
        this.hudDotEl.style.background = dotColor;
        this.hudDotEl.style.boxShadow = `0 0 10px ${dotColor}`;
      }
    }
  },

  activateChapter(chapterNum) {
    if (this._activeChapter === chapterNum) return;
    this._activeChapter = chapterNum;
    for (let i = 1; i <= 4; i++) {
      const card = document.getElementById(`chapter-${i}`);
      if (!card) continue;
      if (i === chapterNum) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    }
  },

  initScrollSync() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[Hero3D] GSAP or ScrollTrigger not loaded, falling back to manual scroll.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const stage = document.getElementById('hero-stage');
    if (!stage) return;

    // Agile pin distance: 500px mobile, 800px desktop for brisk, natural scrolling
    const isMobile = window.innerWidth <= 768;
    const pinDistance = isMobile ? '+=500' : '+=800';

    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: pinDistance,
      pin: true,
      scrub: 0.04, // Snappy 40ms scrub for instant 1:1 wheel reaction
      anticipatePin: 1,
      onUpdate: (self) => {
        if (this.isPlaying) return;
        const targetFrame = Math.round(self.progress * (this.TOTAL_FRAMES - 1));
        this.renderFrame(targetFrame);

        // Hide scroll hint once user scrolls past 5%
        const hint = document.getElementById('scroll-hint');
        if (hint) {
          if (self.progress > 0.05) {
            hint.classList.add('hidden');
          } else {
            hint.classList.remove('hidden');
          }
        }
      }
    });
  },

  bindScrubberControls() {
    const scrubber = document.getElementById('frame-scrubber');
    if (scrubber) {
      scrubber.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) - 1;
        this.renderFrame(val);
      });
    }

    const btnPlay = document.getElementById('btn-play-pause');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => this.togglePlay());
    }

    const btnReverse = document.getElementById('btn-reverse-action');
    if (btnReverse) {
      btnReverse.addEventListener('click', () => this.reassembleLogo());
    }
  },

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');

    if (this.isPlaying) {
      if (iconPlay) iconPlay.style.display = 'none';
      if (iconPause) iconPause.style.display = 'block';

      this.playInterval = setInterval(() => {
        let next = this.currentIndex + 1;
        if (next >= this.TOTAL_FRAMES) {
          next = 0;
        }
        this.renderFrame(next);
      }, 42); // ~24 FPS
    } else {
      if (iconPlay) iconPlay.style.display = 'block';
      if (iconPause) iconPause.style.display = 'none';
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
  },

  reassembleLogo() {
    if (this.isPlaying) this.togglePlay();

    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Animate smoothly back to 0
    let step = this.currentIndex;
    const interval = setInterval(() => {
      step -= 4;
      if (step <= 0) {
        step = 0;
        clearInterval(interval);
      }
      this.renderFrame(step);
    }, 16);
  },

  bindReassembleButtons() {
    const reassembleBtns = [
      document.getElementById('btn-header-reassemble'),
      document.getElementById('btn-card-reassemble'),
      document.getElementById('btn-final-reassemble')
    ];

    reassembleBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.reassembleLogo();
        });
      }
    });
  },

  bindAudioToggle() {
    const audioBtn = document.getElementById('btn-audio-toggle');
    if (!audioBtn || !this.audio) return;

    audioBtn.addEventListener('click', () => {
      const lang = window.KLIKA_LANG || 'ar';
      const dict = window.KLIKA_TRANSLATIONS[lang] || window.KLIKA_TRANSLATIONS.ar;
      const label = document.getElementById('audio-status-label');
      const iconSoundOn = document.getElementById('icon-sound-on');
      const iconSoundOff = document.getElementById('icon-sound-off');

      if (this.isAudioPlaying) {
        this.audio.pause();
        this.isAudioPlaying = false;
        audioBtn.classList.remove('active');
        if (label) label.textContent = dict.audioOff;
        if (iconSoundOn) iconSoundOn.style.display = 'none';
        if (iconSoundOff) iconSoundOff.style.display = 'block';
      } else {
        this.audio.volume = 0.35;
        this.audio.play().then(() => {
          this.isAudioPlaying = true;
          audioBtn.classList.add('active');
          if (label) label.textContent = dict.audioOn;
          if (iconSoundOn) iconSoundOn.style.display = 'block';
          if (iconSoundOff) iconSoundOff.style.display = 'none';
        }).catch((err) => {
          console.warn('[Audio Play Error]', err);
        });
      }
    });
  }
};

