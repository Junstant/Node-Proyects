import mongoose from 'mongoose';
import User from "../models/user.model.js";
import Career from "../models/career.model.js";
import Year from "../models/years.model.js";
import Module from "../models/modules.model.js";
import Absent from "../models/schemas/absents.schema.js";
import Homework from "../models/schemas/homeworks.schema.js";
import Note from "../models/schemas/notes.schema.js";
import Schedule from "../models/schemas/schedule.schema.js";

export { User, Career, Year, Module, Absent, Homework, Note, Schedule };