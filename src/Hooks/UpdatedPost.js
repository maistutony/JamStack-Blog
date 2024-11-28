
// Function to update an item in the array based on _id
export const updatedPost = (array, updatedObject) => {
    const updatedArray = array.map(item => {
        if (item._id === updatedObject._id) {
            return updatedObject;
        }
        return item;
    });
    return updatedArray
}
