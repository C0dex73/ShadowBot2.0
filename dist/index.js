"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = tslib_1.__importDefault(require("discord.js"));
const config_json_1 = tslib_1.__importDefault(require("./config.json"));
const loadCommands_1 = tslib_1.__importDefault(require("./loaders/loadCommands"));
const loadDatabase_1 = tslib_1.__importDefault(require("./loaders/loadDatabase"));
const loadEvents_1 = tslib_1.__importDefault(require("./loaders/loadEvents"));
const consoleHandler_1 = tslib_1.__importDefault(require("./utils/consoleHandler"));
const consoleHandler_2 = require("./utils/consoleHandler");
const tryFunction_1 = require("./utils/tryFunction");
async function login(bot) {
    try {
        await bot.login(config_json_1.default.token);
    }
    catch (err) {
        return "bot couldn't login : " + err;
    }
    return 1;
}
async function main() {
    const bot = new discord_js_1.default.Client({
        intents: [3276799]
    });
    (0, consoleHandler_1.default)("starting bot...", consoleHandler_2.LogLevel.Log);
    await (0, tryFunction_1.tryFunction)(bot, login);
    (0, consoleHandler_1.default)("bot logged in.", consoleHandler_2.LogLevel.Info);
    (0, consoleHandler_1.default)("connecting to database...", consoleHandler_2.LogLevel.Log);
    await (0, tryFunction_1.tryFunction)(bot, loadDatabase_1.default);
    (0, consoleHandler_1.default)("bot connected to database.", consoleHandler_2.LogLevel.Info);
    (0, consoleHandler_1.default)("loading events...", consoleHandler_2.LogLevel.Log);
    await (0, tryFunction_1.tryFunction)(bot, loadEvents_1.default);
    (0, consoleHandler_1.default)("events loaded.", consoleHandler_2.LogLevel.Info);
    bot.commands = new discord_js_1.default.Collection();
    (0, consoleHandler_1.default)("loading commands...", consoleHandler_2.LogLevel.Log);
    await (0, tryFunction_1.tryFunction)(bot, loadCommands_1.default);
    (0, consoleHandler_1.default)("commands loaded.", consoleHandler_2.LogLevel.Info);
}
main();
