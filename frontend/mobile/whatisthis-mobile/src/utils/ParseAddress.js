const isNumeric = (str) => {
  return !isNaN(parseInt(str));
};

export const getBuildingName = (address) => {
  const words = address.split(" ");
  if (words.length > 0) {
    const lastWord = words[words.length - 1];
    if (isNumeric(lastWord)) {
      return "건물";
    } else {
      return lastWord;
    }
  } else {
    return "잘못된 정보입니다";
  }
};
