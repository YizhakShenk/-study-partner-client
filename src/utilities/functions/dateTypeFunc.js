
const getStrDay = (date) => {
    return date ? `${date.$D < 10 ? "0" : ""}${date.$D}/${date.$M + 1 < 10 ? "0" : ""}${date.$M + 1}/${date.$y}` : null
  }
  const getStrTime = (time) => {
    return time ? `${time.$H < 10 ? "0" : ""}${time.$H}:${time.$m < 10 ? "0" : ""}${time.$m}` : null
  }

  export {
    getStrDay,
    getStrTime,
  }
