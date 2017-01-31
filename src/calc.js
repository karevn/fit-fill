function aspect(thing) { return thing.width / thing.height }

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

export function valign(container, size) {
  return Object.assign({}, size, {top: (container.height - size.height) / 2})
}

export function halign(container, size) {
  return Object.assign({}, size, {left: (container.width - size.width) / 2})
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
