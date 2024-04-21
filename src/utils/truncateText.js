export const truncateText = (text, length = 20) => {
  const words =  text.split(' ');
	return words.length <= length ? text : `${words.slice(0, length).join(' ')}...` ;
};
