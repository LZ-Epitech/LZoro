import { updateInTable1v1, updateInTable2v2 } from "../airtable.js";
import { getUsers } from "../index.js";

function getQueueList()
{
    const users = getUsers;
    const userQueuing = [];

    users.forEach(user => {
        if (user.fields.tag1 === 1 || user.fields.tag2 === 1)
            userQueuing.push(user);
    });
    return userQueuing;
}

function getQueue1v1()
{
    const users = getQueueList();
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

function getQueue2v2()
{
    const users = getQueueList();
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
    // REMOVE QUEUE user1 && user2
    updateInTable1v1(user1, user2, "users", [["tag1", 0]]);
}

function queueConnect1v1(user1, user2, user3, user4)
{
    // REMOVE QUEUE user1 && user2 && user3 && user4
    updateInTable2v2(user1.id, user2.id, user3.id, user4.id, "users", [["tag2", tag]])
}

export { getQueue1v1, getQueue2v2, getQueueList, isAlreadyOneQueing1v1, isAlreadyOneQueing2v2 };