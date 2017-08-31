function aspect(thing) { return thing.width / thing.height }
const prop = path => object => object[path]
function resize(container, content, decision) {
  if (decision(aspect(container), aspect(content))) {
    return fitWidth(container, content)
  }
  return fitHeight(container, content)
}

function getHeight(container, content) {
  return container.width / aspect(content)
}

function getWidth(container, content) {
  return container.height * aspect(content)
}

function fitWidth (container, content) {
  return {
    width: container.width,
    height: getHeight(container, content)
  }
}

function fitHeight(container, content) {
  return {
    height: container.height,
    width: getWidth(container, content)
  }
}

function center(container, size, param, accessor) {
  return Object.assign({}, size,
    {[param]: (accessor(container) - accessor(size)) / 2})
}
export function valign(container, size) {
  return center(container, size, 'top', prop('height'))
}

export function halign(container, size) {
  return center(container, size, 'left', prop('width'))
}

export function align(container, size) {
  if (!container || !size) {
    return null
  }
  if (size.width > container.width) {
    return valign(container, size)
  }

  return halign(container, size)
}

export function fit (container, content) {
  return resize(container, content, (container, content) => container < content)
}

export function fill (container, content) {
  return resize(container, content, (container, content) => container > content)
}
