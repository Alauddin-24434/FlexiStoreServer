"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
const port = config_1.default.port;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const server = app_1.default.listen(port, () => {
                console.log(`App is listening on port ${port}`);
            });
            // Handle graceful shutdown
            process.on("SIGTERM", () => {
                console.log("SIGTERM signal received: closing HTTP server");
                server.close(() => {
                    console.log("HTTP server closed");
                });
            });
        }
        catch (error) {
            console.error("Error starting server:", error);
        }
    });
}
// Handle uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});
main();
