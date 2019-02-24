(function drawLayers () {
  let filtered = {}
  let plans = document.querySelector('.plans')
  let sliderIndex = 0
  let floorList = []
  let prev = document.querySelector('button[name="prev-btn"]')
  let next = document.querySelector('button[name="next-btn"]')

  const FLOORS = {
    1: 'B',
    2: '0',
    3: '1',
    4: '2',
    5: '3',
    6: 'A'
  }

  let layers = getParam('layers')
  filter()
  draw()
  floorList.length > 1 ? addEvent() : hideButtons()
  slider(sliderIndex)

  function getParam (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? ['BG1A', 'BG2A', 'BG3A', 'BG4A', 'BG5A', 'W1A', 'W2A', 'W3A', 'W4A', 'W5A'] : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  function addEvent () {
    let cont = document.querySelector('.floor-btns')

    Object.keys(filtered).forEach((floor, i) => {
      let button = document.createElement('button')
      button.classList.add('floor-name', `floor-${floor}`)
      button.innerHTML = FLOORS[floor]
      cont.appendChild(button)
      button.addEventListener('click', () => {
        slider(i)
      })
    })

    next.addEventListener('click', () => {
      slider(sliderIndex + 1)
    })
    prev.addEventListener('click', () => {
      slider(sliderIndex - 1)
    })
  }

  function hideButtons () {
    next.style.display = 'none'
    prev.style.display = 'none'
    // let cont = document.querySelector('.floor-btns')
    // let button = document.createElement('button')
    // button.classList.add('floor-name', 'active')
    // button.innerHTML = FLOORS[Object.keys(filtered)[0]] || ''
    // cont.appendChild(button)
  }

  function slider (index) {
    let length = floorList.length - 1
    sliderIndex = index < 0 ? length : index > length ? 0 : index
    let buttons = document.querySelectorAll('.floor-name')

    floorList.forEach((f, i) => {
      f.style.display = i === sliderIndex ? 'block' : 'none'
      if (buttons.length) {
        i === sliderIndex ? buttons[i].classList.add('active') : buttons[i].classList.remove('active')
      }
    })
  }

  function draw() {
    Object.keys(filtered).forEach((floor) => {
      let newFloor = document.createElement('div')
      newFloor.classList.add('floor')

      if (filtered[floor].first) {
        filtered[floor].layers.unshift(filtered[floor].first)
      }
      if (filtered[floor].last) {
        filtered[floor].layers.push(filtered[floor].last)
      }

      filtered[floor].layers.forEach((src) => {
        let image = document.createElement('img')
        image.setAttribute('src', `layers/${src}`)
        newFloor.appendChild(image)
      })

      floorList.push(newFloor)
      plans.appendChild(newFloor)
    })
  }

  function filter () {
    REF.forEach((item) => {
      if (layers.includes(item.id)) {
        let f = item.floor

        if (!filtered[f]) {
          filtered[f] = {first:null, last:null, layers: []}
        }

        if (item.first) {
          filtered[f].first = item.name
        } else if (item.last) {
          filtered[f].last = item.name
        } else {
          filtered[f].layers.push(item.name)
        }
      }
    })
  }
})()
