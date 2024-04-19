const API=`${process.env.FETCH_ALL_SIZES}`;

const getAllSizes = async (): Promise<number[]> => {
  let allSizes: Array<number> = []
  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch Sizes');
  }
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    allSizes.push(Number(data[i].name))
  }


  return allSizes;
};

export default getAllSizes;

