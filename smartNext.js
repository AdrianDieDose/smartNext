(function() {
  function init() {
    if (!window.Spicetify || !Spicetify.Player) return setTimeout(init, 500);

    console.log("SmartNext (Marketplace-ready) loaded");
	// smartBack with vinal sound added?
	// Volume up by bpm

    let fadeOutDuration = 101, fadeInDuration = 101, jumpDistance = 5;

    if (!document.getElementById("smartNextStyles")) {
      const style = document.createElement("style");
      style.id = "smartNextStyles";
      style.textContent = `
        #smartNextBtn {
          width:38px;height:38px;border-radius:50%;border:none;
          background:var(--spice-button-active);display:flex;
          align-items:center;justify-content:center;cursor:pointer;
          margin-left:4px;position:relative;
        }
        #smartNextBtn svg { fill:var(--spice-text); }
        #smartNextBtn:disabled { cursor:default; opacity:0.6; }
        #smartNextBtn.loading svg { animation: spin 1s linear infinite; }
        @keyframes spin { 0%{transform:rotate(0deg);}100%{transform:rotate(360deg);} }
        .fade-container { display:flex; gap:4px; align-items:center; }
        .fade-option-btn {
          width:24px;height:24px;border:none;background:transparent;
          display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;
        }
        .fade-option-btn svg { width:20px;height:20px;stroke-width:2; fill:none; }
      `;
      document.head.appendChild(style);
    }

    const fadeVolume = (from, to, duration = 400, steps = 20) => {
      const delta = (to - from) / steps, stepTime = duration / steps;
      let current = from;
      return new Promise(resolve => {
        for (let i = 0; i <= steps; i++) {
          setTimeout(() => {
            Spicetify.Player.setVolume(Math.min(1, Math.max(0, current)));
            current += delta;
            if (i === steps) resolve();
          }, i * stepTime);
        }
      });
    };
	
	

    async function smartNext(seconds) {
      const btn = document.querySelector('#smartNextBtn');
	  //?
      if (!btn) return;

	// Data filtering and jump logic
      
const progress = Spicetify.Player.getProgress();
const duration = Spicetify.Player.getDuration();

const target = duration - seconds * 1000;
      if (progress >= target || btn.disabled) return;


		//Disable while active
      btn.disabled = true;
      btn.classList.add("loading");

      const currentVolume = Spicetify.Player.getVolume();
	  
	 
      await fadeVolume(currentVolume, 0.15, fadeOutDuration);
	  //JUMP NEXT (we need better transitions)
      Spicetify.Player.seek(target);
	  await fadeVolume(0.45, currentVolume, fadeInDuration);
		

		//We need a volume buildup after songchange
      Spicetify.Player.addEventListener("songchange", async () => {
  await new Promise(r => setTimeout(r, 2500));
  btn.disabled = false; btn.classList.remove("loading");
});
    }
	
	//Keybind

    document.addEventListener("keydown", e => {
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault(); smartNext(jumpDistance);
      }
    });
	
	//Insert smartNextButton

    const insertButtons = () => {
      const skipBtn = document.querySelector('[data-testid="control-button-skip-forward"]');
      if (!skipBtn) return setTimeout(insertButtons, 500);

      const smartNextButton = document.createElement('button');
      smartNextButton.id = 'smartNextBtn'; smartNextButton.title = 'SmartNext';
	  //On smartNextButton Click
// WE NEED TO RESET VIS AFTER WINDOW SIZE CHANGE
      smartNextButton.onclick = () => smartNext(jumpDistance);
      smartNextButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 4v16l12-8zM16 4v16h2V4z"/></svg>`;
      skipBtn.parentNode.insertBefore(smartNextButton, skipBtn.nextSibling);

      const midBar = document.querySelector('.player-controls__right');
      const extraControls = document.querySelector('.player-controls__right-extraControls');
      if (!midBar) return;

      document.querySelector('.fade-container')?.remove();

	//Fade Container
      const fadeContainer = document.createElement('div');
      fadeContainer.className = 'fade-container';

      const speeds = [
        {name:'5s', duration:101, distance:5, path:'M3,9 Q5,11 8,9 T13,9'},
        {name:'10s', duration:100, distance:10, path:'M3,8.5 Q5,11.5 8,8.5 T13,8.5'},
        {name:'15s', duration:100, distance:25, path:'M3,8 Q5,12 8,8 T13,8'},
        {name:'20s', duration:100, distance:20, path:'M3,7.5 Q5,12.5 8,7.5 T13,7.5'}
      ];
	  
	  //Fade Profiles

      speeds.forEach(speed => {
        const fbtn = document.createElement('button');
        fbtn.className = `fade-option-btn fade-${speed.name}`; fbtn.title = `${speed.name} fade`;

        const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        svg.setAttribute("viewBox","0 0 16 16");

        const circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
        circle.setAttribute("cx","8"); circle.setAttribute("cy","8"); circle.setAttribute("r","7");
        circle.setAttribute("stroke","var(--spice-text)"); circle.setAttribute("stroke-width","1.5");
        circle.setAttribute("fill","transparent"); svg.appendChild(circle);

        const path = document.createElementNS("http://www.w3.org/2000/svg","path");
        path.setAttribute("d", speed.path);
        path.setAttribute("stroke-linecap","round");
        path.setAttribute("stroke","var(--spice-text)");
        path.setAttribute("fill","none"); svg.appendChild(path);

        fbtn.appendChild(svg);

		//Select highlighted icon
        if (fadeOutDuration === speed.duration) path.setAttribute("stroke","var(--spice-button-active)");

        fbtn.onclick = () => {
			//Sets duration from profile
			fadeOutDuration = fadeInDuration = speed.duration;
			//Sets jump duration
			jumpDistance = speed.distance;
			//Removes old selection
          fadeContainer.querySelectorAll('path').forEach(p => p.setAttribute("stroke","var(--spice-text)"));
          path.setAttribute("stroke","var(--spice-button-active)");
        };

        fadeContainer.appendChild(fbtn);
      });

      midBar.insertBefore(fadeContainer, extraControls);
	  
	  




    };

    insertButtons();
  }

  init();
})();
