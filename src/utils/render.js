export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`
};


export const createElement = (elementTemplate) => {
  const tempElement = document.createElement(`div`);
  tempElement.innerHTML = elementTemplate;
  return tempElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(element.getElement());
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(element.getElement());
      break;
  }
};

export const replace = (newComponent, oldComponent) => {
  const container = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isElementsExists = !!(container && newElement && oldElement);

  if (isElementsExists && container.contains(oldElement)) {
    container.replaceChild(newElement, oldElement);
  }
};

