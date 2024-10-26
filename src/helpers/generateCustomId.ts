import e from "cors";
import prisma from "../shared/prisma";

const  generateCustomId = async () => {
    const lastUser = await prisma.user.findFirst({
        orderBy: {
            customId: 'desc', // Order by customId to get the latest one
        },
    });

    let newIdNumber = 1; // Default to 1 if no users exist

    if (lastUser && lastUser.customId) {
        const lastIdNumber = parseInt(lastUser.customId.split('-')[1]);
        newIdNumber = lastIdNumber + 1; // Increment the last number
    }

    const formattedId = `IYF-${String(newIdNumber).padStart(5, '0')}`; // Format to IYF-00001
    return formattedId;
};
 export default generateCustomId;