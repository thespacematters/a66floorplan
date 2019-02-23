(function drawLayers () {
  let filtered = {}
  let plans = document.querySelector('.plans')
  let sliderIndex = 0
  let floorList = []
  const FLOORS = {
    0: 'basement',
    1: 'ground floor',
    2: '1st floor',
    3: '2nd floor',
    4: '3rd floor',
    5: 'attic'
  }

  let layers = getParam('layers')
  filter()
  draw()
  addEvent()
  slider(sliderIndex)

  function getParam (name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  function addEvent () {
    let prev = document.querySelector('button[name="prev-btn"]')
    let next = document.querySelector('button[name="next-btn"]')

    next.addEventListener('click', () => {
      slider(sliderIndex + 1)
    })
    prev.addEventListener('click', () => {
      slider(sliderIndex - 1)
    })
  }

  function slider (index) {
    let length = floorList.length - 1
    sliderIndex = index < 0 ? length : index > length ? 0 : index

    floorList.forEach((f, i) => {
      f.style.display = i === sliderIndex ? 'block' : 'none'
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
