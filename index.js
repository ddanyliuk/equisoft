// validate the input value
const validateData = (element) => {
  return !isNaN(element) && element !== ''
};
// get main container node
const getParentElement = (el) =>  el.parentElement.parentElement;

const getTarget = (e) => e.target;

const getInputsArray = (el) => [...getParentElement(el).querySelectorAll('.input-element')];

// remove all highlight when inputs is edited
const removeHighLight = (el) => {
  getInputsArray(el).forEach(el => el.classList.remove('selected'))
}

const highLightElements = (arr) => arr.forEach(i => i.classList.add('selected'));

const getElementValue = (el) => {
  const inputsElements = getInputsArray(el);
  const getValueArray = inputsElements.filter(i => validateData(i.value)).map(i => i.value);
  if (getValueArray.length < 1) {
    return false;
  }
  removeHighLight(el);
  // find exact value depending on which button was clicked
  const elementValue = el.dataset.sort === 'biggest' ? Math.max(...getValueArray) : Math.min(...getValueArray);
  const elementsToShow = inputsElements.filter(j => validateData(j.value) && +j.value === elementValue);
  highLightElements(elementsToShow);
}

const handleClick = (e) => {
  if (getTarget(e).classList.contains('action-btn')) {
    getElementValue(getTarget(e))
  }
}

const handleChange = (e) => {
  if (getTarget(e).classList.contains('input-element')) {
    removeHighLight(getTarget(e))
  }
}

const getInputs = [...document.getElementsByClassName('input-element')];

getInputs.forEach(i => i.addEventListener('focus', handleChange));

document.addEventListener('click', handleClick);