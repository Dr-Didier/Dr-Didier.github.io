

/* window.onload = function () {
  Particles.init({
    selector: '.background',
    maxParticles: 200,
    color: "#9ecadb",
  connectParticles: true,
  retina_detect: true,
  });
}; */
// particlesJS.load('particles-js', 'particlesjs.json', function() {
// 	console.log('callback - particles.js config loaded');
//   });	

tsParticles.load("tsparticles", {
  "background": {
    "color": {
      "value": "#000"
    },
    "position": "50% 50%",
    "repeat": "no-repeat",
    "size": "cover"
  },
  "fullScreen": {
    "enable": true,
    "zIndex": 1
  },
  "infection": {
    "cure": true,
    "enable": true
  },
  "interactivity": {
    "events": {
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "onHover": {
        "enable": true,
        "mode": "repulse"
      }
    },
    "modes": {
      "attract": {
        "duration": 0.2,
        "speed": 0.2
      },
      "bubble": {
        "distance": 400,
        "duration": 2,
        "opacity": 0.8,
        "size": 40
      },
      "grab": {
        "distance": 400
      }
    }
  },
  "particles": {
    "collisions": {
      "enable": true
    },
    "color": {
      "value": "#ffffff"
    },
    "links": {
      "blink": true,
      "color": {
        "value": "#9ecadb"
      },
      "distance": 200,
      "enable": true,
      "warp": true
    },
    "move": {
      "angle": {
        "value": 50
      },
      "attract": {
        "enable": true,
        "rotate": {
          "x": 1000,
          "y": 1000
        }
      },
      "enable": true,
      "gravity": {
        "acceleration": 1,
        "maxSpeed": 5
      },
      "path": {},
      "outModes": {
        "bottom": "out",
        "left": "out",
        "right": "out",
        "top": "out"
      },
      "speed": 4,
      "warp": true
    },
    "number": {
      "density": {
        "enable": true,
        "factor": 800
      },
      "value": 80
    },
    "opacity": {
      "value": 0.5,
      "animation": {
        "minimumValue": 0.1
      }
    },
    "size": {
      "random": {
        "enable": true
      },
      "value": {
        "min": 1,
        "max": 3
      },
      "animation": {
        "speed": 20,
        "minimumValue": 0.1
      }
    }
  }
});
