import { Router } from "express";
import {
  viewSeatMap,
  reserve,
  cancel
} from "../controllers/ToDoController.js";

const router = Router();

router.get("/book", viewSeatMap);
router.post("/book/reserve", reserve);
router.post("/book/cancel", cancel);
// router.put("/update/:id", updateToDo);
// router.delete("/delete/:id", deleteToDo);

export default router;
