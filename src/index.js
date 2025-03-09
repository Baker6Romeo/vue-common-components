import * as components from './components'

const componentsList = components?.default
const CommonComponents = {
  install(Vue) {
    Object.keys(componentsList).forEach((name) => {
      Vue.component(name, componentsList[name])
    })
  },
}

export default CommonComponents
