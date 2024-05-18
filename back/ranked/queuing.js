import { updateInTable1v1, updateInTable2v2 } from "../airtable.js";
import { sendMessageToUser } from "../discordbot.js";
import { getUsers } from "../index.js";
import { createMatch1v1, createMatch2v2 } from "./matchs.js";

async function getQueueList() {
    const users = await getUsers();
    const userQueuing = [];

    users.forEach(user => {
        if (user.fields.tag1 === 1 || user.fields.tag2 === 1) {
            userQueuing.push(user);
        }
    });
    return userQueuing;
}

async function getQueue1v1()
{
    const users = await getQueueList();
    const userQueuing = [];

    users.forEach(user => {
        if (user.fields.tag1 === 1)
            userQueuing.push(user);
    });
    return userQueuing;
}

function isAlreadyOneQueing1v1()
{
    const users = getQueue1v1();

    if (users.length > 0)
        return 1;
    return 0;
}

async function getQueue2v2()
{
    const users = await getQueueList();
    const userQueuing = [];

    users.forEach(user => {
        if (user.fields.tag2 === 1)
            userQueuing.push(user);
    });
    return userQueuing;
}

function isAlreadyOneQueing2v2()
{
    const users = getQueue2v2();

    if (users.length > 3)
        return 1;
    return 0;
}

function queueConnect1v1(user1, user2)
{
    updateInTable1v1(user1.id, user2.id, "users", [["tag1", 0]]);
    sendMessageToUser(user1.fields.token, `Nous vous avons trouvé un match contre ${user2.fields.name}`)
    sendMessageToUser(user2.fields.token, `Nous vous avons trouvé un match contre ${user1.fields.name}`)
    createMatch1v1(user1, user2);
    return 1;
}

function queueConnect2v2(user1, user2, user3, user4)
{
    updateInTable2v2(user1.id, user2.id, user3.id, user4.id, "users", [["tag2", 0]])
    createMatch2v2(user1, user2, user3, user4);
    return 1;
}

export { getQueue1v1, getQueue2v2, getQueueList, isAlreadyOneQueing1v1, isAlreadyOneQueing2v2, queueConnect1v1, queueConnect2v2 };