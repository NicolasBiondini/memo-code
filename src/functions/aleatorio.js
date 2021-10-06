//posicion aleatoria
const aleatorio = (max, min) => {
  return Math.floor(Math.random() * (max - min));
};

// funcion para ordenar de mayor a menor
const compare = (a, b) => {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
};

const places = (arr) => {
  const state = [];
  const positions = [];
  arr.forEach((card) => {
    let position = aleatorio(arr.length, 0);

    //Si un numero aleatorio e igual lo cambia
    while (positions.includes(position)) {
      position = aleatorio(arr.length, 0);
    }

    positions.push(position);
    let info = { position: position, card: card };
    state.push(info);

    //ordenar por orden
    state.sort(compare);
  });

  //retornar el estado de las posiciones;
  return state;
};

export { places };
