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
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
require("dotenv").config();
if (!process.env.PGURI) {
    throw new Error("PGURI environment variable not defined");
}
const client = new pg_1.Client({
    connectionString: process.env.PGURI,
});
client.connect();
// GET - languages
app.get("/api/languages", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield client.query(`SELECT id, name FROM languages`);
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json(error + "Error fetching languages");
    }
}));
// GET - Hämta alla böcker med språk
app.get("/api/books", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield client.query(`SELECT books.id,
         books.title,
         books.author,
         books.language_id,
         languages.name AS language_name
      FROM books
      JOIN languages ON books.language_id = languages.id;`);
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json(error + "Error fetching books");
    }
}));
// POST - Lägg till en ny bok
app.post("/api/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, language_id } = req.body;
    if (!title || !author || !language_id) {
        res.status(400).json({ message: "All fields are required" });
    }
    try {
        const { rows } = yield client.query(`INSERT INTO books (title, author, language_id) VALUES ($1, $2, $3) RETURNING *`, [title, author, language_id]);
        res.status(201).send(rows[0]);
    }
    catch (error) {
        res.status(500).json(error + "Error adding books");
    }
}));
// PUT - Uppdatera en boken
app.put("/api/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, language_id } = req.body;
    if (!title || !author || !language_id) {
        res.status(400).json({ message: "All fields are required" });
    }
    try {
        const { rows } = yield client.query("UPDATE books SET title = $1, author = $2, language_id = $3 WHERE id = $4 RETURNING *", [title, author, language_id, id]);
        res.status(200).send(rows[0]);
    }
    catch (error) {
        res.status(500).json(error + "Error updating the book");
    }
}));
// DELETE - Ta bort en bok
app.delete("/api/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield client.query(`DELETE FROM books WHERE id = $1 RETURNING *`, [id]);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json(error + "Error deleting the book");
    }
}));
// Serve frontend files
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "dist")));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server kör på http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map