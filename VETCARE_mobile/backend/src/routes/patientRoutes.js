const express = require("express");
const { getPatients, getPatient, createPatient, updatePatient, deletePatient } = require("../controllers/patientController");
const { getRecords, createRecord, deleteRecord } = require("../controllers/medicalRecordController");
const { getConditions, createCondition, updateCondition, deleteCondition } = require("../controllers/conditionController");

const router = express.Router();

router.get("/", getPatients);
router.get("/:id", getPatient);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

router.get("/:patientId/records", getRecords);
router.post("/:patientId/records", createRecord);
router.delete("/:patientId/records/:id", deleteRecord);

router.get("/:patientId/conditions", getConditions);
router.post("/:patientId/conditions", createCondition);
router.put("/:patientId/conditions/:id", updateCondition);
router.delete("/:patientId/conditions/:id", deleteCondition);

module.exports = router;
