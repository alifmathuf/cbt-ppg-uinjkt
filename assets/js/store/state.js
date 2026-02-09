const KEY = "CBT_STATE";

const defaultState = {
  user: null,
  theme: "light",

  exam: {
    type: null,            // pg | kasus
    mapel: null,
    paket: null,
    startTime: null,
    duration: null
  },

  pg: {
    answers: [],
    answeredCount: 0,
    score: null
  },

  kasus: {
    jawaban: {},
    selesai: false
  }
};

export const State = {
  get() {
    return JSON.parse(localStorage.getItem(KEY)) || defaultState;
  },

  set(newState) {
    localStorage.setItem(KEY, JSON.stringify(newState));
  },

  update(path, value) {
    const state = this.get();
    let obj = state;
    const keys = path.split(".");
    while (keys.length > 1) {
      obj = obj[keys.shift()];
    }
    obj[keys[0]] = value;
    this.set(state);
  },

  resetExam() {
    const state = this.get();
    state.exam = defaultState.exam;
    state.pg = defaultState.pg;
    state.kasus = defaultState.kasus;
    this.set(state);
  }
};
