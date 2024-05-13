import { createInTable } from "../airtable";

function createMatch1v1(user1, user2)
{
    const data = [
        ["equipe1", user1.id],
        ["equipe2", user2.id],
        ["format", "1v1"],
    ];
    createInTable("matchs", data);
}

function createMatch2v2(user1, user2, user3, user4)
{
    const data = [
        ["equipe1", user1.id + ":" + user2.id],
        ["equipe2", user3.id + ":" + user4.id],
        ["format", "2v2"],
    ]
    createInTable("matchs", data);
}

export { createMatch1v1, createMatch2v2 };