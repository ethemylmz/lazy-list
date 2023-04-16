document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelector('.items');
  const { clientHeight } = items;

  let skip = 0;
  let lastSkip = 0;

  const take = 100;
  const max = 10000;
  const itemHeight = 50;
  const visibility = Math.ceil(clientHeight / itemHeight);
  const flexibility = Math.ceil(visibility / 2);

  const data = [];
  for (let i = 1; i <= max; i++) {
    data.push(i);
  }

  const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  };

  const render = () => {
    lastSkip = skip;
    const start = Math.max(0, skip - flexibility);
    const end = Math.min(data.length, skip + take + flexibility);

    const fragment = document.createDocumentFragment();
    const firstItem = createElement('li', 'item first-item');
    const lastItem = createElement('li', 'item last-item');

    firstItem.style.height = `${start * itemHeight}px`;
    lastItem.style.height = `${(data.length - end) * itemHeight}px`;

    fragment.appendChild(firstItem);

    for (let i = start; i < end; ++i) {
      const item = createElement('li', 'item');
      item.textContent = data[i];
      fragment.appendChild(item);
    }

    fragment.appendChild(lastItem);

    items.innerHTML = '';
    items.appendChild(fragment);
  };

  const onScroll = () => {
    const { scrollTop } = items;
    skip = Math.floor(scrollTop / itemHeight);

    if (lastSkip + take - visibility - 1 < skip) {
      render();
    } else if (lastSkip > skip) {
      skip = Math.max(0, skip - take + visibility);
      render();
    }
  };

  items.addEventListener('scroll', onScroll);

  render();
});
