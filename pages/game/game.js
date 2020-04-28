Page({
  data: {
    time: 0,
    timer: null,
    difficulty: {
      mine: 0,
      sum: 0
    },
    countWidth: 0,
    mineArr: {
      x: [],
      y: []
    },
    mineData: []
  },
  play: (e) => {
    let mineData = this.data.mineData;
    let index = e.target.dataset.idx;
    let count = 0;
    if (e.target.dataset.isMine) {
      console.log('踩雷啦，游戏结束！');
      mineData[index].isSelected = true;
      this.setData({
        mineData: mineData
      });
      return;
    }
    if (e.target.dataset.isMarked || e.target.dataset.isSelected) {
      return;
    }
    if (
      mineData[index - 1] &&
      mineData[index - 1].isMine &&
      mineData[index - 1].x === mineData[index].x &&
      mineData[index - 1].y === mineData[index].y - 32
    ) {
      count++;
    }
    if (
      mineData[index + 1] &&
      mineData[index + 1].isMine &&
      mineData[index + 1].x === mineData[index].x &&
      mineData[index + 1].y === mineData[index].y + 32
    ) {
      count++;
    }
    if (
      mineData[index - 7] &&
      mineData[index - 7].isMine &&
      mineData[index - 7].x === mineData[index].x - 32 &&
      mineData[index - 7].y === mineData[index].y + 32
    ) {
      count++;
    }
    if (
      mineData[index + 7] &&
      mineData[index + 7].isMine &&
      mineData[index + 7].x === mineData[index].x + 32 &&
      mineData[index + 7].y === mineData[index].y - 32
    ) {
      count++;
    }
    if (
      mineData[index - 8] &&
      mineData[index - 8].isMine &&
      mineData[index - 8].x === mineData[index].x - 32 &&
      mineData[index - 8].y === mineData[index].y
    ) {
      count++;
    }
    if (
      mineData[index + 8] &&
      mineData[index + 8].isMine &&
      mineData[index + 8].x === mineData[index].x + 32 &&
      mineData[index + 8].y === mineData[index].y
    ) {
      count++;
    }
    if (
      mineData[index - 9] &&
      mineData[index - 9].isMine &&
      mineData[index - 9].x === mineData[index].x - 32 &&
      mineData[index - 9].y === mineData[index].y - 32
    ) {
      count++;
    }
    if (
      mineData[index + 9] &&
      mineData[index + 9].isMine &&
      mineData[index + 9].x === mineData[index].x + 32 &&
      mineData[index + 9].y === mineData[index].y + 32
    ) {
      count++;
    }
    mineData[index].num = count;
    mineData[index].isSelected = true;
    this.setData({
      mineData: mineData
    });
  },
  onLoad(option) {
    this.setData({
      difficulty: {
        mine: option.type * option.type * 4,
        sum: option.type * option.type * 16
      }
    });
    this.refreshTimer();
    this.initData();
  },
  onUnload() {
    this.clearTimer();
  },
  refreshTimer() {
    this.timer = setInterval(() => {
      this.setData({
        time: ++this.data.time
      });
    }, 1000);
  },
  clearTimer() {
    clearInterval(this.timer);
    this.timer = null;
  },
  initData: function () {
    let line = Math.sqrt(this.data.difficulty.sum);
    let w = line * 32;
    let mineData = [];
    for (let i = 0; i < line; i++) {
      for (let j = 0; j < line; j++) {
        let x = i * 32;
        let y = j * 32;
        mineData.push({
          x: x,
          y: y,
          num: 0,
          isMine: false,
          isMarked: false,
          isSelected: false
        });
      }
    }
    let mineArr = [];
    for (let i = 0; i < this.data.difficulty.mine; i++) {
      let mineIdx = Math.floor(Math.random() * this.data.difficulty.sum);
      mineArr.push(mineIdx);
      mineData[mineIdx].isMine = true;
    }
    this.setData({
      countWidth: w + 'px',
      mineData: mineData
    });
  }
});
